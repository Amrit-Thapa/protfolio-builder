import {useAppContext} from "../context/AppContext";
import {Plus} from "lucide-react";
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
import TextEditor from "@/component/Editor";
import {RenderElementProps} from "slate-react";
import {extractTextFromJSON} from "@/utils";

const Skills = () => {
  const {state, dispatch} = useAppContext();
  const {skills, editing, activeSection, preview, publish} = state;
  const [skillUpdate, setUpdates] =
    useState<{id: string; value: string}[]>(skills);
  const isSectionActive = activeSection === Section.Skills;
  const enableEditing = isSectionActive && editing;
  const viewOnly = preview || publish;

  console.log({
    enableEditing,
    isSectionActive,
    editing,
    preview,
    publish,
  });

  const handleChange = (id: string, key: string, value: string) => {
    setUpdates((prev) => {
      return prev.map((item) =>
        item.id === id ? {...item, [key]: value} : item,
      );
    });
  };

  const onCancelClick = (e: SyntheticEvent) => {
    setUpdates(skills);
    dispatch({type: Actions.SET_EDITING, payload: false});
  };

  const onSaveClick = (e: SyntheticEvent) => {
    const values = skillUpdate
      .map((item) => item.value)
      .filter((value) => value);

    let updatedFlag: number[] = [];

    values.forEach((element) => {
      updatedFlag.push(extractTextFromJSON(element).length);
    });

    const updatedSkill = [...skillUpdate];

    for (let i = updatedFlag.length - 1; i >= 0; i--) {
      if (updatedFlag[i] === 0) {
        updatedSkill.splice(i, 1);
      }
    }

    setUpdates(updatedSkill);
    dispatch({type: Actions.SET_SKILL, payload: updatedSkill});
  };

  const onDeleteClick = (e: SyntheticEvent) => {
    dispatch({type: Actions.REMOVE_SECTION, payload: Section.Skills});
  };

  const onEditClick = (e: SyntheticEvent) => {
    dispatch({type: Actions.SET_EDITING, payload: true});
  };

  return (
    <ActionController active={isSectionActive || !viewOnly}>
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
            className={classNames(
              "md:max-w-[355px] bg-white rounded-2xl border w-full p-10 h-fit",
              {"h-full": isSectionActive},
            )}
            key={skill.id}
          >
            <TextEditor
              id={skill.id}
              initialText={JSON.parse(skill?.value)}
              disabled={!enableEditing || viewOnly}
              onChange={(value) => {
                handleChange(skill.id, "value", value);
              }}
              placeholder={SkillsPlaceHolder}
            />
          </div>
        ))}
        {(enableEditing || !viewOnly) && (
          <div className="rounded-2xl border p-3 w-[355px] min-h-[530px] flex items-center justify-center bg-[#EFEFEF]">
            <div
              className="cursor-pointer"
              onClick={() =>
                setUpdates((prev) => [
                  ...prev,
                  {
                    id: `skill_${prev.length + 1}`,
                    value:
                      '[{"type":"heading-three","children":[{"text":"Untitled\\n"}]},{"type":"paraText-two","children":[{"text":"Write a description here...\\n"}]},{"type":"paraText-two","children":[{"text":"Start writing..."}]}]',
                  },
                ])
              }
            >
              <Plus className="m-auto" />
              Add new card
            </div>
          </div>
        )}
      </div>
    </ActionController>
  );
};

export default Skills;

const SkillsPlaceHolder = ({attributes}: RenderElementProps) => (
  <div {...attributes} className="!p-0 !m-0">
    <div className="text-2xl font-bold md:text-3xl ">Untitled</div>
    <br />
    <div className="text-sm font-normal">Write description here...</div>
    <br />
    <div className="text-base font-medium">Start writing...</div>
  </div>
);
