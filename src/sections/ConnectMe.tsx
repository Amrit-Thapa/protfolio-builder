import ImagePicker from "@/component/ImagePicker";
import imageIcon from "@/../public/assets/icons/imageIcon.png";
import {useAppContext} from "@/context/AppContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import {Section} from "@/types";
import {resizeTextArea} from "@/utils";
import classNames from "classnames";
import React from "react";

const initialState = {
  title: "",
  description: "",
  icon: imageIcon.src,
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
          rows={1}
          className="w-full text-2xl font-bold text-black bg-transparent outline-none md:text-3xl"
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
            "bg-transparent text-black outline-none w-full md:w-[511px] font-medium text-base",
            "resize-none overflow-hidden border-none p-0 mt-3",
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
        <div className="flex items-center gap-3 mt-5">
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
          <input
            className="bg-transparent outline-none font-medium text-sm text-[#0085FF]"
            value={contactMe.link}
            placeholder="Add link"
            onChange={(e) =>
              setContactMe((prev) => {
                return {
                  ...prev,
                  link: e.target.value,
                };
              })
            }
          />
        </div>
      </aside>
    </section>
  );
};

export default ConnectMe;
