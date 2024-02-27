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

const sectionMap = {
  [Section.AboutMe]: <AboutMe />,
  [Section.Skills]: <Skills />,
  [Section.Projects]: <Projects />,
  [Section.Experience]: <Experience />,
  [Section.CTA]: <CTA />,
  [Section.ContactMe]: <ConnectMe />,
};

export default function Home() {
  const {state} = useAppContext();
  const {section} = state;
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
              <SectionContainer id={item} key={item}>
                {sectionMap[item]}
              </SectionContainer>
            );
          })}
        </RightContainer>
      </MainContainer>
      <AddSection />
    </>
  );
}
