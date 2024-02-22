import Image from "next/image";
import plusIcon from "@/../public/assets/icons/plus.png";
import {useAppContext} from "../context/AppContext";
import classNames from "classnames";
import {Section} from "@/types";
import {resizeTextArea} from "@/utils";
import useLocalStorage from "@/hooks/useLocalStorage";
import If from "@/component/If";
import React, {useEffect} from "react";

const initialState = [
  {
    id: "skill_1",
    title: "",
    description: "",
    text: "",
  },
];

const Skills = () => {
  const {setActiveSection, activeSection, updateSection, section} =
    useAppContext();
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

  const isSectionActive = activeSection === Section.Skills;

  const handleCancelButton = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (initialData) {
      setSkillSection(initialData);
    } else {
      updateSection((sections) => {
        const index = sections.indexOf(Section.Skills);
        sections.splice(index, 1);
        return [...sections];
      });
    }

    setActiveSection(undefined);
  };

  const handleSaveClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    if (skillSection.length === 1) {
      const updatedSkill = Object.values(skillSection[0]).filter(
        (item) => !!item,
      );
      if (updatedSkill.length > 1) {
        storeAllData(Section.Skills, skillSection);
      } else {
        updateSection((sections) => {
          const index = sections.indexOf(Section.Skills);
          sections.splice(index, 1);
          return [...sections];
        });
        setSkillSection([]);
      }
    }
    setActiveSection(undefined);
  };

  return (
    <section
      className="flex justify-end w-full mt-10"
      onClick={() => setActiveSection(undefined)}
    >
      <aside
        className={classNames(
          "w-full md:w-[852px] rounded-lg md:p-10 flex flex-wrap gap-4",
          {
            "md:border border-[#828282] relative": isSectionActive,
          },
        )}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(Section.Skills);
        }}
      >
        {activeSection === Section.Skills && (
          <div className="absolute right-0 flex gap-4 md:-top-14 -top-10">
            <button
              className="text-xs font-semibold"
              onClick={handleCancelButton}
            >
              Cancel
            </button>
            <button
              className="text-white rounded-3xl bg-[#0085FF] text-xs font-semibold px-4 py-1"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        )}
        {skillSection.map((skill) => (
          <div
            className={classNames(
              "bg-white text-[#C6C6C6] rounded-2xl border max-w-[375px] p-10 h-fit",
              {"h-full": isSectionActive},
            )}
            key={skill.id}
          >
            <If
              condition={isSectionActive || !!(!isSectionActive && skill.title)}
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
            </If>

            <If
              condition={
                isSectionActive || !!(!isSectionActive && skill.description)
              }
            >
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
            </If>

            <If
              condition={isSectionActive || !!(!isSectionActive && skill.text)}
            >
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
            </If>
          </div>
        ))}
        {isSectionActive && (
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
