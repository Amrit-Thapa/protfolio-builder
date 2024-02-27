import TextEditor from "@/component/Editor";
import If from "@/component/If";
import {useAppContext} from "@/context/AppContext";
import {Actions} from "@/context/reducer";
import useDeviceType from "@/hooks/useDeviceType";
import React, {useState} from "react";
import CurrentCompany from "./CurrentCompany";
import NameAndEmail from "./NameAndEmail";
import PreviousCompany from "./PreviousCompany";
import {RenderElementProps} from "slate-react";

const Intro = () => {
  const device = useDeviceType();
  const {state, dispatch} = useAppContext();
  const {intro, activeSection} = state;
  const [editingSec, setEditingSec] = useState("");
  const isSectionActive = activeSection === "Intro";

  return (
    <div className="md:mt-20 md:min-h-[330px] flex flex-col justify-center">
      <div
        onClick={() => setEditingSec("intro")}
        onBlur={() => {
          dispatch({type: Actions.SET_EDITING, payload: false});
          setEditingSec("");
        }}
      >
        <TextEditor
          initialText={JSON.parse(intro.head)}
          disabled={!isSectionActive || editingSec !== "intro"}
          placeholder={IntroPlaceHolder}
          onChange={(value) =>
            dispatch({
              type: Actions.SET_INTRO,
              payload: {...intro, head: value},
            })
          }
        />
      </div>

      <div
        onClick={() => setEditingSec("desc")}
        onBlur={() => {
          dispatch({type: Actions.SET_EDITING, payload: false});
          setEditingSec("");
        }}
      >
        <TextEditor
          initialText={JSON.parse(intro.desc)}
          disabled={!isSectionActive || editingSec !== "desc"}
          placeholder={decPlaceHolder}
          onChange={(value) =>
            dispatch({
              type: Actions.SET_INTRO,
              payload: {...intro, desc: value},
            })
          }
        />
      </div>
      <If condition={device === "phone"}>
        <div className="mt-5">
          <NameAndEmail />
        </div>
        <div className="mt-5">
          <CurrentCompany />
        </div>
      </If>
      <PreviousCompany />
    </div>
  );
};
const IntroPlaceHolder = ({children, attributes}: RenderElementProps) => (
  <div {...attributes}>
    <div className="font-medium  md:text-7xl mt-4 md:mt-0 text-4xl md:!leading-[84px] w-full">
      Click to add title
    </div>
  </div>
);
const decPlaceHolder = ({children, attributes}: RenderElementProps) => (
  <div {...attributes}>
    <div className="text-lg font-normal ">click to add subtitle</div>
  </div>
);
export default Intro;
