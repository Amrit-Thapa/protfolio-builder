import ImagePicker from "@/component/ImagePicker";
import imageIcon from "@/../public/assets/icons/imageIcon.png";
import {useAppContext} from "@/context/AppContext";
import React, {SyntheticEvent, useState} from "react";
import If from "@/component/If";
import {Section} from "@/context/types";
import {Actions} from "@/context/reducer";
import ActionController, {
  ActionGroup,
  DeleteButton,
  EditButton,
  SaveButton,
} from "@/component/ActionController";
import TextEditor from "@/component/Editor";

const ConnectMe = () => {
  const {state, dispatch} = useAppContext();
  const {connect, activeSection, editing} = state;
  const [contactUpdates, setUpdates] = useState(connect);
  const isSectionActive = activeSection === Section.ContactMe;
  const disableEditing = !isSectionActive || (isSectionActive && !editing);

  const onSaveClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch({type: Actions.SET_CONNECT_ME, payload: contactUpdates});
  };

  const onDeleteClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch({type: Actions.REMOVE_SECTION, payload: Section.ContactMe});
  };

  const onEditClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch({type: Actions.SET_EDITING, payload: true});
  };

  return (
    <ActionController active={isSectionActive}>
      <ActionGroup>
        {editing ? (
          <>
            <SaveButton onClick={onSaveClick} />
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
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <TextEditor
          initialText={JSON.parse(contactUpdates.head)}
          disabled={disableEditing}
          onChange={(value) =>
            setUpdates((prev) => {
              return {...prev, head: value.text};
            })
          }
        />
      </div>

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
