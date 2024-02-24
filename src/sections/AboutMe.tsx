import classNames from "classnames";
import {useAppContext} from "../context/AppContext";
import {resizeTextArea} from "@/utils";
import If from "@/component/If";
import {Section} from "@/context/types";
import {useState} from "react";
import FocusOutWrapper from "@/component/FocusOutWrapper";

const initialState = {
  title: "",
  description: "",
};

const AboutMe = () => {
  const {state, dispatch} = useAppContext();
  const {activeSection, aboutMe} = state;
  const [updates, setUpdates] = useState(aboutMe);
  const isSectionActive = activeSection === Section.AboutMe;

  const valueUpdated = () => {
    return Object.values(updates).filter((item) => !!item).length;
  };

  const handleCancelButton = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (aboutMe) {
      setUpdates(aboutMe);
    } else {
      // TODO: REMOVE SEction about me
      // updateSection((sections) => {
      //   const index = sections.indexOf(Section.AboutMe);
      //   sections.splice(index, 1);
      //   return [...sections];
      // });
    }
    // setActiveSection(undefined);
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
  };

  return (
    <FocusOutWrapper
      onFocusOut={
        console.log
        // dispatch({type: Actions.SET_PROFILE, payload: profileUpdate})
      }
    >
      <div className="mt-10">
        {isSectionActive && (
          <div className="absolute right-0 flex gap-4 -top-10 md:-top-14">
            <button
              className="text-xs font-semibold"
              onClick={handleCancelButton}
            >
              Cancel
            </button>
            <button
              className="text-white rounded-3xl bg-[#0085FF] text-xs font-semibold px-4 py-1"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        )}
        <If
          condition={isSectionActive || !!(!isSectionActive && updates.title)}
        >
          <textarea
            rows={1}
            className="w-full text-2xl font-bold text-black bg-transparent outline-none md:text-3xl"
            value={updates.title}
            disabled={activeSection !== Section.AboutMe}
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

        <If
          condition={
            isSectionActive || !!(!isSectionActive && updates.description)
          }
        >
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
        </If>
      </div>
    </FocusOutWrapper>
  );
};

export default AboutMe;
