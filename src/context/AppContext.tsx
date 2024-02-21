"use client";
import {sectionConfig} from "@/utils";
import React, {createContext, useState, useContext} from "react";
import {Section} from "../types";

type appContext = {
  activeSection?: Section;
  section: Section[];
  setActiveSection: React.Dispatch<React.SetStateAction<Section | undefined>>;
  updateSection: React.Dispatch<React.SetStateAction<Section[]>>;
};

const checkKeysInLocalStorage = () => {
  if (typeof window !== "undefined") {
    return Object.keys(sectionConfig).filter(
      (key) => localStorage.getItem(key) !== null,
    );
  } else {
    return [];
  }
};

export const AppContext = createContext<appContext>({} as appContext);
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
  const [activeSection, setActiveSection] = useState<Section | undefined>();
  const [section, updateSection] = useState<Section[]>([
    ...(checkKeysInLocalStorage() as Section[]),
  ]);

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
