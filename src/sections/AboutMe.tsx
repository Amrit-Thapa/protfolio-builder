import classNames from "classnames";
import {useAppContext} from "../context/AppContext";
import {Section} from "../types";
import {resizeTextArea} from "@/utils";
import useLocalStorage from "@/hooks/useLocalStorage";

const initialState = {
  title: "About me",
  description: "",
};

const AboutMe = () => {
  const {setActiveSection, activeSection, updateSection} = useAppContext();
  const {updates, setUpdates, storeAllData, initialData} = useLocalStorage<
    typeof initialState
  >(Section.AboutMe, initialState);

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
          "md:border border-[#828282] relative md:min-h-[428px]":
            activeSection === Section.AboutMe,
        })}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(Section.AboutMe);
        }}
      >
        {activeSection === Section.AboutMe && (
          <div className="absolute right-0 flex gap-4 -top-10 md:-top-14">
            <button
              className="text-xs font-semibold"
              onClick={(e) => {
                e.stopPropagation();

                initialData
                  ? setUpdates(initialData)
                  : updateSection((sections) => {
                      const index = sections.indexOf(Section.AboutMe);

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
                storeAllData(Section.AboutMe, updates);
                setActiveSection(undefined);
              }}
            >
              Save
            </button>
          </div>
        )}
        <textarea
          rows={1}
          className="w-full text-2xl font-bold text-black bg-transparent outline-none md:text-3xl"
          value={updates.title}
          disabled={activeSection !== Section.AboutMe}
          placeholder="Click to add title"
          onChange={(e) =>
            setUpdates((prev) => {
              return {
                ...prev,
                title: resizeTextArea(e),
              };
            })
          }
        />
        <textarea
          className={classNames(
            "bg-transparent text-black outline-none w-full font-medium text-sm md:text-base",
            "resize-none overflow-hidden border-none p-0 mt-5",
          )}
          value={updates.description}
          disabled={activeSection !== Section.AboutMe}
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
      </aside>
    </section>
  );
};

export default AboutMe;
