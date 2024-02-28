"use client";
import MainContainer, {
  RightContainer,
  SectionContainer,
  StickyLeftContainer,
} from "@/component/Container";
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
      <NavBar />
      <MainContainer>
        <StickyLeftContainer>
          <Profile />
        </StickyLeftContainer>
        <RightContainer>
          <Intro />
          {section.map((item) => {
            return (
              <SectionContainer id={item} key={item}>
                {sectionMap[item]}
              </SectionContainer>
            );
          })}
        </RightContainer>
      </MainContainer>
    </>
  );
};

export default Publish;
