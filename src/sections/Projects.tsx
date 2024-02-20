import classNames from "classnames";
import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import ImagePicker from "../component/ImagePicker";
import Image from "next/image";
import plusIcon from "@/../public/assets/icons/plus.png";

const Projects = () => {
  const [description, setDescription] = useState("Projects");
  const [subText, setSubTitle] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
    setter: Dispatch<SetStateAction<string>>,
  ) => {
    setter(event.target.value);
    const textareaLineHeight = 24;
    event.target.style.height = "auto";
    event.target.style.height =
      event.target.scrollHeight + textareaLineHeight + "px";
  };
  return (
    <section className="w-full mt-24 flex justify-end">
      <aside className="md:w-[852px] md:p-10 md:min-h-[428px] border border-[#828282] rounded-lg">
        <textarea
          className="bg-transparent text-black w-full font-bold text-3xl outline-none"
          value={description}
          placeholder="Click to add title"
          onChange={(e) => handleChange(e, setDescription)}
        />
        <textarea
          className={classNames(
            "bg-transparent text-black outline-none w-full font-medium max-w-[501px] text-base",
            "resize-none overflow-hidden border-none p-0 m-0",
          )}
          value={subText}
          placeholder="Add subtext here..."
          onChange={(e) => handleChange(e, setSubTitle)}
        />
        <div className="flex gap-4">
          <div className="bg-white text-[#C6C6C6] rounded-2xl border w-[375px] p-10 min-h-[222px]">
            <div className="flex flex-col gap-2">
              <ImagePicker
                height={50}
                width={50}
                prevH={24}
                prevW={24}
                id="project-icon"
                className="rounded"
              />
              <input
                className="bg-transparent text-black outline-none font-medium text-base"
                // value={title}
                placeholder="Enter site title"
                // onChange={(e) => setTitle(e.target.value)}
              />
              <div className="">
                <a></a>
                <input
                  className="bg-transparent outline-none font-medium text-sm text-[#0085FF]"
                  // value={title}
                  // onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <textarea
                className={classNames(
                  "bg-transparent text-black outline-none w-full font-medium max-w-[501px] text-sm",
                  "resize-none overflow-hidden border-none p-0 m-0",
                )}
                value={subText}
                placeholder="Add subtext here..."
                onChange={(e) => handleChange(e, setSubTitle)}
              />
            </div>
          </div>
          <div className="rounded-2xl border p-3 w-[375px] min-h-[222px] flex items-center justify-center bg-[#EFEFEF]">
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

export default Projects;
