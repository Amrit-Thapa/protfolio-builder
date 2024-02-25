import ImagePicker from "@/component/ImagePicker";
import imageIcon from "@/../public/assets/icons/imageIcon.png";
import {useAppContext} from "@/context/AppContext";
import useLocalStorage from "@/hooks/useLocalStorage";
// import {Section} from "@/types";
import {resizeTextArea} from "@/utils";
import classNames from "classnames";
import React, {useState} from "react";
import If from "@/component/If";
import {Section} from "@/context/types";
import {Actions} from "@/context/reducer";
import ActionController from "@/component/ActionController";

const initialState = {
  title: "",
  description: "",
  icon: "",
  link: "",
};

const ConnectMe = () => {
  const {state, dispatch} = useAppContext();
  const {connect, activeSection, editing} = state;
  const [contactUpdates, setUpdates] = useState(connect);
  const isSectionActive = activeSection === Section.ContactMe;
  const disableEditing = !isSectionActive || (isSectionActive && !editing);

  const handleCancelButton = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setUpdates(connect);
    dispatch({type: Actions.SET_EDITING, payload: false});
  };

  const handleSaveClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    dispatch({type: Actions.SET_CONNECT_ME, payload: contactUpdates});
  };

  return (
    <ActionController
      enabled={isSectionActive}
      isEditing={editing}
      onCancel={handleCancelButton}
      onDelete={() =>
        dispatch({type: Actions.REMOVE_SECTION, payload: Section.ContactMe})
      }
      onEditing={() => dispatch({type: Actions.SET_EDITING, payload: true})}
      onMove={() => console.log}
      onSave={handleSaveClick}
    >
      <If
        condition={
          isSectionActive || !!(!isSectionActive && contactUpdates.title)
        }
      >
        <textarea
          rows={1}
          className="w-full text-2xl font-bold text-black bg-transparent outline-none md:text-3xl"
          value={contactUpdates.title}
          disabled={disableEditing}
          placeholder="Lets Connect!"
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
          isSectionActive || !!(!isSectionActive && contactUpdates.description)
        }
      >
        <textarea
          className={classNames(
            "bg-transparent text-black outline-none w-full md:w-[511px] font-medium text-base",
            "resize-none overflow-hidden border-none p-0 mt-3",
          )}
          value={contactUpdates.description}
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

      <div className="flex items-center gap-3 mt-5">
        <If
          condition={
            isSectionActive || !!(!isSectionActive && contactUpdates.icon)
          }
        >
          <ImagePicker
            src={contactUpdates.icon || imageIcon.src}
            height={50}
            width={50}
            id="ContactMe_logo"
            onChange={(b64) =>
              setUpdates((prev) => {
                return {
                  ...prev,
                  icon: b64 as string,
                };
              })
            }
          />
        </If>

        <If
          condition={
            isSectionActive || !!(!isSectionActive && contactUpdates.link)
          }
        >
          <input
            className="bg-transparent outline-none font-medium text-sm text-[#0085FF]"
            value={contactUpdates.link}
            placeholder="Add link"
            disabled={disableEditing}
            onChange={(e) =>
              setUpdates((prev) => {
                return {
                  ...prev,
                  link: e.target.value,
                };
              })
            }
          />
        </If>
      </div>
    </ActionController>
  );
};

export default ConnectMe;
