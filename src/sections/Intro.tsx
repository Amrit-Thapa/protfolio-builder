import TextEditor, {BlockType} from "@/component/Editor";
import If from "@/component/If";
import {useAppContext} from "@/context/AppContext";
import {Actions} from "@/context/reducer";
import useDeviceType from "@/hooks/useDeviceType";
import React, {useState} from "react";
import CurrentCompany from "./CurrentCompany";
import NameAndEmail from "./NameAndEmail";
import PreviousCompany from "./PreviousCompany";

const Intro = () => {
  const device = useDeviceType();
  const {state, dispatch} = useAppContext();
  const {intro, activeSection} = state;
  const [introUpdate, setIntroUpdate] = useState(intro);
  const isSectionActive = activeSection === "Intro";

  const introText = [
    {
      type: "heading-one" as BlockType,
      children: [{text: introUpdate.title}],
    },
    {
      type: "paraText-one" as BlockType,
      children: [
        {text: introUpdate.description, something: "w-full md:max-w-[340px]"},
      ],
    },
  ];

  return (
    <div
      className="md:mt-20 md:min-h-[330px] flex flex-col justify-center"
      onClick={() =>
        dispatch({type: Actions.SET_ACTIVE_SECTION, payload: "Intro"})
      }
    >
      <TextEditor
        initialText={introText}
        disabled={!isSectionActive}
        onChange={(value) => console.log(value)}
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

export default Intro;
