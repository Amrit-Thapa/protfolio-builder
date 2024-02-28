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
import MainContainer, {
  RightContainer,
  SectionContainer,
  StickyLeftContainer,
} from "@/component/Container";
import {Actions} from "@/context/reducer";

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
  const {section, activeSection, editing, preview, publish} = state;
  return (
    <>
      <Header />
      <NavBar />
      <MainContainer>
        <StickyLeftContainer>
          <Profile />
        </StickyLeftContainer>
        <RightContainer>
          <Intro />
          {section.map((item) => {
            return (
              <div
                key={item}
                onClick={() => {
                  if (
                    (activeSection === item && editing) ||
                    preview ||
                    publish
                  ) {
                    return;
                  }
                  dispatch({type: Actions.SET_ACTIVE_SECTION, payload: item});
                }}
              >
                <SectionContainer id={item}>
                  {sectionMap[item]}
                </SectionContainer>
              </div>
            );
          })}
        </RightContainer>
      </MainContainer>
      <AddSection />
    </>
  );
}
