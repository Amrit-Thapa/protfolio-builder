"use client";
import {Fragment} from "react";
import AddSection from "./component/AddSection";
import {useAppContext} from "./context/AppContext";
import AboutMe from "./sections/AboutMe";
import Header from "./sections/Header";
import HeroSection from "./sections/HeroSection";
import Skills from "./sections/Skills";
import {Section} from "./types";

const sectionMap = {
  [Section.AboutMe]: <AboutMe />,
  [Section.Skills]: <Skills />,
};

export default function Home() {
  const {section, activeSection} = useAppContext();
  return (
    <>
      <Header />
      <HeroSection />
      {!!section?.length &&
        section.map((item) => {
          return (
            <Fragment key={item}>
              {sectionMap[item as Section.AboutMe]}
            </Fragment>
          );
        })}
      {section.length < 5 && <AddSection />}
    </>
  );
}
