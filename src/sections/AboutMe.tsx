import {useAppContext} from "../context/AppContext";
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
import {RenderElementProps} from "slate-react";
import If from "@/component/If";
import {extractTextFromJSON} from "@/utils";

const AboutMe = () => {
  const {state, dispatch} = useAppContext();
  const {activeSection, aboutMe, editing, preview, publish} = state;
  const [aboutMeUpdates, setUpdates] = useState(aboutMe);
  const isSectionActive = activeSection === Section.AboutMe;
  const enableEditing = isSectionActive && editing;
  const viewOnly = publish || preview;

  const onCancelClick = (e: SyntheticEvent) => {
    setUpdates(aboutMe);
    dispatch({type: Actions.SET_EDITING, payload: false});
  };
  const onSaveClick = (e: SyntheticEvent) => {
    dispatch({type: Actions.SET_ABOUT_ME, payload: aboutMeUpdates});
  };
  const onDeleteClick = (e: SyntheticEvent) => {
    dispatch({type: Actions.REMOVE_SECTION, payload: Section.AboutMe});
  };
  const onEditClick = (e: SyntheticEvent) => {
    dispatch({type: Actions.SET_EDITING, payload: true});
  };

  return (
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

      <If
        condition={
          enableEditing || !!extractTextFromJSON(aboutMeUpdates).length
        }
      >
        <TextEditor
          initialText={JSON.parse(aboutMeUpdates) as Descendant[]}
          disabled={!enableEditing || viewOnly}
          placeholder={AboutMePlaceHolder}
          onChange={(value) => setUpdates(value)}
        />
      </If>
    </ActionController>
  );
};

export default AboutMe;

const AboutMePlaceHolder = ({attributes}: RenderElementProps) => (
  <div {...attributes}>
    <div className="text-2xl font-bold md:text-3xl">About me</div>
    <br></br>
    <div className="text-lg font-normal">Start writing</div>
  </div>
);
