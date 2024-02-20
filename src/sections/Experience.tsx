import classNames from "classnames";
import React, {ChangeEvent} from "react";
import {useAppContext} from "../context/AppContext";
import Image from "next/image";
import ImagePicker from "../component/ImagePicker";
import plusIcon from "@/../public/assets/icons/plus.png";

const Experience = () => {
  const {experienceSection, setExperienceSection} = useAppContext();

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
    field: string,
  ) => {
    const textareaLineHeight = 24;
    event.target.style.height = "auto";
    event.target.style.height =
      event.target.scrollHeight + textareaLineHeight + "px";
    setExperienceSection((prev) => {
      return {
        ...prev,
        [field]: event.target.value,
      };
    });
  };

  return (
    <section className="w-full mt-24 flex justify-end">
      <aside className="md:w-[852px] md:p-10 md:min-h-[428px] border border-[#828282] rounded-lg">
        <input
          className="bg-transparent text-black w-full font-bold text-3xl outline-none"
          value={experienceSection.title}
          onChange={(e) => handleChange(e, "title")}
        />
        <textarea
          className={classNames(
            "bg-transparent text-black outline-none w-full mt-2 font-medium text-base",
            "resize-none overflow-hidden border-none p-0 m-0",
          )}
          value={experienceSection.description}
          placeholder="Add subtext here.."
          onChange={(e) => handleChange(e, "description")}
        />
        <div>
          <div className="bg-white text-[#C6C6C6] rounded-2xl border w-full p-10 min-h-[222px]">
            <div>
              <div className="flex gap-3 items-end">
                <ImagePicker
                  height={50}
                  width={50}
                  prevH={24}
                  prevW={24}
                  id="project-icon"
                  className="rounded w-[50px]"
                />
                <div>
                  <input
                    className="bg-transparent text-black outline-none font-semibold text-base"
                    // value={title}
                    placeholder="Enter company title"
                    // onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    className="bg-transparent text-black outline-none font-medium text-sm"
                    // value={title}
                    placeholder="Enter designation"
                    // onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    className="bg-transparent text-[#858585] outline-none font-medium text-xs"
                    // value={title}
                    placeholder="+Add location"
                    // onChange={(e) => setTitle(e.target.value)}
                  />
                  .
                  <input
                    className="bg-transparent text-[#858585] outline-none font-medium text-xs"
                    // value={title}
                    placeholder="year"
                    // onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <textarea
                className={classNames(
                  "bg-transparent text-black outline-none w-full font-medium max-w-[501px] text-sm",
                  "resize-none overflow-hidden border-none p-0 mt-10",
                )}
                // value={subText}
                placeholder="Add subtext here..."
                // onChange={(e) => handleChange(e, setSubTitle)}
              />
            </div>
          </div>
          <div className="rounded-2xl border p-3 mt-5 w-full flex items-center justify-center bg-[#EFEFEF]">
            <div
              className="cursor-pointer"
              // onClick={() =>
              //   setSkillList((prev) => [...prev, `skill_${prev.length + 1}`])
              // }
            >
              <Image src={plusIcon} alt="add" className="m-auto" />
              Add new card
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Experience;
