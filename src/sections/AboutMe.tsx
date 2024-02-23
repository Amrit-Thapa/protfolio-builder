import classNames from "classnames";
import {useAppContext} from "../context/AppContext";
import {Section} from "../types";
import {resizeTextArea} from "@/utils";
import useLocalStorage from "@/hooks/useLocalStorage";
import If from "@/component/If";
import {SyntheticEvent, useState} from "react";
import ActionController from "@/component/ActionController";

const initialState = {
  title: "About Me",
  description: "",
};

const AboutMe = () => {
  const {setActiveSection, activeSection, updateSection} = useAppContext();
  const {updates, setUpdates, storeAllData, initialData} = useLocalStorage<
    typeof initialState
  >(Section.AboutMe, initialState);
  const [editing, setEditing] = useState(!initialData);

  const isSectionActive = activeSection === Section.AboutMe;

  const valueUpdated = () => {
    return Object.values(updates).filter((item) => !!item).length;
  };

  const handleCancelButton = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (initialData) {
      setUpdates(initialData);
    } else {
      updateSection((sections) => {
        const index = sections.indexOf(Section.AboutMe);
        sections.splice(index, 1);
        return [...sections];
      });
    }
    setActiveSection(undefined);
    setEditing(false);
  };

  const handleSaveClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    if (valueUpdated()) {
      storeAllData(Section.AboutMe, updates);
    } else {
      updateSection((sections) => {
        const index = sections.indexOf(Section.AboutMe);
        sections.splice(index, 1);
        return [...sections];
      });
      setUpdates(initialState);
    }
    setActiveSection(undefined);
    setEditing(false);
  };

  const handleOnDelete = (e: SyntheticEvent) => {
    e.stopPropagation();

    setUpdates(initialState);
    setActiveSection(undefined);
    updateSection((sections) => {
      const index = sections.indexOf(Section.AboutMe);
      sections.splice(index, 1);
      return [...sections];
    });
  };

  return (
    <section
      className="flex justify-end w-full mt-20"
      onClick={(e) => {
        e.stopPropagation();
        setActiveSection(undefined);
      }}
    >
      <aside
        className={classNames("md:w-[852px] w-full rounded-lg md:p-10", {
          "md:border border-[#828282] md:min-h-[428px]": isSectionActive,
        })}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(Section.AboutMe);
        }}
      >
        <ActionController
          isEditing={editing}
          onEditing={setEditing}
          onDelete={handleOnDelete}
          onMove={() => console.log}
          onSave={handleSaveClick}
          onCancel={handleCancelButton}
        >
          <If condition={editing || !!(!editing && updates.title)}>
            <textarea
              rows={1}
              className="w-full text-2xl font-bold text-black bg-transparent outline-none md:text-3xl"
              value={updates.title}
              disabled={!editing}
              placeholder="About Me"
              onChange={(e) =>
                setUpdates((prev) => {
                  return {
                    ...prev,
                    title: resizeTextArea(e),
                  };
                })
              }
            />
          </If>

          <If condition={editing || !!(!editing && updates.description)}>
            <textarea
              className={classNames(
                "bg-transparent text-black outline-none w-full font-medium text-sm md:text-base",
                "resize-none overflow-hidden border-none p-0 mt-5",
              )}
              value={updates.description}
              disabled={!editing}
              placeholder="Start writing"
              onChange={(e) =>
                setUpdates((prev) => {
                  return {
                    ...prev,
                    description: resizeTextArea(e),
                  };
                })
              }
            />
          </If>
        </ActionController>
      </aside>
    </section>
  );
};

export default AboutMe;
