"use client";
import classNames from "classnames";
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import ImagePicker from "../component/ImagePicker";

const HeroSection = () => {
  const [title, setTitle] = useState("");
  const [introTitle, setIntroTitle] = useState("");
  const [subText, setSubTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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
    <section className="px-5 md:px-[100px]">
      <div className="mt-[50px] text-[#C5C5C5] flex gap-2 ">
        <ImagePicker
          height={25}
          width={25}
          prevH={12}
          prevW={12}
          id="company-icon"
          className="rounded"
        />
        <input
          className="bg-transparent text-black outline-none font-medium text-base"
          value={title}
          placeholder="Enter site title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-12 md:mt-[200px] flex flex-wrap md:flex-nowrap gap-10 md:gap-48">
        <div className="md:w-[295px] flex flex-col md:mt-0">
          <ImagePicker
            height={295}
            width={295}
            id="profile-icon"
            className="rounded-xl"
          />
        </div>
        <div className="w-full item-center text-[#AAAAAA]">
          <textarea
            className="bg-transparent text-black w-full font-normal text-7xl outline-none"
            value={introTitle}
            placeholder="Click to add title"
            onChange={(e) => handleChange(e, setIntroTitle)}
          />
          <textarea
            className={classNames(
              "bg-transparent text-black outline-none w-full font-normal text-lg",
              "resize-none overflow-hidden border-none p-0 m-0",
            )}
            value={subText}
            placeholder="Click to add subtitle"
            onChange={(e) => handleChange(e, setSubTitle)}
          />
        </div>
      </div>
      <div className="mt-10">
        <div>
          <input
            className="bg-transparent text-black outline-none font-bold w-full"
            value={name}
            placeholder="Enter your name here"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="bg-transparent text-black outline-none mt-3 text-sm font-normal w-full"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
