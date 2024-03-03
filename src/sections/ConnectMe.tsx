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
import {ExternalLink} from "lucide-react";
import {RenderElementProps} from "slate-react";

const ConnectMe = () => {
  const {state, dispatch} = useAppContext();
  const {connect, activeSection, editing, preview, publish} = state;
  const [contactUpdates, setUpdates] = useState(connect);
  const isSectionActive = activeSection === Section.ContactMe;
  const enableEditing = isSectionActive && editing;
  const viewOnly = preview || publish;

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
      <TextEditor
        initialText={JSON.parse(contactUpdates.head)}
        disabled={!enableEditing || viewOnly}
        placeholder={ContactMePlaceHolder}
        onChange={(value) =>
          setUpdates((prev) => {
            return {...prev, head: value};
          })
        }
      />

      <div className="flex items-center gap-3 mt-5">
        <If condition={enableEditing || !!contactUpdates.icon}>
          <div
            onClick={(e) => {
              if (!enableEditing || viewOnly) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
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
          </div>
        </If>

        <If condition={enableEditing}>
          <input
            className="bg-transparent outline-none font-medium text-sm text-[#0085FF]"
            value={contactUpdates.link}
            placeholder="Add link"
            disabled={!enableEditing || viewOnly}
            onBlur={() => {
              if (!contactUpdates.link) return;
              const url = prompt("Enter link Url");
              if (url) {
                setUpdates((prev) => {
                  return {
                    ...prev,
                    linkUrl: url,
                  };
                });
              }
            }}
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
        <If condition={!!contactUpdates.linkUrl && !enableEditing}>
          <span>{contactUpdates?.link}</span>
          <a href={contactUpdates.linkUrl} target="_blank">
            <ExternalLink size={13} />
          </a>
        </If>
      </div>
    </ActionController>
  );
};

export default ConnectMe;

const ContactMePlaceHolder = ({attributes}: RenderElementProps) => (
  <div {...attributes}>
    <div className="text-2xl font-bold md:text-3xl">Lets connect!</div>
    <br></br>
    <div className="text-lg font-normal">Start writing</div>
  </div>
);
