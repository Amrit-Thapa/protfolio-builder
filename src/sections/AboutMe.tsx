import classNames from "classnames";
import {useAppContext} from "../context/AppContext";
import {resizeTextArea} from "@/utils";
import If from "@/component/If";
import {Section} from "@/context/types";
import {useState} from "react";
import FocusOutWrapper from "@/component/FocusOutWrapper";
import ActionController from "@/component/ActionController";
import {Actions} from "@/context/reducer";

const AboutMe = () => {
  const {state, dispatch} = useAppContext();
  const {activeSection, aboutMe, editing} = state;
  const [aboutMeUpdates, setUpdates] = useState(aboutMe);
  const isSectionActive = activeSection === Section.AboutMe;
  const disableEditing = !isSectionActive || (isSectionActive && !editing);

  const handleCancelButton = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (aboutMe) {
      setUpdates(aboutMe);
      dispatch({type: Actions.SET_EDITING, payload: false});
    } else {
      dispatch({type: Actions.REMOVE_SECTION, payload: Section.AboutMe});
    }
  };

  const handleSaveClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    dispatch({type: Actions.SET_ABOUT_ME, payload: aboutMeUpdates});
  };

  return (
    <FocusOutWrapper
      onFocusOut={() => {
        return dispatch({type: Actions.SET_ACTIVE_SECTION, payload: ""});
      }}
    >
      <ActionController
        enabled={isSectionActive}
        isEditing={editing}
        onCancel={handleCancelButton}
        onDelete={() =>
          dispatch({type: Actions.REMOVE_SECTION, payload: Section.AboutMe})
        }
        onEditing={() => dispatch({type: Actions.SET_EDITING, payload: true})}
        onMove={() => console.log}
        onSave={handleSaveClick}
      >
        <div className="mt-10">
          <If
            condition={
              isSectionActive || !!(!isSectionActive && aboutMeUpdates.title)
            }
          >
            <textarea
              rows={1}
              className="w-full text-2xl font-bold text-black bg-transparent outline-none md:text-3xl"
              value={aboutMeUpdates.title}
              disabled={disableEditing}
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
              isSectionActive ||
              !!(!isSectionActive && aboutMeUpdates.description)
            }
          >
            <textarea
              className={classNames(
                "bg-transparent text-black outline-none w-full font-medium text-sm md:text-base",
                "resize-none overflow-hidden border-none p-0 mt-5",
              )}
              value={aboutMeUpdates.description}
              disabled={disableEditing}
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
      </ActionController>
    </FocusOutWrapper>
  );
};

export default AboutMe;
