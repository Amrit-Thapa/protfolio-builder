"use client";
import React, {createContext, useState, useContext} from "react";
import {Section} from "../types";

type HeroSection = {
  title: string;
  logo: string;
  name: string;
  email: string;
  introText: string;
  subText: string;
  profileImage: string;
};

const initialState = {
  [Section.HeroSection]: {
    title: "AMRITTHAPA",
    logo: "",
    name: "Amrit Thapa",
    email: "amritthapa@gmail.com",
    introText: "Hey! I'm Neeraj Walia, a full stack developer.",
    subText: "Ready to bring your dream product to life in the virtual world.",
    profileImage: "",
  },
  [Section.AboutMe]: {
    title: "About me",
    description: `I'm your go-to Full Stack Developer, ready to bring your dream product to life in the virtual world. From crafting sleek websites for small and medium-sized businesses to empowering you by building your dream tech product, I've got the skills and expertise to make it happen.

    With a mastery of JavaScript, React.js, Node.js, express.js, CSS and Next.js, I can help ensure your online presence stands out from the crowd. I am skilled in creating user-friendly interfaces, building RESTful APIs, and seamlessly integrating external services. Besides, I am a technical lead/project manager, who prefers to meticulously oversee every aspect of a project, from conception to completion, leaving no room for mediocrity.
    
    Your dream + my expertise = scalable, performant, reliable, and intuitive products. Let's build something extraordinary!
    
    Beyond the code, I step into the shoes of a technical lead and project manager, where I bring a meticulous approach to overseeing every stage of a project. My commitment to excellence leaves no room for mediocrity, ensuring that each endeavor I embark upon is a success.
    
    In the collaborative realm, I thrive. Whether it's solving intricate technical challenges or leading a team towards a shared goal, I believe that extraordinary results are born out of effective collaboration.`,
  },
  [Section.Skills]: [
    {
      id: "1",
      title: "Untitled",
      description: "Write description here...",
      text: "Start writing",
    },
  ],
  [Section.Projects]: {
    title: "Projects",
    description: "",
    items: [
      {
        id: "",
        logo: "",
        title: "",
        link: "",
        description: "",
      },
    ],
  },
  [Section.Experience]: {
    title: "Experience",
    description: "",
    items: [
      {
        id: "exp_1",
        logo: "",
        designation: "",
        name: "",
        location: "",
        timeLine: "",
        description: "",
      },
    ],
  },
  [Section.CTA]: {
    title: "Blogs & Resources",
    description: "",
    items: [
      {
        id: "",
        title: "",
        icon: "",
        description: "",
        link: "",
      },
    ],
  },
  [Section.ContactMe]: {
    title: "",
    description: "",
    icon: "",
    link: "",
  },
};

type appContext = {
  activeSection?: Section;
  section: Section[];
  setActiveSection: React.Dispatch<React.SetStateAction<Section | undefined>>;
  updateSection: React.Dispatch<React.SetStateAction<Section[]>>;
  aboutMeSection: (typeof initialState)[Section.AboutMe];
  skillSection: (typeof initialState)[Section.Skills];
  projectSection: (typeof initialState)[Section.Projects];
  experienceSection: (typeof initialState)[Section.Experience];
  ctaSection: (typeof initialState)[Section.CTA];
  heroSection: (typeof initialState)[Section.HeroSection];
  contactMeSection: (typeof initialState)[Section.ContactMe];

  setAboutMeSection: React.Dispatch<
    React.SetStateAction<(typeof initialState)[Section.AboutMe]>
  >;
  setSkillSection: React.Dispatch<
    React.SetStateAction<(typeof initialState)[Section.Skills]>
  >;
  setProjectSection: React.Dispatch<
    React.SetStateAction<(typeof initialState)[Section.Projects]>
  >;
  setExperienceSection: React.Dispatch<
    React.SetStateAction<(typeof initialState)[Section.Experience]>
  >;
  setCtaSection: React.Dispatch<
    React.SetStateAction<(typeof initialState)[Section.CTA]>
  >;
  setHeroSection: React.Dispatch<
    React.SetStateAction<(typeof initialState)[Section.HeroSection]>
  >;
  setContactMeSection: React.Dispatch<
    React.SetStateAction<(typeof initialState)[Section.ContactMe]>
  >;
};

export const AppContext = createContext<appContext>({} as appContext);
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
  const [activeSection, setActiveSection] = useState<Section | undefined>();
  const [section, updateSection] = useState<Section[]>([Section.HeroSection]);
  const [ctaSection, setCtaSection] = useState(initialState[Section.CTA]);
  const [aboutMeSection, setAboutMeSection] = useState(
    initialState[Section.AboutMe],
  );
  const [skillSection, setSkillSection] = useState(
    initialState[Section.Skills],
  );
  const [projectSection, setProjectSection] = useState(
    initialState[Section.Projects],
  );
  const [heroSection, setHeroSection] = useState(
    initialState[Section.HeroSection],
  );
  const [experienceSection, setExperienceSection] = useState(
    initialState[Section.Experience],
  );
  const [contactMeSection, setContactMeSection] = useState(
    initialState[Section.ContactMe],
  );

  return (
    <AppContext.Provider
      value={{
        experienceSection,
        ctaSection,
        contactMeSection,
        heroSection,
        projectSection,
        aboutMeSection,
        skillSection,
        activeSection,
        section,

        setActiveSection,
        updateSection,
        setAboutMeSection,
        setSkillSection,
        setProjectSection,
        setHeroSection,
        setExperienceSection,
        setCtaSection,
        setContactMeSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
