import classNames from "classnames";
import ImagePicker from "../component/ImagePicker";
import Image from "next/image";
import plusIcon from "@/../public/assets/icons/plus.png";
import {useAppContext} from "@/context/AppContext";
import {Section} from "@/types";
import {resizeTextArea} from "@/utils";
import useLocalStorage from "@/hooks/useLocalStorage";

const initialState = {
  title: "Projects",
  description: "",
  items: [
    {
      id: "project_1",
      logo: "",
      title: "",
      link: "",
      description: "",
    },
  ],
};

const Projects = () => {
  const {setActiveSection, activeSection, updateSection} = useAppContext();
  const {
    updates: projectSection,
    setUpdates: setProjectSection,
    initialData,
    storeAllData,
  } = useLocalStorage<typeof initialState>(Section.Projects, initialState);

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
      className="flex justify-end w-full mt-20"
      onClick={() => setActiveSection(undefined)}
    >
      <aside
        className={classNames(
          "md:w-[852px] w-full md:p-10 md:min-h-[428px] rounded-lg",
          {
            "md:border border-[#828282] relative":
              activeSection === Section.Projects,
          },
        )}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(Section.Projects);
        }}
      >
        {activeSection === Section.Projects && (
          <div className="absolute right-0 flex gap-4 -top-10 md:-top-14">
            <button
              className="text-xs font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                initialData
                  ? setProjectSection(initialData)
                  : updateSection((sections) => {
                      const index = sections.indexOf(Section.Projects);

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
                storeAllData(Section.Projects, projectSection);
                setActiveSection(undefined);
              }}
            >
              Save
            </button>
          </div>
        )}
        <input
          className="w-full text-2xl font-bold text-black bg-transparent outline-none md:text-3xl"
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
            "bg-transparent text-black outline-none w-full font-sm md:font-medium max-w-[501px] md:text-base mt-5",
            "resize-none overflow-hidden border-none p-0 m-0 text-sm",
          )}
          value={projectSection.description}
          disabled={!(activeSection === Section.Projects)}
          placeholder="Add subtext here..."
          onChange={(e) =>
            setProjectSection((prev) => {
              return {...prev, description: resizeTextArea(e)};
            })
          }
        />
        <div className="flex flex-wrap gap-4 mt-5">
          {projectSection.items?.map((project) => {
            return (
              <div
                className="bg-white text-[#C6C6C6] rounded-2xl border w-[375px] p-10 min-h-[222px]"
                key={project.id}
              >
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
                    className="mt-3 text-base font-medium text-black bg-transparent outline-none"
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
                      handleChange(project.id, "description", resizeTextArea(e))
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
                          id: `project_${prev.items.length + 1}`,
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
