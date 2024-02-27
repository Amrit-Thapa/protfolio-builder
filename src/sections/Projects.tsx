import imageIcon from "@/../public/assets/icons/imageIcon.png";
import ImagePicker from "../component/ImagePicker";
import Image from "next/image";
import plusIcon from "@/../public/assets/icons/plus.png";
import {useAppContext} from "@/context/AppContext";
import If from "@/component/If";
import {Section} from "@/context/types";
import {useState} from "react";
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

const Projects = () => {
  const {state, dispatch} = useAppContext();
  const {projects, activeSection, editing} = state;
  const [projectUpdates, setUpdates] = useState(projects);
  const isSectionActive = activeSection === Section.Projects;
  const disableEditing = !isSectionActive || (isSectionActive && !editing);
  const [editingSec, setEditSec] = useState("");

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
    dispatch({
      type: Actions.SET_PROJECT,
      payload: {
        project: projectUpdates,
      },
    });
  };

  const onDeleteClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({type: Actions.REMOVE_SECTION, payload: Section.Projects});
  };

  const onEditClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({type: Actions.SET_EDITING, payload: true});
  };

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
          initialText={JSON.parse(projectUpdates.head)}
          disabled={disableEditing || editingSec !== "head"}
          onChange={(value) => {
            setUpdates((prev) => {
              return {...prev, head: value};
            });
          }}
        />
      </div>

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
                    placeholder="Enter project title"
                    onClick={(e) => {
                      if (isSectionActive) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                    onChange={(e) =>
                      handleChange(project.id, "title", e.target.value)
                    }
                  />
                </If>

                <div>
                  <If condition={isSectionActive}>
                    <input
                      className="bg-transparent outline-none font-medium text-sm text-[#0085FF]"
                      placeholder="🔗 Link title here"
                      disabled={disableEditing}
                      onClick={(e) => {
                        if (!disableEditing) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                      value={project.link}
                      onBlur={() => {
                        const url = prompt("Enter link Url");
                        if (url) {
                          handleChange(project.id, "linkUrl", url);
                        }
                      }}
                      onChange={(e) =>
                        handleChange(project.id, "link", e.target.value)
                      }
                    />
                  </If>
                  <If condition={!isSectionActive && !!project.linkUrl}>
                    <a
                      href={project.linkUrl}
                      target="_blank"
                      className="text-sm "
                    >
                      <span>{project.link}</span>
                    </a>
                  </If>
                </div>
                <If
                  condition={
                    isSectionActive ||
                    !!(!isSectionActive && project.description)
                  }
                >
                  <div
                    onClick={(e) => {
                      if (isSectionActive) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                      if (!disableEditing) {
                        setEditSec(project.id + "des");
                      }
                    }}
                    className="mt-3 text-black"
                  >
                    <TextEditor
                      initialText={JSON.parse(project.description)}
                      disabled={
                        disableEditing || editingSec !== project.id + "des"
                      }
                      onChange={(value) => {
                        handleChange(project.id, "description", value);
                      }}
                    />
                  </div>
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
                        logo: "",
                        title: "Enter Project title",
                        link: "🔗 Add link",
                        linkUrl: "",
                        description:
                          '[{"type":"","children":[{"text":"Add description"}]}]',
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
