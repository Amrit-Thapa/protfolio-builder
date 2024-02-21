import ImagePicker from "@/component/ImagePicker";
import {useAppContext} from "@/context/AppContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import {Section} from "@/types";
import {resizeTextArea} from "@/utils";
import classNames from "classnames";
import React from "react";

const initialState = {
  title: "",
  description: "",
  icon: "",
  link: "",
};

const ConnectMe = () => {
  const {setActiveSection, activeSection} = useAppContext();
  const [contactMeSection, setContactMeSection] = useLocalStorage<
    typeof initialState
  >(Section.ContactMe, initialState);

  return (
    <section className="flex justify-end w-full mt-24">
      <aside
        className={classNames(
          "md:w-[852px] md:p-10 md:min-h-[295px] rounded-lg",
          {
            "border border-[#828282]": activeSection === Section.ContactMe,
          },
        )}
        onClick={() => setActiveSection(Section.ContactMe)}
      >
        <textarea
          className="w-full text-3xl font-bold text-black bg-transparent outline-none"
          value={contactMeSection.title}
          disabled={activeSection !== Section.AboutMe}
          placeholder="Click to add title"
          onChange={(e) =>
            setContactMeSection((prev) => {
              return {
                ...prev,
                title: resizeTextArea(e),
              };
            })
          }
        />
        <textarea
          className={classNames(
            "bg-transparent text-black outline-none w-full font-medium text-base",
            "resize-none overflow-hidden border-none p-0 m-0",
          )}
          value={contactMeSection.description}
          disabled={activeSection !== Section.AboutMe}
          placeholder="Start writing"
          onChange={(e) =>
            setContactMeSection((prev) => {
              return {
                ...prev,
                description: resizeTextArea(e),
              };
            })
          }
        />
        <ImagePicker
          src={contactMeSection.icon}
          height={50}
          width={50}
          id="ContactMe_logo"
          onChange={(b64) =>
            setContactMeSection((prev) => {
              return {
                ...prev,
                description: b64 as string,
              };
            })
          }
        />
      </aside>
    </section>
  );
};

export default ConnectMe;
