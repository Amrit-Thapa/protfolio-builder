"use client";
import {Fragment} from "react";
import AddSection from "./component/AddSection";
import {useAppContext} from "./context/AppContext";
import Header from "./sections/Header";
import HeroSection from "./sections/HeroSection";
import {Section} from "./types";

const sectionMap = {
  [Section.AboutMe]: <HeroSection />,
};

export default function Home() {
  const {section, activeSection} = useAppContext();
  return (
    <>
      <Header />
      {!!section?.length &&
        section.map((item) => {
          return (
            <Fragment key={item}>
              {sectionMap[item as Section.AboutMe]}
            </Fragment>
          );
        })}
      {!!section?.length && section.length < 5 && <AddSection />}
    </>
  );
}
