import classNames from "classnames";
import React, {useEffect} from "react";
import Image from "next/image";
import plusIcon from "@/../public/assets/icons/plus.png";
import ImagePicker from "../component/ImagePicker";
import {useAppContext} from "@/context/AppContext";
import {Section} from "@/types";
import {resizeTextArea} from "@/utils";
import useLocalStorage from "@/hooks/useLocalStorage";

const initialState = {
  title: "Blogs & Resources",
  description: "",
  items: [
    {
      id: "cta_1",
      title: "",
      icon: "",
      description: "",
      link: "",
    },
  ],
};

const CTA = () => {
  const {setActiveSection, activeSection, updateSection} = useAppContext();
  const {
    updates: ctaSection,
    setUpdates: setCtaSection,
    initialData,
    storeAllData,
  } = useLocalStorage<typeof initialState>(Section.CTA, initialState);

  const handleChange = (id: string, key: string, value: string) => {
    setCtaSection((prev) => {
      return {
        ...prev,
        items: prev.items.map((item) =>
          item.id === id ? {...item, [key]: value} : item,
        ),
      };
    });
  };

  return (
    <section
      className="flex justify-end w-full mt-20"
      onClick={() => setActiveSection(undefined)}
    >
      <aside
        className={classNames("md:w-[852px] w-full md:p-10 md:min-h-[428px]", {
          "md:border border-[#828282] rounded-lg relative":
            activeSection === Section.CTA,
        })}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(Section.CTA);
        }}
      >
        {activeSection === Section.CTA && (
          <div className="absolute right-0 flex gap-4 -top-10 md:-top-14">
            <button
              className="text-xs font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                initialData
                  ? setCtaSection(initialData)
                  : updateSection((sections) => {
                      const index = sections.indexOf(Section.CTA);

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
                storeAllData(Section.CTA, ctaSection);
                setActiveSection(undefined);
              }}
            >
              Save
            </button>
          </div>
        )}
        <input
          className="w-full text-2xl md:text-3xl font-bold text-black bg-transparent outline-none"
          value={ctaSection.title}
          placeholder="Click to add title"
          onChange={(e) =>
            setCtaSection((prev) => {
              return {
                ...prev,
                title: e.target.value,
              };
            })
          }
        />
        <textarea
          className={classNames(
            "bg-transparent text-black outline-none w-full font-sm md:font-medium max-w-[501px] md:text-base mt-5",
            "resize-none overflow-hidden border-none p-0 m-0 text-sm",
          )}
          value={ctaSection.description}
          placeholder="Add subtext here..."
          onChange={(e) =>
            setCtaSection((prev) => {
              return {
                ...prev,
                description: resizeTextArea(e),
              };
            })
          }
        />
        <div className="flex flex-wrap gap-4">
          {ctaSection.items.map((cta) => {
            return (
              <div
                className="bg-white text-[#C6C6C6] rounded-2xl border w-[375px] p-10 min-h-[222px]"
                key={cta.id}
              >
                <div className="flex flex-col gap-2">
                  <ImagePicker
                    height={50}
                    width={50}
                    id={`${cta.id}_logo`}
                    className="rounded"
                    src={cta.icon}
                    onChange={(b64) =>
                      handleChange(cta.id, "logo", b64 as string)
                    }
                  />
                  <input
                    className="text-base font-medium text-black bg-transparent outline-none"
                    value={cta.title}
                    placeholder="Enter site title"
                    onChange={(e) =>
                      handleChange(cta.id, "title", e.target.value)
                    }
                  />
                  <div className="">
                    <input
                      className="bg-transparent outline-none font-medium text-sm text-[#0085FF]"
                      value={cta.link}
                      onChange={(e) =>
                        handleChange(cta.id, "link", e.target.value)
                      }
                    />
                    {activeSection === Section.CTA && cta.link && (
                      <a
                        href={cta.link}
                        target="_blank"
                        className="text-sm text-[#0085FF]"
                      >
                        <span>🔗 {cta.link}</span>
                      </a>
                    )}
                  </div>
                  <textarea
                    className={classNames(
                      "bg-transparent text-black outline-none w-full font-medium max-w-[501px] text-sm",
                      "resize-none overflow-hidden border-none p-0 m-0",
                    )}
                    value={cta.description}
                    placeholder="Add subtext here..."
                    onChange={(e) =>
                      handleChange(cta.id, "description", resizeTextArea(e))
                    }
                  />
                </div>
              </div>
            );
          })}
          {activeSection === Section.CTA && (
            <div className="rounded-2xl border p-3 w-[375px] min-h-[222px] flex items-center justify-center bg-[#EFEFEF]">
              <div
                className="cursor-pointer"
                onClick={() =>
                  setCtaSection((prev) => {
                    return {
                      ...prev,
                      items: [
                        ...prev.items,
                        {
                          id: `cta_${prev.items.length + 1}`,
                          description: "",
                          icon: "",
                          link: "",
                          title: "",
                        },
                      ],
                    };
                  })
                }
              >
                <Image src={plusIcon} alt="add" className="m-auto" />
                Add new card
              </div>
            </div>
          )}
        </div>
      </aside>
    </section>
  );
};

export default CTA;
