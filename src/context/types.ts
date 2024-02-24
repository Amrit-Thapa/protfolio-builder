export enum Section {
  AboutMe = "AboutMe",
  Skills = "Skills",
  Projects = "Projects",
  Experience = "Experience",
  CTA = "CTA",
  HeroSection = "HeroSection",
  ContactMe = "ContactMe",
}

type section = {
  title: "";
  description: "";
};

type Item = section & {
  id: "";
  logo: "";
  link: "";
};

export type Profile = {
  name: string;
  email: string;
  profileImage: string;
};

export type Intro = section;

export type AboutMe = section;

export type Project = section & {
  project: Item[];
};

export type Skill = (section & {id: string; text: string})[];

export type Experience = section & {
  experience: {
    id: string;
    logo: string;
    designation: string;
    name: string;
    location: string;
    timeLine: string;
    description: string;
  }[];
};

export type Cta = section & {
  cta: section &
    {
      id: string;
      icon: string;
      link: string;
    }[];
};

export type Connect = section & {
  icon: string;
  link: string;
};
