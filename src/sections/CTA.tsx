import classNames from "classnames";
import React from "react";
import imageIcon from "@/../public/assets/icons/imageIcon.png";
import Image from "next/image";
import plusIcon from "@/../public/assets/icons/plus.png";
import ImagePicker from "../component/ImagePicker";
import {useAppContext} from "@/context/AppContext";
import {Section} from "@/types";
import {resizeTextArea} from "@/utils";
import useLocalStorage from "@/hooks/useLocalStorage";
import If from "@/component/If";

const initialState = {
  title: "",
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
  const isSectionActive = activeSection === Section.CTA;

  const handleCancelButton = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (initialData) {
      setCtaSection(initialData);
    } else {
      updateSection((sections) => {
        const index = sections.indexOf(Section.CTA);
        sections.splice(index, 1);
        return [...sections];
      });
    }
    setActiveSection(undefined);
  };

  const handleSaveClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    const {items, ...details} = ctaSection;
    const hasUpdatedDetails = Object.values(details).filter((item) => !!item);
    const hasUpdatedExp = ctaSection.items.filter((exp) => {
      const values = Object.values(exp).filter((value) => value);
      return values.length > 1;
    });

    if (hasUpdatedDetails.length && hasUpdatedExp.length) {
      storeAllData(Section.CTA, {items, ...details});
    } else if (hasUpdatedDetails.length && !hasUpdatedExp.length) {
      storeAllData(Section.CTA, {...details});
    } else if (hasUpdatedExp.length && !hasUpdatedDetails.length) {
      storeAllData(Section.CTA, {items});
    } else {
      updateSection((sections) => {
        const index = sections.indexOf(Section.CTA);
        sections.splice(index, 1);
        return [...sections];
      });
      setCtaSection(initialState);
    }
    setActiveSection(undefined);
  };

  return (
    <section
      className="flex justify-end w-full mt-20"
      onClick={() => setActiveSection(undefined)}
    >
      <aside
        className={classNames("md:w-[852px] w-full md:p-10 md:min-h-[428px]", {
          "md:border border-[#828282] rounded-lg relative": isSectionActive,
        })}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(Section.CTA);
        }}
      >
        {isSectionActive && (
          <div className="absolute right-0 flex gap-4 -top-10 md:-top-14">
            <button
              className="text-xs font-semibold"
              onClick={handleCancelButton}
            >
              Cancel
            </button>
            <button
              className="text-white rounded-3xl bg-[#0085FF] text-xs font-semibold px-4 py-1"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        )}
        <If
          condition={
            isSectionActive || !!(!isSectionActive && ctaSection.title)
          }
        >
          <input
            className="w-full text-2xl font-bold text-black bg-transparent outline-none md:text-3xl"
            value={ctaSection.title}
            placeholder="Blogs and resources"
            onChange={(e) =>
              setCtaSection((prev) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              })
            }
          />
        </If>

        <If
          condition={
            isSectionActive || !!(!isSectionActive && ctaSection.description)
          }
        >
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
        </If>

        <div className="flex flex-wrap gap-4">
          {ctaSection.items.map((cta) => {
            return (
              <div
                className="bg-white text-[#C6C6C6] rounded-2xl border w-[375px] p-10 min-h-[222px]"
                key={cta.id}
              >
                <div className="flex flex-col gap-2">
                  <If
                    condition={
                      isSectionActive || !!(!isSectionActive && cta.icon)
                    }
                  >
                    <ImagePicker
                      height={50}
                      width={50}
                      id={`${cta.id}_logo`}
                      className="rounded"
                      src={cta.icon || imageIcon.src}
                      onChange={(b64) =>
                        handleChange(cta.id, "icon", b64 as string)
                      }
                    />
                  </If>

                  <If
                    condition={
                      isSectionActive || !!(!isSectionActive && cta.title)
                    }
                  >
                    <textarea
                      rows={1}
                      className={classNames(
                        "text-base font-medium text-black bg-transparent outline-none",
                        "resize-none overflow-hidden border-none p-0 mt-3",
                      )}
                      value={cta.title}
                      placeholder="Enter title here..."
                      onChange={(e) =>
                        handleChange(cta.id, "title", resizeTextArea(e))
                      }
                    />
                  </If>

                  <div>
                    <If condition={isSectionActive}>
                      <input
                        className="bg-transparent outline-none font-medium text-sm text-[#0085FF]"
                        value={cta.link}
                        placeholder="Add link"
                        onChange={(e) =>
                          handleChange(cta.id, "link", e.target.value)
                        }
                      />
                    </If>

                    <If condition={isSectionActive && !!cta.link}>
                      <a
                        href={cta.link}
                        target="_blank"
                        className="text-sm text-[#0085FF]"
                      >
                        <span>🔗 {cta.link}</span>
                      </a>
                    </If>
                  </div>
                </div>
              </div>
            );
          })}
          {isSectionActive && (
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
