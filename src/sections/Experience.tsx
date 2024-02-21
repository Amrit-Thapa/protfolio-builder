import classNames from "classnames";
import React from "react";
import {useAppContext} from "../context/AppContext";
import Image from "next/image";
import ImagePicker from "../component/ImagePicker";
import plusIcon from "@/../public/assets/icons/plus.png";
import {Section} from "@/types";
import {resizeTextArea} from "@/utils";
import useLocalStorage from "@/hooks/useLocalStorage";

const initialState = {
  title: "Experience",
  description: "",
  items: [
    {
      id: "exp_1",
      logo: "",
      designation: "",
      name: "",
      location: "",
      timeLine: "",
      description: "",
    },
  ],
};

const Experience = () => {
  const {setActiveSection, activeSection, updateSection} = useAppContext();
  const {
    updates: experienceSection,
    setUpdates: setExperienceSection,
    initialData,
    storeAllData,
  } = useLocalStorage<typeof initialState>(Section.Experience, initialState);

  const handleChange = (id: string, key: string, value: string) => {
    setExperienceSection((prev) => {
      return {
        ...prev,
        items: prev.items.map((item) =>
          item.id === id ? {...item, [key]: value} : item,
        ),
      };
    });
  };

  return (
    <section
      className="flex justify-end w-full mt-24"
      onClick={(e) => {
        e.stopPropagation();
        setActiveSection(undefined);
      }}
    >
      <aside
        className={classNames(
          "md:w-[852px] w-full md:p-10 md:min-h-[428px] rounded-lg",
          {
            "md:border border-[#828282] relative":
              activeSection === Section.Experience,
          },
        )}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(Section.Experience);
        }}
      >
        {activeSection === Section.Experience && (
          <div className="absolute right-0 flex gap-4 -top-14">
            <button
              className="text-xs font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                initialData
                  ? setExperienceSection(initialData)
                  : updateSection((sections) => {
                      const index = sections.indexOf(Section.ContactMe);

                      return [...sections.splice(index, 1)];
                    });

                setActiveSection(undefined);
              }}
            >
              Cancel
            </button>
            <button
              className="text-white rounded-3xl bg-[#0085FF] text-xs font-semibold px-4 py-1"
              onClick={(e) => {
                e.stopPropagation();
                storeAllData(Section.Experience, experienceSection);
                setActiveSection(undefined);
              }}
            >
              Save
            </button>
          </div>
        )}
        <input
          className="w-full text-2xl md:text-3xl font-bold text-black bg-transparent outline-none"
          value={experienceSection.title}
          onChange={(e) =>
            setExperienceSection((prev) => {
              return {...prev, title: e.target.value};
            })
          }
        />
        <textarea
          className={classNames(
            "bg-transparent text-black outline-none w-full font-sm md:font-medium max-w-[501px] md:text-base mt-5",
            "resize-none overflow-hidden border-none p-0 m-0 text-sm",
          )}
          value={experienceSection.description}
          placeholder="Add subtext here.."
          onChange={(e) =>
            setExperienceSection((prev) => {
              return {...prev, description: resizeTextArea(e)};
            })
          }
        />
        <div>
          {experienceSection.items.map((exp) => {
            return (
              <div
                className={classNames(
                  "bg-white text-[#C6C6C6] rounded-2xl border w-full p-10 min-h-[222px] mt-5",
                  {
                    "shadow-xl": exp.id.includes("1"),
                  },
                )}
              >
                <div>
                  <div className="flex flex-wrap items-end gap-3">
                    <ImagePicker
                      src={exp.logo}
                      onChange={(b64) =>
                        handleChange(exp.id, "logo", b64 as string)
                      }
                      height={50}
                      width={50}
                      id={`${exp.id}_logo`}
                      className="rounded w-[50px]"
                    />
                    <div>
                      <input
                        className="text-base font-semibold text-black bg-transparent outline-none"
                        value={exp.name}
                        placeholder="Enter company title"
                        onChange={(e) =>
                          handleChange(exp.id, "name", e.target.value)
                        }
                      />
                      <input
                        className="text-sm font-medium text-black bg-transparent outline-none"
                        value={exp.designation}
                        placeholder="Enter designation"
                        onChange={(e) =>
                          handleChange(exp.id, "designation", e.target.value)
                        }
                      />
                      <div className="flex">
                        <input
                          className="bg-transparent text-[#858585] outline-none font-medium text-xs"
                          value={exp.location}
                          placeholder="+Add location"
                          onChange={(e) =>
                            handleChange(exp.id, "location", e.target.value)
                          }
                        />
                        <input
                          className="bg-transparent text-[#858585] outline-none font-medium text-xs"
                          value={exp.timeLine}
                          placeholder="year"
                          onChange={(e) =>
                            handleChange(exp.id, "timeLine", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <textarea
                    className={classNames(
                      "bg-transparent text-black outline-none w-full font-medium max-w-[501px] text-sm",
                      "resize-none overflow-hidden border-none p-0 mt-10",
                    )}
                    value={exp.description}
                    placeholder="Add subtext here..."
                    onChange={(e) =>
                      handleChange(exp.id, "description", resizeTextArea(e))
                    }
                  />
                </div>
              </div>
            );
          })}
          {activeSection === Section.Experience && (
            <div className="rounded-2xl border p-3 mt-5 w-full flex items-center justify-center bg-[#EFEFEF]">
              <div
                className="cursor-pointer"
                onClick={() =>
                  setExperienceSection((prev) => {
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
      </aside>
    </section>
  );
};

export default Experience;
