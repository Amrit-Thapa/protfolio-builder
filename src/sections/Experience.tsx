import classNames from "classnames";
import React, {useState} from "react";
import imageIcon from "@/../public/assets/icons/imageIcon.png";
import {useAppContext} from "../context/AppContext";
import Image from "next/image";
import ImagePicker from "../component/ImagePicker";
import plusIcon from "@/../public/assets/icons/plus.png";
import {removeUnUpdatedItem, resizeTextArea} from "@/utils";
import If from "@/component/If";
import {Section} from "@/context/types";
import ActionController from "@/component/ActionController";
import {Actions} from "@/context/reducer";

const Experience = () => {
  const {state, dispatch} = useAppContext();
  const {experience, activeSection, editing} = state;
  const [experienceUpdate, setUpdates] = useState(experience);
  const isSectionActive = activeSection === Section.Experience;
  const disableEditing = !isSectionActive || (isSectionActive && !editing);

  const handleChange = (id: string, key: string, value: string) => {
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

    setUpdates(experience);
    dispatch({type: Actions.SET_EDITING, payload: false});
  };

  const handleSaveClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    const {items, title, description} = experienceUpdate;
    const hasUpdatedExperience = removeUnUpdatedItem(items);

    setUpdates({
      title,
      description,
      items: hasUpdatedExperience,
    });

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

  return (
    <ActionController
      enabled={isSectionActive}
      isEditing={editing}
      onCancel={handleCancelButton}
      onDelete={() =>
        dispatch({type: Actions.REMOVE_SECTION, payload: Section.Experience})
      }
      onEditing={() => dispatch({type: Actions.SET_EDITING, payload: true})}
      onMove={() => console.log}
      onSave={handleSaveClick}
    >
      <If
        condition={
          isSectionActive || !!(!isSectionActive && experienceUpdate.title)
        }
      >
        <input
          className="w-full text-2xl font-bold text-black bg-transparent outline-none md:text-3xl"
          placeholder="Experience"
          value={experienceUpdate.title}
          disabled={disableEditing}
          onChange={(e) =>
            setUpdates((prev) => {
              return {...prev, title: e.target.value};
            })
          }
        />
      </If>

      <If
        condition={
          isSectionActive ||
          !!(!isSectionActive && experienceUpdate.description)
        }
      >
        <textarea
          className={classNames(
            "bg-transparent text-black outline-none w-full font-sm md:font-medium max-w-[501px] md:text-base mt-5",
            "resize-none overflow-hidden border-none p-0 m-0 text-sm",
          )}
          disabled={disableEditing}
          value={experienceUpdate.description}
          placeholder="Add subtext here.."
          onChange={(e) =>
            setUpdates((prev) => {
              return {...prev, description: resizeTextArea(e)};
            })
          }
        />
      </If>

      <div>
        {experienceUpdate.items.map((exp) => {
          return (
            <div
              key={exp.id}
              className={classNames(
                "bg-white text-[#C6C6C6] rounded-2xl border w-full p-10 min-h-[222px] mt-5",
                {
                  "shadow-xl": exp.id.includes("1"),
                },
              )}
            >
              <div>
                <div className="flex flex-wrap items-end gap-3">
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

                  <div>
                    <If
                      condition={
                        isSectionActive || !!(!isSectionActive && exp.name)
                      }
                    >
                      <input
                        className="text-base font-semibold text-black bg-transparent outline-none"
                        value={exp.name}
                        disabled={disableEditing}
                        placeholder="Enter company title"
                        onChange={(e) =>
                          handleChange(exp.id, "name", e.target.value)
                        }
                      />
                    </If>

                    <If
                      condition={
                        isSectionActive ||
                        !!(!isSectionActive && exp.designation)
                      }
                    >
                      <input
                        className="text-sm font-medium text-black bg-transparent outline-none"
                        value={exp.designation}
                        disabled={disableEditing}
                        placeholder="Enter designation"
                        onChange={(e) =>
                          handleChange(exp.id, "designation", e.target.value)
                        }
                      />
                    </If>

                    <div className="flex">
                      <If
                        condition={
                          isSectionActive ||
                          !!(!isSectionActive && exp.location)
                        }
                      >
                        <input
                          className="bg-transparent text-[#858585] outline-none font-medium text-xs"
                          value={exp.location}
                          disabled={disableEditing}
                          placeholder="+Add location"
                          onChange={(e) =>
                            handleChange(exp.id, "location", e.target.value)
                          }
                        />
                      </If>

                      <If
                        condition={
                          isSectionActive ||
                          !!(!isSectionActive && exp.timeLine)
                        }
                      >
                        <input
                          className="bg-transparent text-[#858585] outline-none font-medium text-xs"
                          value={exp.timeLine}
                          disabled={disableEditing}
                          placeholder="year"
                          onChange={(e) =>
                            handleChange(exp.id, "timeLine", e.target.value)
                          }
                        />
                      </If>
                    </div>
                  </div>
                </div>
                <If
                  condition={
                    isSectionActive || !!(!isSectionActive && exp.description)
                  }
                >
                  <textarea
                    className={classNames(
                      "bg-transparent text-black outline-none w-full font-medium max-w-[501px] text-sm",
                      "resize-none overflow-hidden border-none p-0 mt-10",
                    )}
                    value={exp.description}
                    disabled={disableEditing}
                    placeholder="Add subtext here..."
                    onChange={(e) =>
                      handleChange(exp.id, "description", resizeTextArea(e))
                    }
                  />
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
                        description: "",
                        designation: "",
                        location: "",
                        logo: "",
                        name: "",
                        timeLine: "",
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
