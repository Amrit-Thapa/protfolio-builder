import classNames from "classnames";
import React, {useState} from "react";
import imageIcon from "@/../public/assets/icons/imageIcon.png";
import {useAppContext} from "../context/AppContext";
import Image from "next/image";
import ImagePicker from "../component/ImagePicker";
import plusIcon from "@/../public/assets/icons/plus.png";
import {removeUnUpdatedItem} from "@/utils";
import If from "@/component/If";
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
import {Descendant} from "slate";

const Experience = () => {
  const {state, dispatch} = useAppContext();
  const {experience, activeSection, editing} = state;
  const [experienceUpdate, setUpdates] = useState(experience);
  const isSectionActive = activeSection === Section.Experience;
  const disableEditing = !isSectionActive || (isSectionActive && !editing);

  const [editingSec, setEditSec] = useState("");

  const handleChange = (
    id: string,
    key: string,
    value: string | Descendant[],
  ) => {
    setUpdates((prev) => {
      return {
        ...prev,
        items: prev.items.map((item) =>
          item.id === id ? {...item, [key]: value} : item,
        ),
      };
    });
  };

  const handleCancelButton = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setUpdates(experience);
    setEditSec("");
    dispatch({type: Actions.SET_EDITING, payload: false});
  };

  const handleSaveClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const {items, title, description} = experienceUpdate;
    const hasUpdatedExperience = removeUnUpdatedItem(items);

    setUpdates({
      title,
      description,
      items: hasUpdatedExperience,
    });
    setEditSec("");

    dispatch({
      type: Actions.SET_EXPERIENCE,
      payload: {
        experience: {
          title,
          description,
          items: hasUpdatedExperience,
        },
      },
    });
  };

  const onDeleteClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({type: Actions.REMOVE_SECTION, payload: Section.Experience});
  };

  const onEditClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({type: Actions.SET_EDITING, payload: true});
  };

  console.log({isSectionActive, editing, experienceEdit: editingSec});
  return (
    <ActionController active={isSectionActive}>
      <ActionGroup>
        {editing ? (
          <>
            <CancelButton onClick={handleCancelButton} />
            <SaveButton onClick={handleSaveClick} />
          </>
        ) : (
          <>
            <DeleteButton onClick={onDeleteClick} />
            <EditButton onClick={onEditClick} />
          </>
        )}
      </ActionGroup>
      <div
        onClick={(e) => {
          if (isSectionActive) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (!disableEditing) {
            setEditSec("head");
          }
        }}
      >
        <TextEditor
          initialText={experienceUpdate.head as Descendant[]}
          disabled={disableEditing || editingSec !== "head"}
          onChange={(value) =>
            setUpdates((prev) => {
              return {...prev, head: value};
            })
          }
        />
      </div>

      <div>
        {experienceUpdate.items.map((exp) => {
          return (
            <div
              key={exp.id}
              className={classNames(
                "bg-white rounded-2xl border w-full p-10 min-h-[200px] mt-5",
                {
                  "shadow-xl": exp.id.includes("1"),
                },
              )}
            >
              <div>
                <div className="flex items-center gap-3">
                  <If
                    condition={
                      isSectionActive || !!(!isSectionActive && exp.logo)
                    }
                  >
                    <ImagePicker
                      src={exp.logo || imageIcon.src}
                      onChange={(b64) =>
                        handleChange(exp.id, "logo", b64 as string)
                      }
                      height={50}
                      width={50}
                      id={`${exp.id}_logo`}
                      className="rounded w-[50px]"
                    />
                  </If>

                  <div
                    className="w-full"
                    onClick={(e) => {
                      if (isSectionActive) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                      if (!disableEditing) {
                        setEditSec(exp.id);
                      }
                    }}
                  >
                    <TextEditor
                      initialText={exp.workInfo as Descendant[]}
                      disabled={disableEditing || editingSec !== exp.id}
                      onChange={(value) =>
                        handleChange(exp.id, "workInfo", value)
                      }
                    />
                  </div>
                </div>
                <If
                  condition={
                    isSectionActive || !!(!isSectionActive && exp.description)
                  }
                >
                  <div
                    onClick={(e) => {
                      if (isSectionActive) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                      if (!disableEditing) {
                        setEditSec(exp.id + "des");
                      }
                    }}
                    className="mt-5"
                  >
                    <TextEditor
                      initialText={exp.description as Descendant[]}
                      disabled={disableEditing || editingSec !== exp.id + "des"}
                      onChange={(value) =>
                        handleChange(exp.id, "description", value)
                      }
                    />
                  </div>
                </If>
              </div>
            </div>
          );
        })}
        {isSectionActive && editing && (
          <div className="rounded-2xl border p-3 mt-5 w-full flex items-center justify-center bg-[#EFEFEF]">
            <div
              className="cursor-pointer"
              onClick={() =>
                setUpdates((prev) => {
                  return {
                    ...prev,
                    items: [
                      ...prev.items,
                      {
                        id: `exp_${prev.items.length + 1}`,
                        logo: "",
                        workInfo: [
                          {
                            type: "",
                            children: [
                              {
                                text: "Enter Company Name .",
                                semiBold: true,
                              },
                              {
                                text: "Designation . ",
                                small: true,
                              },
                              {
                                text: "Location . ",
                                smallGray: true,
                              },
                              {
                                text: "timeLine",
                                smallGray: true,
                              },
                            ],
                          },
                        ],
                        description: [
                          {
                            type: "",
                            children: [
                              {
                                text: "",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  };
                })
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

export default Experience;
