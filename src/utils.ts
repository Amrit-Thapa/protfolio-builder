import {ChangeEvent} from "react";
import {Section} from "./context/types";

export const sectionConfig = {
  [Section.AboutMe]: {
    title: "📌  Add About you",
  },
  [Section.Skills]: {
    title: "💡  Add Skillsets",
  },
  [Section.CTA]: {
    title: "🔗  Add CTA",
  },
  [Section.Projects]: {
    title: "🛠️  Add Projects",
  },
  [Section.Experience]: {
    title: "🌐  Add Experience",
  },
  [Section.ContactMe]: {
    title: "📞  Add Connect",
  },
};

export const configJson = {
  HeroSection: {
    title: "",
    logo: "",
    name: "",
    email: "",
    introText: "",
    subText: "",
    profileImage: "",
  },
  [Section.AboutMe]: {
    title: "About me",
    description: "",
  },
  [Section.Skills]: [
    {
      id: "",
      title: "",
      description: "",
      text: "",
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
    [Section.Experience]: {
      title: "Experience",
      description: "",
      items: [
        {
          id: "",
          logo: "",
          designation: "",
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
  },
};

export const resizeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
  event.target.style.height = "auto";
  event.target.style.height = `${event.target.scrollHeight}px`;
  return event.target.value;
};

export const removeUnUpdatedItem = (items: any[]) => {
  const hasUpdatedSkills = items.filter((item: any) => {
    const values = Object.values(item).filter((value) => value);
    return values.length > 1;
  });
  return hasUpdatedSkills;
};

export const scrollToSection = (sectionId: Section) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 200;
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
  }
};
