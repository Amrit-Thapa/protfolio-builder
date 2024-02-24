import {Cta, Experience, Project, Skill, Connect, Section} from "./types";

export enum Actions {
  SET_PROFILE = "SET_PROFILE",
  SET_INTRO = "SET_INTRO",
  SET_SECTION = "SET_SECTION",
  SET_ACTIVE_SECTION = "SET_ACTIVE_SECTION",
  SET_EDITING = "SET_EDITING",
  SET_ABOUT_ME = "SET_ABOUT_ME",

  REMOVE_SECTION = "REMOVE_SECTION",
}

export type StateActions = {
  type: Actions;
  payload: any;
};

export const initialState = {
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
  skills: [] as Skill,
  projects: {} as Project,
  experience: {} as Experience,
  cta: {} as Cta,
  connect: {} as Connect,
};

export const reducer = (
  state: typeof initialState,
  action: StateActions,
): typeof initialState => {
  const {type, payload} = action;

  const RemoveSection = (item: Section) => {
    const index = state.section.indexOf(item);
    state.section.splice(index, 1);
    return state.section;
  };

  switch (type) {
    case Actions.SET_SECTION:
      return {
        ...state,
        section: [...state.section, payload.section],
        activeSection: payload.section,
        editing: true,
      };

    case Actions.SET_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: payload.activeSection,
        editing: !!payload.activeSection,
      };

    case Actions.SET_EDITING:
      return {...state, editing: payload};

    case Actions.REMOVE_SECTION:
      return {
        ...state,
        section: RemoveSection(payload),
        activeSection: "",
      };

    case Actions.SET_INTRO:
      return {...state, intro: payload};

    case Actions.SET_ABOUT_ME:
      const isUpdated = Object.values(payload).filter((item) => !!item).length;
      if (isUpdated) {
        return {
          ...state,
          aboutMe: payload,
          editing: false,
        };
      } else {
        return {
          ...state,
          section: RemoveSection(Section.AboutMe),
          editing: false,
        };
      }

    case Actions.SET_PROFILE:
      return {...state, profile: payload};

    default:
      return state;
  }
};
