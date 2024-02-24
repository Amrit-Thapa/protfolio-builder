import {Cta, Experience, Project, Skill, Connect, Section} from "./types";

export enum Actions {
  SET_PROFILE = "SET_PROFILE",
  // UPDATE_PROFILE = "UPDATE_PROFILE",
  SET_INTRO = "SET_INTRO",
  SET_SECTION = "SET_SECTION",
  REMOVE_SECTION = "REMOVE_SECTION",
  // UPDATE_INTRO = "UPDATE_INTRO",
}

export type StateActions = {
  type: Actions;
  payload: any;
};

export const initialState = {
  activeSection: "",
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
    title: "",
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
  switch (type) {
    case Actions.SET_SECTION:
      return {
        ...state,
        section: [...state.section, payload.section],
        activeSection: payload.section,
      };
    case Actions.REMOVE_SECTION:
      const index = state.section.indexOf(payload);
      state.section.splice(index, 1);
      return {
        ...state,
        activeSection: "",
      };
    case Actions.SET_INTRO:
      return {...state, intro: payload};

    case Actions.SET_PROFILE:
      return {...state, profile: payload};
    default:
      return state;
  }
};
