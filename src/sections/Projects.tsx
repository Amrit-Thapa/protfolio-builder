import classNames from "classnames";
import imageIcon from "@/../public/assets/icons/imageIcon.png";
import ImagePicker from "../component/ImagePicker";
import Image from "next/image";
import plusIcon from "@/../public/assets/icons/plus.png";
import {useAppContext} from "@/context/AppContext";
import {removeUnUpdatedItem, resizeTextArea} from "@/utils";
import If from "@/component/If";
import {Section} from "@/context/types";
import {useState} from "react";
import ActionController from "@/component/ActionController";
import {Actions} from "@/context/reducer";

const Projects = () => {
  const {state, dispatch} = useAppContext();
  const {projects, activeSection, editing} = state;
  const [projectUpdates, setUpdates] = useState(projects);
  const isSectionActive = activeSection === Section.Projects;
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
    setUpdates(projects);
    dispatch({type: Actions.SET_EDITING, payload: false});
  };

  const handleSaveClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    const {items, title, description} = projectUpdates;
    const hasUpdatedProject = removeUnUpdatedItem(items);

    setUpdates({
      title,
      description,
      items: hasUpdatedProject,
    });
    dispatch({
      type: Actions.SET_PROJECT,
      payload: {
        project: {
          title,
          description,
          items: hasUpdatedProject,
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
        dispatch({type: Actions.REMOVE_SECTION, payload: Section.Projects})
      }
      onEditing={() => dispatch({type: Actions.SET_EDITING, payload: true})}
      onMove={() => console.log}
      onSave={handleSaveClick}
    >
      <If
        condition={
          isSectionActive || !!(!isSectionActive && projectUpdates.title)
        }
      >
        <input
          className="w-full text-2xl font-bold text-black bg-transparent outline-none md:text-3xl"
          value={projectUpdates.title}
          disabled={disableEditing}
          placeholder="Projects"
          onChange={(e) =>
            setUpdates((prev) => {
              return {...prev, title: e.target.value};
            })
          }
        />
      </If>

      <If
        condition={
          isSectionActive || !!(!isSectionActive && projectUpdates.description)
        }
      >
        <textarea
          className={classNames(
            "bg-transparent text-black outline-none w-full font-sm md:font-medium max-w-[501px] md:text-base mt-5",
            "resize-none overflow-hidden border-none p-0 m-0 text-sm",
          )}
          value={projectUpdates.description}
          disabled={disableEditing}
          placeholder="Add subtext here..."
          onChange={(e) =>
            setUpdates((prev) => {
              return {...prev, description: resizeTextArea(e)};
            })
          }
        />
      </If>

      <div className="flex flex-wrap gap-4 mt-5">
        {projectUpdates.items?.map((project) => {
          return (
            <div
              className="bg-white text-[#C6C6C6] rounded-2xl border w-[355px] p-10 min-h-[222px]"
              key={project.id}
            >
              <div className="flex flex-col gap-2">
                <If
                  condition={
                    isSectionActive || !!(!isSectionActive && project.logo)
                  }
                >
                  <ImagePicker
                    src={project.logo || imageIcon.src}
                    height={50}
                    width={50}
                    id={`${project.id}_logo`}
                    onChange={(b64) =>
                      handleChange(project.id, "logo", b64 as string)
                    }
                  />
                </If>

                <If
                  condition={
                    isSectionActive || !!(!isSectionActive && project.title)
                  }
                >
                  <input
                    disabled={disableEditing}
                    className="mt-3 text-base font-medium text-black bg-transparent outline-none"
                    value={project.title}
                    placeholder="Enter site title"
                    onChange={(e) =>
                      handleChange(project.id, "title", e.target.value)
                    }
                  />
                </If>

                <div>
                  <If condition={isSectionActive}>
                    <input
                      className="bg-transparent outline-none font-medium text-sm text-[#0085FF]"
                      placeholder="Link"
                      disabled={disableEditing}
                      value={project.link}
                      onChange={(e) =>
                        handleChange(project.id, "link", e.target.value)
                      }
                    />
                  </If>
                  <If condition={!isSectionActive && !!project.link}>
                    <a
                      href={project.link}
                      target="_blank"
                      className="text-sm text-[#0085FF]"
                    >
                      <span>🔗 {project.link}</span>
                    </a>
                  </If>
                </div>
                <If
                  condition={
                    isSectionActive ||
                    !!(!isSectionActive && project.description)
                  }
                >
                  <textarea
                    className={classNames(
                      "bg-transparent text-black outline-none w-full font-medium max-w-[501px] text-sm",
                      "resize-none overflow-hidden border-none p-0 m-0",
                    )}
                    value={project.description}
                    disabled={disableEditing}
                    placeholder="Add subtext here..."
                    onChange={(e) =>
                      handleChange(project.id, "description", resizeTextArea(e))
                    }
                  />
                </If>
              </div>
            </div>
          );
        })}
        {isSectionActive && editing && (
          <div className="rounded-2xl border p-3 w-[355px] min-h-[222px] flex items-center justify-center bg-[#EFEFEF]">
            <div
              className="cursor-pointer"
              onClick={() =>
                setUpdates((prev) => {
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
    </ActionController>
  );
};

export default Projects;
