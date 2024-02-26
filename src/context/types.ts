import {BlockType} from "@/component/Editor";

export enum Section {
  AboutMe = "AboutMe",
  Skills = "Skills",
  Projects = "Projects",
  Experience = "Experience",
  CTA = "CTA",
  ContactMe = "ContactMe",
}
export const a = {
  pageTitle: "",
  pageIcon: "",
  activeSection: "",
  editing: true,
  section: [],
  preview: false,
  publish: false,
  profile: {
    name: "",
    email: "",
    profileImage: "",
  },
  intro:
    '[{"type":"heading-one","children":[{"text":"Click to add title"}]},{"type":"paraText-one","children":[{"text":"Click to add subtitle"}]}]',
  aboutMe:
    '[{"type":"heading-two","children":[{"text":"About Me \\n"}]},{"type":"","children":[{"text":"Start writing..."}]}]',
  skills: [
    {
      id: "skill_1",
      value:
        '[{"type":"heading-three","children":[{"text":"Untitled\\n"}]},{"type":"paraText-two","children":[{"text":"Write a description here...\\n"}]},{"type":"paraText-two","children":[{"text":"Start writing..."}]}]',
    },
  ],
  projects: {
    head: '[{"type":"heading-two","children":[{"text":"Projects\\n"}]},{"type":"","children":[{"text":"Add subText here..."}]}]',
    items: [
      {
        id: "project_1",
        logo: "",
        title: "Enter Project title",
        link: "🔗 Add link",
        description: '[{"type":"","children":[{"text":"Add description"}]}]',
      },
    ],
  },
  experience: {
    head: '[{"type":"heading-two","children":[{"text":"Experience \\n "}]},{"type":"","children":[{"text":"Add subtext here..."}]}]',
    items: [
      {
        id: "exp_1",
        logo: "",
        workInfo:
          '[{"type":"","children":[{"text":"Enter Company Name .","semiBold":true},{"text":"Designation . ","small":true},{"text":"Location . timeLine","smallGray":true}]}]',
        description: '[{"type":"","children":[{"text":"Add description..."}]}]',
      },
    ],
  },
  cta: {
    head: '[{"type":"heading-two","children":[{"text":"Blogs and resources \\n "}]},{"type":"","children":[{"text":"Add subtext here...\\n"}]}]',
    items: [
      {
        id: "cta_1",
        title: "",
        icon: "",
        link: "",
        description: '[{"type":"","children":[{"text":"Add description..."}]}]',
      },
    ],
  },
  connect: {
    head: '[{"type":"heading-two","children":[{"text":"Enter Title here \\n"}]},{"type":"","children":[{"text":"Add subtitle here..."}]}]',
    icon: "",
    link: "Add link",
  },
};
