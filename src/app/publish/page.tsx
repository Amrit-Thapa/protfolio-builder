"use client";
import {useAppContext} from "@/context/AppContext";
import {Actions} from "@/context/reducer";
import {Section} from "@/context/types";
import AboutMe from "@/sections/AboutMe";
import ConnectMe from "@/sections/ConnectMe";
import CTA from "@/sections/CTA";
import Experience from "@/sections/Experience";
import Intro from "@/sections/Intro";
import NavBar from "@/sections/NavBar";
import Profile from "@/sections/Profile";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import React, {useEffect} from "react";

const sectionMap = {
  [Section.AboutMe]: <AboutMe />,
  [Section.Skills]: <Skills />,
  [Section.Projects]: <Projects />,
  [Section.Experience]: <Experience />,
  [Section.CTA]: <CTA />,
  [Section.ContactMe]: <ConnectMe />,
};

const Publish = () => {
  const {state, dispatch} = useAppContext();
  const {section} = state;

  useEffect(() => {
    dispatch({type: Actions.ACTIVE_PUBLISH, payload: true});
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-[50]"
        onClick={(e) => {
          e.stopPropagation;
          e.preventDefault();
        }}
      ></div>
      <div className="h-[30px] mt-[50px] w-full px-5 md:px-[100px]">
        <NavBar />
      </div>

      <div className="flex flex-wrap items-start justify-between px-5 md:flex-nowrap md:px-[100px]">
        <div className="md:sticky md:top-20 w-[295px]">
          <Profile />
        </div>
        <div className="md:w-[852px]  w-full md:p-10">
          <Intro />
          {section.map((item) => {
            return (
              <div
                className="mt-10 md:mt-20"
                id={item}
                key={item}
                // onClick={() =>
                //   dispatch({type: Actions.SET_ACTIVE_SECTION, payload: item})
                // }
              >
                {sectionMap[item]}
              </div>
            );
          })}
        </div>
      </div>
      {/* <AddSection /> */}
    </>
  );
};

export default Publish;
