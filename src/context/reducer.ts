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
  intro: {
    title: "",
    description: "",
  },
  aboutMe: {
    title: "About Me",
    description: "",
  },
  skills: [
    {
      id: "skill_1",
      title: "Skills",
      description: "",
      text: "",
    },
  ],
  projects: {
    title: "Projects",
    description: "",
    items: [
      {
        id: "project_1",
        logo: "",
        title: "",
        link: "",
        description: "",
      },
    ],
  },
  experience: {
    title: "",
    description: "",
    items: [
      {
        id: "exp_1",
        logo: "",
        designation: "",
        name: "",
        location: "",
        timeLine: "",
        description: "",
      },
    ],
  },
  cta: {
    title: "",
    description: "",
    items: [
      {
        id: "cta_1",
        title: "",
        icon: "",
        description: "",
        link: "",
      },
    ],
  },
  connect: {
    title: "",
    description: "",
    icon: "",
    link: "",
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
    section.splice(index, 1);
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
