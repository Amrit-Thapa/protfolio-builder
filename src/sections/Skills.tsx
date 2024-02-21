import Image from "next/image";
import plusIcon from "@/../public/assets/icons/plus.png";
import {useAppContext} from "../context/AppContext";
import classNames from "classnames";
import {Section} from "@/types";
import {resizeTextArea} from "@/utils";
import useLocalStorage from "@/hooks/useLocalStorage";

const initialState = [
  {
    id: "skill_1",
    title: "Untitled",
    description: "Write description here...",
    text: "Start writing",
  },
];

const Skills = () => {
  const {setActiveSection, activeSection} = useAppContext();
  const {
    updates: skillSection,
    setUpdates: setSkillSection,
    storeAllData,
    initialData,
  } = useLocalStorage<typeof initialState>(Section.Skills, initialState);

  const handleChange = (id: string, key: string, value: string) => {
    setSkillSection((prev) => {
      return prev.map((item) =>
        item.id === id ? {...item, [key]: value} : item,
      );
    });
  };

  return (
    <section
      className="flex justify-end w-full mt-24"
      onClick={() => setActiveSection(undefined)}
    >
      <aside
        className={classNames(
          "w-full md:w-[852px] rounded-lg p-3 md:p-10 flex flex-wrap gap-4",
          {
            "border border-[#828282] relative":
              activeSection === Section.Skills,
          },
        )}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(Section.Skills);
        }}
      >
        {activeSection === Section.Skills && (
          <div className="absolute right-0 flex gap-4 -top-14">
            <button
              className="text-xs font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                setActiveSection(undefined);
                setSkillSection(initialData || initialState);
              }}
            >
              Cancel
            </button>
            <button
              className="text-white rounded-3xl bg-[#0085FF] text-xs font-semibold px-4 py-1"
              onClick={(e) => {
                e.stopPropagation();
                storeAllData(Section.Skills, skillSection);
                setActiveSection(undefined);
              }}
            >
              Save
            </button>
          </div>
        )}
        {skillSection.map((skill) => (
          <div
            className="bg-white text-[#C6C6C6] rounded-2xl border max-w-[375px] p-10 h-fit"
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
                    id: `skill_${prev.length + 1}`,
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
