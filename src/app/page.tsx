"use client";
import ConnectMe from "@/sections/ConnectMe";
import Profile from "@/sections/Profile";
import AddSection from "../component/AddSection";
import {useAppContext} from "../context/AppContext";
import AboutMe from "../sections/AboutMe";
import CTA from "../sections/CTA";
import Experience from "../sections/Experience";
import Header from "../sections/Header";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import Intro from "../sections/Intro";
import NavBar from "@/sections/NavBar";
import {Section} from "@/context/types";
import If from "@/component/If";

const sectionMap = {
  [Section.AboutMe]: <AboutMe />,
  [Section.Skills]: <Skills />,
  [Section.Projects]: <Projects />,
  [Section.Experience]: <Experience />,
  [Section.CTA]: <CTA />,
  [Section.ContactMe]: <ConnectMe />,
};

export default function Home() {
  const {state, dispatch} = useAppContext();
  const {section} = state;
  return (
    <>
      <Header />
      <div className="h-[30px] mt-[50px] w-full bg-red-100 px-5 md:px-[100px]">
        <NavBar />
      </div>

      <div className="flex flex-wrap items-start justify-between px-5 md:flex-nowrap md:px-[100px]">
        <div className="md:sticky md:top-20 w-[295px]">
          <Profile />
        </div>
        <div className="md:w-[852px]  w-full md:p-10">
          <Intro />
          <If condition={section.includes(Section.AboutMe)}>
            <AboutMe />
          </If>
        </div>
      </div>
      <AddSection />

      {/* <HeroSection />
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
      <AddSection /> */}
    </>
  );
}
