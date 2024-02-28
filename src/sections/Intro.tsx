import TextEditor from "@/component/Editor";
import If from "@/component/If";
import {useAppContext} from "@/context/AppContext";
import {Actions} from "@/context/reducer";
import useDeviceType from "@/hooks/useDeviceType";
import React from "react";
import CurrentCompany from "./CurrentCompany";
import NameAndEmail from "./NameAndEmail";
import PreviousCompany from "./PreviousCompany";
import {RenderElementProps} from "slate-react";

const Intro = () => {
  const device = useDeviceType();
  const {state, dispatch} = useAppContext();
  const {intro, activeSection, preview, publish} = state;
  const isSectionActive = activeSection === "Intro";
  const viewOnly = publish || preview;

  return (
    <div
      className="md:mt-20 md:min-h-[330px] flex flex-col justify-center"
      onClick={() => {
        if (!viewOnly) {
          dispatch({type: Actions.SET_ACTIVE_SECTION, payload: "Intro"});
        }
      }}
    >
      <TextEditor
        initialText={JSON.parse(intro.head)}
        disabled={!isSectionActive || viewOnly}
        placeholder={IntroPlaceHolder}
        onChange={(value) =>
          dispatch({
            type: Actions.SET_INTRO,
            payload: {...intro, head: value},
          })
        }
      />

      <TextEditor
        initialText={JSON.parse(intro.desc)}
        disabled={!isSectionActive || viewOnly}
        placeholder={decPlaceHolder}
        onChange={(value) =>
          dispatch({
            type: Actions.SET_INTRO,
            payload: {...intro, desc: value},
          })
        }
      />
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
const IntroPlaceHolder = ({attributes}: RenderElementProps) => (
  <div {...attributes}>
    <div className="font-medium  md:text-7xl mt-4 md:mt-0 text-4xl md:!leading-[84px] w-full">
      Click to add title
    </div>
  </div>
);
const decPlaceHolder = ({attributes}: RenderElementProps) => (
  <div {...attributes}>
    <div className="text-lg font-normal ">click to add subtitle</div>
  </div>
);
export default Intro;
