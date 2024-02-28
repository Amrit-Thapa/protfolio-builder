import imageIcon from "@/../public/assets/icons/imageIcon.png";
import ImagePicker from "../component/ImagePicker";
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
import {Plus} from "lucide-react";

const Projects = () => {
  const {state, dispatch} = useAppContext();
  const {projects, activeSection, editing, publish, preview} = state;
  const [projectUpdates, setUpdates] = useState(projects);
  const isSectionActive = activeSection === Section.Projects;
  const enableEditing = isSectionActive && editing;
  const viewOnly = publish || preview;

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

      <TextEditor
        initialText={JSON.parse(projectUpdates.head)}
        disabled={!enableEditing || viewOnly}
        onChange={(value) => {
          setUpdates((prev) => {
            return {...prev, head: value};
          });
        }}
      />

      <div className="flex flex-wrap gap-4 mt-5">
        {projectUpdates.items?.map((project) => {
          return (
            <div
              className="bg-white text-[#C6C6C6] rounded-2xl border w-[355px] p-10 min-h-[222px]"
              key={project.id}
            >
              <div className="flex flex-col gap-2">
                <If condition={isSectionActive || !!project.logo}>
                  <div
                    onClick={(e) => {
                      if (!enableEditing || viewOnly) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
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
                  </div>
                </If>

                <If condition={isSectionActive || !!project.title}>
                  <input
                    disabled={!enableEditing || viewOnly}
                    className="mt-3 text-base font-medium text-black bg-transparent outline-none"
                    value={project.title}
                    placeholder="Enter project title"
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
                      disabled={!enableEditing || viewOnly}
                      value={project.link}
                      onBlur={() => {
                        if (!project.link) return;
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
                <If condition={isSectionActive || !!project.description}>
                  <div className="mt-3 text-black">
                    <TextEditor
                      initialText={JSON.parse(project.description)}
                      disabled={!enableEditing || viewOnly}
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
        {enableEditing && (
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
              <Plus className="m-auto" />
              Add new card
            </div>
          </div>
        )}
      </div>
    </ActionController>
  );
};

export default Projects;
