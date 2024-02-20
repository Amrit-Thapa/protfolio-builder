import classNames from "classnames";
import React, {ChangeEvent} from "react";
import {useAppContext} from "../context/AppContext";
import {Section} from "../types";

const AboutMe = () => {
  const {aboutMeSection, setAboutMeSection, setActiveSection, activeSection} =
    useAppContext();
  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
    field: string,
  ) => {
    const textareaLineHeight = 24;
    event.target.style.height = "auto";
    event.target.style.height =
      event.target.scrollHeight + textareaLineHeight + "px";
    setAboutMeSection((prev) => {
      return {
        ...prev,
        [field]: event.target.value,
      };
    });
  };

  return (
    <section className="w-full mt-28 md:mt-20 flex justify-end">
      <aside
        className={classNames(
          "md:w-[852px] md:min-h-[428px] rounded-lg p-3 md:p-10",
          {"border border-[#828282]": activeSection},
        )}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(Section.AboutMe);
        }}
      >
        <textarea
          className="bg-transparent text-black w-full font-bold text-3xl outline-none"
          value={aboutMeSection.title}
          placeholder="Click to add title"
          onChange={(e) => handleChange(e, "title")}
        />
        <textarea
          className={classNames(
            "bg-transparent text-black outline-none w-full font-medium text-base",
            "resize-none overflow-hidden border-none p-0 m-0",
          )}
          value={aboutMeSection.description}
          placeholder="Start writing"
          onChange={(e) => handleChange(e, "description")}
        />
      </aside>
    </section>
  );
};

export default AboutMe;
