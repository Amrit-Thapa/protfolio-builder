"use client";
import React, {createContext, useContext, useReducer, Reducer} from "react";
import {initialState, reducer, StateActions} from "./reducer";

type appContext = {
  state: typeof initialState;
  dispatch: React.Dispatch<StateActions>;
};

export const AppContext = createContext<appContext>({} as appContext);
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer<
    Reducer<typeof initialState, StateActions>
  >(reducer, initialState as typeof initialState);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
