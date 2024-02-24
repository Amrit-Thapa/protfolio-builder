import FocusOutWrapper from "@/component/FocusOutWrapper";
import {useAppContext} from "@/context/AppContext";
import {Actions} from "@/context/reducer";
import {resizeTextArea} from "@/utils";
import classNames from "classnames";
import React, {useState} from "react";

const Intro = () => {
  const {state, dispatch} = useAppContext();
  const {intro} = state;
  const [introUpdate, setIntroUpdate] = useState({
    title: "",
    description: "",
  });

  return (
    <FocusOutWrapper
      onFocusOut={() => {
        return dispatch({type: Actions.SET_INTRO, payload: introUpdate});
      }}
    >
      <div className="md:mt-20 md:min-h-[330px] flex flex-col justify-center">
        <textarea
          className={classNames(
            "bg-transparent text-black outline-none",
            "font-medium md:text-7xl mt-4 md:mt-0 text-4xl",
            "placeholder:font-normal placeholder:text-[#C6C6C6] placeholder:text-[70px]",
            "resize-none overflow-hidden w-full border-none p-0 m-0",
          )}
          rows={1}
          value={introUpdate.title}
          placeholder="Click to add title"
          onChange={(e) =>
            setIntroUpdate((prev) => {
              return {title: resizeTextArea(e), description: prev.description};
            })
          }
        />
        <textarea
          className={classNames(
            "bg-transparent text-black outline-none w-full md:max-w-[340px] ",
            "font-normal text-lg placeholder:font-medium placeholder:text-[#AAAAAA]",
            "resize-none overflow-hidden border-none p-0 mt-3",
          )}
          rows={1}
          value={introUpdate.description}
          placeholder="Click to add subtitle"
          onChange={(e) =>
            setIntroUpdate((prev) => {
              return {title: prev.title, description: resizeTextArea(e)};
            })
          }
        />
      </div>
    </FocusOutWrapper>
  );
};

export default Intro;
