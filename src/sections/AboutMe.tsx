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
  const {setActiveSection, activeSection} = useAppContext();
  const {updates, setUpdates, storeAllData, initialData} = useLocalStorage<
    typeof initialState
  >(Section.AboutMe, initialState);

  return (
    <section
      className="flex justify-end w-full mt-28 md:mt-20"
      onClick={(e) => {
        e.stopPropagation();
        setActiveSection(undefined);
      }}
    >
      <aside
        className={classNames(
          "md:w-[852px] md:min-h-[428px] rounded-lg p-3 md:p-10",
          {
            "border border-[#828282] relative":
              activeSection === Section.AboutMe,
          },
        )}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(Section.AboutMe);
        }}
      >
        {activeSection === Section.AboutMe && (
          <div className="absolute right-0 flex gap-4 -top-14">
            <button
              className="text-xs font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                setUpdates(initialData);
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
          className="w-full text-3xl font-bold text-black bg-transparent outline-none"
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
            "bg-transparent text-black outline-none w-full font-medium text-base",
            "resize-none overflow-hidden border-none p-0 m-0",
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
