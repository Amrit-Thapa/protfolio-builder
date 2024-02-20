import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import Image from "next/image";
import plusIcon from "@/../public/assets/icons/plus.png";
import SkillCard from "../../component/Card";
import {useAppContext} from "../context/AppContext";
import classNames from "classnames";

const Skills = () => {
  const {skillSection, setSkillSection} = useAppContext();

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
    field: string,
  ) => {
    const textareaLineHeight = 24;
    event.target.style.height = "auto";
    event.target.style.height =
      event.target.scrollHeight + textareaLineHeight + "px";

    // setSkillSection(prev => {
    //   return []
    // })
  };

  return (
    <section className="w-full mt-24 flex justify-end">
      <aside className="w-full md:w-[852px] md:min-h-[428px] border border-[#828282] rounded-lg p-3 md:p-10 flex flex-wrap gap-4">
        {skillSection.map((skill) => (
          <div className="bg-white text-[#C6C6C6] rounded-2xl border max-w-[375px] p-10 min-h-[530px]">
            <textarea
              className={classNames(
                "bg-transparent text-black w-full font-bold text-xl outline-none",
                "resize-none overflow-hidden border-none p-0 m-0",
              )}
              value={skill.title}
              placeholder="Untitled"
              onChange={(e) => handleChange(e, "title")}
            />
            <textarea
              className={classNames(
                "bg-transparent text-black outline-none w-full font-normal text-sm",
                "resize-none overflow-hidden border-none p-0 m-0",
              )}
              value={skill.description}
              placeholder="Write description here..."
              onChange={(e) => handleChange(e, "description")}
            />
            <textarea
              className={classNames(
                "bg-transparent text-black outline-none w-full font-medium text-base",
                "resize-none overflow-hidden border-none p-0 m-0",
              )}
              value={skill.text}
              placeholder="Start writing"
              onChange={(e) => handleChange(e, "text")}
            />
          </div>
        ))}
        <div className="rounded-2xl border p-3 w-[375px] min-h-[530px] flex items-center justify-center bg-[#EFEFEF]">
          <div
            className="cursor-pointer"
            // onClick={() =>
            // }
          >
            <Image src={plusIcon} alt="add" className="m-auto" />
            Add new card
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Skills;
