import {Section} from "./types";

export const sectionConfig = {
  [Section.HeroSection]: {
    title: "Hero Section",
  },
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
    title: "Connect",
  },
};

export const configJson = {
  [Section.HeroSection]: {
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
