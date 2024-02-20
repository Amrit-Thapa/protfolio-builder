import classNames from "classnames";
import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import ImagePicker from "../component/ImagePicker";
import Image from "next/image";
import plusIcon from "@/../public/assets/icons/plus.png";
import {useAppContext} from "@/context/AppContext";
import {Section} from "@/types";
import PreviousMap from "postcss/lib/previous-map";

const Projects = () => {
  const {projectSection, setProjectSection, setActiveSection, activeSection} =
    useAppContext();

  const handleChange = (id: string, key: string, value: string) => {
    setProjectSection((prev) => {
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
      className="w-full mt-24 flex justify-end"
      onClick={() => setActiveSection(Section.Projects)}
    >
      <aside
        className={classNames(
          "md:w-[852px] md:p-10 md:min-h-[428px] rounded-lg",
          {"border border-[#828282]": activeSection === Section.Projects},
        )}
      >
        <input
          className="bg-transparent text-black w-full font-bold text-3xl outline-none"
          value={projectSection.title}
          disabled={!(activeSection === Section.Projects)}
          placeholder="Click to add title"
          onChange={(e) =>
            setProjectSection((prev) => {
              return {...prev, title: e.target.value};
            })
          }
        />
        <textarea
          className={classNames(
            "bg-transparent text-black outline-none w-full font-medium max-w-[501px] text-base mt-3",
            "resize-none overflow-hidden border-none p-0 m-0",
          )}
          value={projectSection.description}
          disabled={!(activeSection === Section.Projects)}
          placeholder="Add subtext here..."
          onChange={(e) =>
            setProjectSection((prev) => {
              return {...prev, description: e.target.value};
            })
          }
        />
        <div className="flex flex-wrap gap-4">
          {projectSection.items.map((project) => {
            return (
              <div className="bg-white text-[#C6C6C6] rounded-2xl border w-[375px] p-10 min-h-[222px]">
                <div className="flex flex-col gap-2">
                  <ImagePicker
                    src={project.logo}
                    height={50}
                    width={50}
                    id={`${project.id}_logo`}
                    onChange={(b64) =>
                      handleChange(project.id, "logo", b64 as string)
                    }
                  />
                  <input
                    disabled={!(activeSection === Section.Projects)}
                    className="bg-transparent text-black outline-none font-medium text-base"
                    value={project.title}
                    placeholder="Enter site title"
                    onChange={(e) =>
                      handleChange(project.id, "title", e.target.value)
                    }
                  />
                  <div className="">
                    {
                      <input
                        disabled={!(activeSection === Section.Projects)}
                        className="bg-transparent outline-none font-medium text-sm text-[#0085FF]"
                        placeholder="Link"
                        value={project.link}
                        onChange={(e) =>
                          handleChange(project.id, "link", e.target.value)
                        }
                      />
                    }
                    {activeSection === Section.Projects && project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        className="text-sm text-[#0085FF]"
                      >
                        <span>🔗 {project.link}</span>
                      </a>
                    )}
                  </div>
                  <textarea
                    className={classNames(
                      "bg-transparent text-black outline-none w-full font-medium max-w-[501px] text-sm",
                      "resize-none overflow-hidden border-none p-0 m-0",
                    )}
                    disabled={!(activeSection === Section.Projects)}
                    value={project.description}
                    placeholder="Add subtext here..."
                    onChange={(e) =>
                      handleChange(project.id, "description", e.target.value)
                    }
                  />
                </div>
              </div>
            );
          })}
          {activeSection === Section.Projects && (
            <div className="rounded-2xl border p-3 w-[375px] min-h-[222px] flex items-center justify-center bg-[#EFEFEF]">
              <div
                className="cursor-pointer"
                onClick={() =>
                  setProjectSection((prev) => {
                    return {
                      ...prev,
                      items: [
                        ...prev.items,
                        {
                          id: `skill_${prev.items.length + 1}`,
                          description: "",
                          link: "",
                          logo: "",
                          title: "",
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

export default Projects;
