import {Section} from "./types";

export enum Actions {
  SET_PROFILE = "SET_PROFILE",
  SET_INTRO = "SET_INTRO",
  SET_SECTION = "SET_SECTION",
  SET_ACTIVE_SECTION = "SET_ACTIVE_SECTION",
  SET_EDITING = "SET_EDITING",
  SET_ABOUT_ME = "SET_ABOUT_ME",
  SET_SKILL = "SET_SKILL",
  SET_PROJECT = "SET_PROJECT",

  REMOVE_SECTION = "REMOVE_SECTION",
  SET_EXPERIENCE = "SET_EXPERIENCE",
  SET_CTA = "SET_CTA",
  SET_CONNECT_ME = "SET_CONNECT_ME",
  SET_ACTIVE_SECTION_WITH_EDITING = "SET_ACTIVE_SECTION_WITH_EDITING",
}

export type StateActions = {
  type: Actions;
  payload: any;
};

export const initialState = {
  pageTitle: "",
  pageIcon: "",
  activeSection: "",
  editing: false,
  section: [] as Section[],
  preview: false,
  publish: false,
  profile: {
    name: "",
    email: "",
    profileImage: "",
  },
  intro:
    '[{"type":"heading-one","children":[{"text":"Click to add title"}]},{"type":"paraText-one","children":[{"text":"Click to add subtitle"}]}]',
  aboutMe:
    '[{"type":"heading-two","children":[{"text":"About Me \\n"}]},{"type":"","children":[{"text":"Start writing..."}]}]',
  skills: [
    {
      id: "skill_1",
      value:
        '[{"type":"heading-three","children":[{"text":"Untitled\\n"}]},{"type":"paraText-two","children":[{"text":"Write a description here...\\n"}]},{"type":"paraText-two","children":[{"text":"Start writing..."}]}]',
    },
  ],
  projects: {
    head: '[{"type":"heading-two","children":[{"text":"Projects\\n"}]},{"type":"","children":[{"text":"Add subText here...\\n"}]}]',
    items: [
      {
        id: "project_1",
        logo: "",
        title: "Enter Project title",
        link: "🔗 Add link",
        description: '[{"type":"","children":[{"text":"Add description"}]}]',
      },
    ],
  },
  experience: {
    head: '[{"type":"heading-two","children":[{"text":"Experience \\n "}]},{"type":"","children":[{"text":"Add subtext here..."}]}]',
    items: [
      {
        id: "exp_1",
        logo: "",
        workInfo:
          '[{"type":"","children":[{"text":"Enter Company Name .","semiBold":true},{"text":"Designation . ","small":true},{"text":"Location . timeLine","smallGray":true}]}]',
        description: '[{"type":"","children":[{"text":"Add description..."}]}]',
      },
    ],
  },
  cta: {
    head: '[{"type":"heading-two","children":[{"text":"Blogs and resources \\n "}]},{"type":"","children":[{"text":"Add subtext here...\\n"}]}]',
    items: [
      {
        id: "cta_1",
        title: "",
        icon: "",
        link: "",
        description: '[{"type":"","children":[{"text":"Add description..."}]}]',
      },
    ],
  },
  connect: {
    head: '[{"type":"heading-two","children":[{"text":"Enter Title here \\n"}]},{"type":"","children":[{"text":"Add subtitle here... \\n"}]}]',
    icon: "",
    link: "Add link",
  },
};

export const reducer = (
  state: typeof initialState,
  action: StateActions,
): typeof initialState => {
  const {type, payload} = action;

  const RemoveSection = (item: Section) => {
    const {section} = state;
    const index = section.indexOf(item);
    if (index >= 0) section.splice(index, 1);
    return section;
  };

  switch (type) {
    case Actions.SET_SECTION:
      return {
        ...state,
        section: [...state.section, payload],
        activeSection: payload,
        editing: true,
      };

    case Actions.SET_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: payload,
        editing: false,
      };
    case Actions.SET_ACTIVE_SECTION_WITH_EDITING:
      return {
        ...state,
        activeSection: payload,
        editing: !!payload,
      };

    case Actions.SET_EDITING:
      return {...state, editing: payload};

    case Actions.REMOVE_SECTION:
      return {
        ...state,
        section: RemoveSection(payload),
        activeSection: "",
        editing: false,
      };

    case Actions.SET_INTRO:
      return {...state, intro: payload};

    case Actions.SET_PROFILE:
      return {...state, profile: {...state.profile, ...payload}};

    case Actions.SET_ABOUT_ME:
      const isUpdated = Object.values(payload).filter((item) => !!item).length;
      return {
        ...state,
        ...(isUpdated
          ? {}
          : {
              section: RemoveSection(Section.AboutMe),
            }),
        aboutMe: payload,
        editing: false,
      };

    case Actions.SET_SKILL:
      const {skill} = payload;
      return {
        ...state,
        ...(skill.length
          ? {}
          : {
              section: RemoveSection(Section.ContactMe),
            }),
        skills: skill,
        editing: false,
      };

    case Actions.SET_PROJECT:
      const {project} = payload;
      return {
        ...state,
        ...(project.items.length || project.title || project.description
          ? {}
          : {
              section: RemoveSection(Section.Projects),
            }),
        projects: project,
        editing: false,
      };

    case Actions.SET_EXPERIENCE:
      const {experience} = payload;
      return {
        ...state,
        ...(experience.items.length ||
        experience.title ||
        experience.description
          ? {}
          : {
              section: RemoveSection(Section.Experience),
            }),
        experience,
        editing: false,
      };

    case Actions.SET_CTA:
      const {cta} = payload;
      return {
        ...state,
        ...(cta.items.length || cta.title || cta.description
          ? {}
          : {
              section: RemoveSection(Section.CTA),
            }),
        cta,
        editing: false,
      };

    case Actions.SET_CONNECT_ME:
      const isEdited = Object.values(payload).filter((item) => !!item).length;

      return {
        ...state,
        ...(isEdited
          ? {}
          : {
              section: RemoveSection(Section.ContactMe),
            }),
        connect: payload,
        editing: false,
      };

    default:
      return state;
  }
};
