"use client";
import ConnectMe from "@/sections/ConnectMe";
import {Fragment} from "react";
import AddSection from "../component/AddSection";
import {useAppContext} from "../context/AppContext";
import AboutMe from "../sections/AboutMe";
import CTA from "../sections/CTA";
import Experience from "../sections/Experience";
import Header from "../sections/Header";
import HeroSection from "../sections/HeroSection";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import {Section} from "../types";

const sectionMap = {
  [Section.AboutMe]: <AboutMe />,
  [Section.Skills]: <Skills />,
  [Section.Projects]: <Projects />,
  [Section.Experience]: <Experience />,
  [Section.CTA]: <CTA />,
  [Section.ContactMe]: <ConnectMe />,
};

export default function Home() {
  const {section, activeSection} = useAppContext();
  return (
    <>
      <Header />
      <HeroSection />
      <div className="px-5 md:px-[100px] flex flex-col items-end">
        <div className="w-full">
          {!!section?.length &&
            section.map((item) => {
              return (
                <Fragment key={item}>
                  {sectionMap[item as Section.AboutMe]}
                </Fragment>
              );
            })}
        </div>
      </div>
      {section.length < 7 && <AddSection />}
    </>
  );
}
