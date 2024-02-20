import React, {
  ChangeEvent,
  ComponentProps,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import classNames from "classnames";

const SkillCard = ({id}: ComponentProps<"div">) => {
  const [introTitle, setIntroTitle] = useState("");
  const [subText, setSubTitle] = useState("Start writing...");
  const [description, setDescription] = useState("");
  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
    setter: Dispatch<SetStateAction<string>>,
  ) => {
    setter(event.target.value);
    const textareaLineHeight = 24;
    event.target.style.height = "auto";
    event.target.style.height =
      event.target.scrollHeight + textareaLineHeight + "px";
  };
  return (
    <div
      className="bg-white text-[#C6C6C6] rounded-2xl border max-w-[360px] p-10 min-h-[530px]"
      id={id}
    >
      <textarea
        rows={1}
        className={classNames(
          "bg-transparent text-black w-full font-bold text-xl outline-none",
          "resize-none overflow-hidden border-none p-0 m-0",
        )}
        value={introTitle}
        placeholder="Untitled"
        onChange={(e) => handleChange(e, setIntroTitle)}
      />
      <textarea
        className={classNames(
          "bg-transparent text-black outline-none w-full font-normal text-sm",
          "resize-none overflow-hidden border-none p-0 m-0",
        )}
        value={description}
        placeholder="Write description here..."
        onChange={(e) => handleChange(e, setDescription)}
      />
      <textarea
        className={classNames(
          "bg-transparent text-black outline-none w-full font-medium text-base",
          "resize-none overflow-hidden border-none p-0 m-0",
        )}
        value={subText}
        placeholder="Start writing"
        onChange={(e) => handleChange(e, setSubTitle)}
      />
    </div>
  );
};

export default SkillCard;
