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
  const {setActiveSection, activeSection, updateSection} = useAppContext();
  const {
    updates: contactMe,
    setUpdates: setContactMe,
    initialData,
    storeAllData,
  } = useLocalStorage<typeof initialState>(Section.ContactMe, initialState);

  return (
    <section
      className="flex justify-end w-full mt-24"
      onClick={(e) => {
        e.stopPropagation();
        setActiveSection(undefined);
      }}
    >
      <aside
        className={classNames(
          "md:w-[852px] md:p-10 md:min-h-[295px] rounded-lg",
          {
            "md:border border-[#828282] relative":
              activeSection === Section.ContactMe,
          },
        )}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(Section.ContactMe);
        }}
      >
        {activeSection === Section.ContactMe && (
          <div className="absolute right-0 flex gap-4 -top-10 md:-top-14">
            <button
              className="text-xs font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                initialData
                  ? setContactMe(initialData)
                  : updateSection((sections) => {
                      const index = sections.indexOf(Section.ContactMe);

                      return [...sections.splice(index, 1)];
                    });
                setActiveSection(undefined);
              }}
            >
              Cancel
            </button>
            <button
              className="text-white rounded-3xl bg-[#0085FF] text-xs font-semibold px-4 py-1"
              onClick={(e) => {
                e.stopPropagation();
                storeAllData(Section.ContactMe, contactMe);
                setActiveSection(undefined);
              }}
            >
              Save
            </button>
          </div>
        )}
        <textarea
          className="w-full text-2xl md:text-3xl font-bold text-black bg-transparent outline-none"
          value={contactMe.title}
          disabled={activeSection !== Section.ContactMe}
          placeholder="Click to add title"
          onChange={(e) =>
            setContactMe((prev) => {
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
          value={contactMe.description}
          disabled={activeSection !== Section.ContactMe}
          placeholder="Start writing"
          onChange={(e) =>
            setContactMe((prev) => {
              return {
                ...prev,
                description: resizeTextArea(e),
              };
            })
          }
        />
        <ImagePicker
          src={contactMe.icon}
          height={50}
          width={50}
          id="ContactMe_logo"
          onChange={(b64) =>
            setContactMe((prev) => {
              return {
                ...prev,
                icon: b64 as string,
              };
            })
          }
        />
      </aside>
    </section>
  );
};

export default ConnectMe;
