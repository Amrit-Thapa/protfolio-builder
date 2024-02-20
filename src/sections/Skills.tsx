import Image from "next/image";
import plusIcon from "@/../public/assets/icons/plus.png";
import {useAppContext} from "../context/AppContext";
import classNames from "classnames";
import {Section} from "@/types";
import {resizeTextArea} from "@/utils";

const Skills = () => {
  const {skillSection, setSkillSection, setActiveSection, activeSection} =
    useAppContext();

  const handleChange = (id: string, key: string, value: string) => {
    setSkillSection((prev) => {
      return prev.map((item) =>
        item.id === id ? {...item, [key]: value} : item,
      );
    });
  };

  return (
    <section
      className="w-full mt-24 flex justify-end"
      onClick={() => setActiveSection(Section.Skills)}
    >
      <aside
        className={classNames(
          "w-full md:w-[852px] md:min-h-[428px] rounded-lg p-3 md:p-10 flex flex-wrap gap-4",
          {"border border-[#828282]": activeSection === Section.Skills},
        )}
      >
        {skillSection.map((skill) => (
          <div
            className="bg-white text-[#C6C6C6] rounded-2xl border max-w-[375px] p-10"
            key={skill.id}
          >
            <textarea
              className={classNames(
                "bg-transparent text-black w-full font-bold text-xl outline-none",
                "resize-none overflow-hidden border-none p-0 m-0",
              )}
              value={skill.title}
              disabled={!(activeSection === Section.Skills)}
              placeholder="Untitled"
              onChange={(e) =>
                handleChange(skill.id, "title", resizeTextArea(e))
              }
            />
            <textarea
              className={classNames(
                "bg-transparent text-black outline-none w-full font-normal text-sm",
                "resize-none overflow-hidden border-none p-0 m-0",
              )}
              value={skill.description}
              disabled={!(activeSection === Section.Skills)}
              placeholder="Write description here..."
              onChange={(e) =>
                handleChange(skill.id, "description", resizeTextArea(e))
              }
            />
            <textarea
              className={classNames(
                "bg-transparent text-black outline-none w-full font-medium text-base",
                "resize-none overflow-hidden border-none p-0 m-0",
              )}
              value={skill.text}
              disabled={!(activeSection === Section.Skills)}
              placeholder="Start writing"
              onChange={(e) =>
                handleChange(skill.id, "text", resizeTextArea(e))
              }
            />
          </div>
        ))}
        {activeSection === Section.Skills && (
          <div className="rounded-2xl border p-3 w-[375px] min-h-[530px] flex items-center justify-center bg-[#EFEFEF]">
            <div
              className="cursor-pointer"
              onClick={() =>
                setSkillSection((prev) => [
                  ...prev,
                  {
                    id: `project_${prev.length + 1}`,
                    description: "",
                    text: "",
                    title: "",
                  },
                ])
              }
            >
              <Image src={plusIcon} alt="add" className="m-auto" />
              Add new card
            </div>
          </div>
        )}
      </aside>
    </section>
  );
};

export default Skills;
