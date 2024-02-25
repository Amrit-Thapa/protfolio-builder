import Image from "next/image";
import plusIcon from "@/../public/assets/icons/plus.png";
import {useAppContext} from "../context/AppContext";
import classNames from "classnames";
import {resizeTextArea} from "@/utils";
import If from "@/component/If";
import React, {useState} from "react";
import {Section} from "@/context/types";
import ActionController from "@/component/ActionController";
import {Actions} from "@/context/reducer";
import {removeUnUpdatedItem} from "@/utils";

const Skills = () => {
  const {state, dispatch} = useAppContext();
  const {skills, editing, activeSection} = state;
  const [skillUpdate, setUpdates] = useState(skills);
  const isSectionActive = activeSection === Section.Skills;
  const disableEditing = !isSectionActive || (isSectionActive && !editing);

  const handleChange = (id: string, key: string, value: string) => {
    setUpdates((prev) => {
      return prev.map((item) =>
        item.id === id ? {...item, [key]: value} : item,
      );
    });
  };

  const handleCancelButton = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setUpdates(skills);
    dispatch({type: Actions.SET_EDITING, payload: false});
  };

  const handleSaveClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    const skill = removeUnUpdatedItem(skillUpdate);
    setUpdates(skill);
    dispatch({type: Actions.SET_SKILL, payload: {skill}});
  };

  return (
    <ActionController
      enabled={isSectionActive}
      isEditing={editing}
      onCancel={handleCancelButton}
      onDelete={() =>
        dispatch({type: Actions.REMOVE_SECTION, payload: Section.Skills})
      }
      onEditing={() => dispatch({type: Actions.SET_EDITING, payload: true})}
      onMove={() => console.log}
      onSave={handleSaveClick}
    >
      <div className="flex flex-wrap gap-4">
        {skillUpdate.map((skill) => (
          <div
            className={classNames(
              "bg-white text-[#C6C6C6] rounded-2xl border max-w-[355px] p-10 h-fit",
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
                disabled={disableEditing}
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
                disabled={disableEditing}
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
                  "resize-none overflow-hidden border-none p-0 m-0 mt-5 leading-10",
                )}
                value={skill.text}
                disabled={disableEditing}
                placeholder="Start writing"
                onChange={(e) =>
                  handleChange(skill.id, "text", resizeTextArea(e))
                }
              />
            </If>
          </div>
        ))}
        {isSectionActive && editing && (
          <div className="rounded-2xl border p-3 w-[355px] min-h-[530px] flex items-center justify-center bg-[#EFEFEF]">
            <div
              className="cursor-pointer"
              onClick={() =>
                setUpdates((prev) => [
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
      </div>
    </ActionController>
  );
};

export default Skills;
