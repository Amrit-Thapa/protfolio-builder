import {useAppContext} from "../context/AppContext";
import {resizeTextArea} from "@/utils";
import {Section} from "@/context/types";
import {SyntheticEvent, useState} from "react";
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

const AboutMe = () => {
  const {state, dispatch} = useAppContext();
  const {activeSection, aboutMe, editing} = state;
  const [aboutMeUpdates, setUpdates] = useState<Descendant[]>(
    aboutMe as Descendant[],
  );
  const isSectionActive = activeSection === Section.AboutMe;
  const disableEditing = !isSectionActive || (isSectionActive && !editing);

  const onCancelClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setUpdates(aboutMe);
    dispatch({type: Actions.SET_EDITING, payload: false});
  };
  const onSaveClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({type: Actions.SET_ABOUT_ME, payload: aboutMeUpdates});
  };
  const onDeleteClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // setUpdates(aboutMe);
    // dispatch({type: Actions.SET_EDITING, payload: false});
  };
  const onEditClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({type: Actions.SET_EDITING, payload: true});
  };

  return (
    <div
      onClick={(e) => {
        if (isSectionActive) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <ActionController active={isSectionActive}>
        <ActionGroup>
          {editing ? (
            <>
              <CancelButton onClick={onCancelClick} />
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
          initialText={aboutMeUpdates as Descendant[]}
          disabled={disableEditing}
          onChange={(value) => setUpdates(value)}
        />
      </ActionController>
    </div>
  );
};

export default AboutMe;
