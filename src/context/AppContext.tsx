"use client";
import React, {createContext, useState, useContext} from "react";
import {Section} from "../types";

type appContext = {
  activeSection?: Section;
  section: Section[];
  setActiveSection: React.Dispatch<React.SetStateAction<Section | undefined>>;
  updateSection: React.Dispatch<React.SetStateAction<Section[]>>;
};

export const AppContext = createContext<appContext>({} as appContext);
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
  const [activeSection, setActiveSection] = useState<Section | undefined>();
  const [section, updateSection] = useState<Section[]>([Section.HeroSection]);

  return (
    <AppContext.Provider
      value={{
        activeSection,
        section,

        setActiveSection,
        updateSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
