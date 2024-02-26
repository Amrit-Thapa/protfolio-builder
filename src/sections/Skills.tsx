import Image from "next/image";
import plusIcon from "@/../public/assets/icons/plus.png";
import {useAppContext} from "../context/AppContext";
import classNames from "classnames";
import React, {SyntheticEvent, useState} from "react";
import {Section} from "@/context/types";
import ActionController, {
  ActionGroup,
  CancelButton,
  DeleteButton,
  EditButton,
  SaveButton,
} from "@/component/ActionController";
import {Actions} from "@/context/reducer";
import {removeUnUpdatedItem} from "@/utils";
import TextEditor, {BlockType} from "@/component/Editor";
import {Descendant} from "slate";

const Skills = () => {
  const {state, dispatch} = useAppContext();
  const {skills, editing, activeSection} = state;
  const [skillUpdate, setUpdates] =
    useState<{id: string; value: Descendant[]}[]>(skills);
  const [skillEditing, setSkillEditing] = useState("");
  const isSectionActive = activeSection === Section.Skills;
  const disableEditing = !isSectionActive || (isSectionActive && !editing);

  const handleChange = (id: string, key: string, value: Descendant[]) => {
    setUpdates((prev) => {
      return prev.map((item) =>
        item.id === id ? {...item, [key]: value} : item,
      );
    });
  };

  const onCancelClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    setUpdates(skills);
    setSkillEditing("");
    dispatch({type: Actions.SET_EDITING, payload: false});
  };

  const onSaveClick = (e: SyntheticEvent) => {
    e.stopPropagation();

    const skill = removeUnUpdatedItem(skillUpdate);
    setUpdates(skill);
    setSkillEditing("");
    dispatch({type: Actions.SET_SKILL, payload: {skill}});
  };

  const onDeleteClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch({type: Actions.REMOVE_SECTION, payload: Section.Skills});
  };

  const onEditClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    setSkillEditing("");
    dispatch({type: Actions.SET_EDITING, payload: true});
  };

  return (
    <ActionController active={isSectionActive}>
      <ActionGroup>
        {editing ? (
          <>
            <CancelButton onClick={onCancelClick} />
            <SaveButton onClick={onSaveClick} />
          </>
        ) : (
          <>
            <DeleteButton onClick={onDeleteClick} />
            <EditButton onClick={onEditClick} />
          </>
        )}
      </ActionGroup>
      <div className="flex flex-wrap gap-4">
        {skillUpdate.map((skill) => (
          <div
            className="w-full"
            onClick={(e) => {
              if (isSectionActive) {
                e.preventDefault();
                e.stopPropagation();
              }

              if (editing) {
                setSkillEditing(skill.id);
              }
            }}
            key={skill.id}
          >
            <TextEditor
              id={skill.id}
              initialText={skill?.value}
              disabled={skillEditing !== skill.id}
              onChange={(value) => handleChange(skill.id, "value", value)}
              className={classNames(
                "bg-white rounded-2xl border md:w-[335px] w-full p-10 h-fit",
                {"h-full": isSectionActive},
              )}
            />
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
                    value: [
                      {
                        type: "heading-three" as BlockType,
                        children: [{text: "Untitled \n"}],
                      },
                      {
                        type: "paraText-two" as BlockType,
                        children: [
                          {
                            text: "subText... \n",
                          },
                        ],
                      },
                      {
                        type: "paraText-two" as BlockType,
                        children: [
                          {
                            text: "Start writing...",
                          },
                        ],
                      },
                    ],
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
