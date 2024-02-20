import ImagePicker from "@/component/ImagePicker";
import {useAppContext} from "@/context/AppContext";
import {Section} from "@/types";
import {resizeTextArea} from "@/utils";
import classNames from "classnames";
import React from "react";

const ConnectMe = () => {
  const {
    contactMeSection,
    setContactMeSection,
    setActiveSection,
    activeSection,
  } = useAppContext();

  return (
    <section className="w-full mt-24 flex justify-end">
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
          className="bg-transparent text-black w-full font-bold text-3xl outline-none"
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
