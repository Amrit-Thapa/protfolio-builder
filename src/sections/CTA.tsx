import classNames from "classnames";
import React, {useState} from "react";
import imageIcon from "@/../public/assets/icons/imageIcon.png";
import Image from "next/image";
import plusIcon from "@/../public/assets/icons/plus.png";
import ImagePicker from "../component/ImagePicker";
import {useAppContext} from "@/context/AppContext";
// import {Section} from "@/types";
import {removeUnUpdatedItem, resizeTextArea} from "@/utils";
import useLocalStorage from "@/hooks/useLocalStorage";
import If from "@/component/If";
import {Section} from "@/context/types";
import ActionController from "@/component/ActionController";
import {Actions} from "@/context/reducer";

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
  const {state, dispatch} = useAppContext();
  const {cta, activeSection, editing} = state;
  const [ctaUpdates, setUpdates] = useState(cta);
  const isSectionActive = activeSection === Section.CTA;
  const disableEditing = !isSectionActive || (isSectionActive && !editing);

  const handleChange = (id: string, key: string, value: string) => {
    setUpdates((prev) => {
      return {
        ...prev,
        items: prev.items.map((item) =>
          item.id === id ? {...item, [key]: value} : item,
        ),
      };
    });
  };

  const handleCancelButton = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setUpdates(cta);
    dispatch({type: Actions.SET_EDITING, payload: false});
  };

  const handleSaveClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    const {items, title, description} = ctaUpdates;
    const hasUpdatedCta = removeUnUpdatedItem(items);

    setUpdates({
      title,
      description,
      items: hasUpdatedCta,
    });

    dispatch({
      type: Actions.SET_CTA,
      payload: {
        cta: {
          title,
          description,
          items: hasUpdatedCta,
        },
      },
    });
  };

  return (
    <ActionController
      enabled={isSectionActive}
      isEditing={editing}
      onCancel={handleCancelButton}
      onDelete={() =>
        dispatch({type: Actions.REMOVE_SECTION, payload: Section.CTA})
      }
      onEditing={() => dispatch({type: Actions.SET_EDITING, payload: true})}
      onMove={() => console.log}
      onSave={handleSaveClick}
    >
      <If
        condition={isSectionActive || !!(!isSectionActive && ctaUpdates.title)}
      >
        <input
          className="w-full text-2xl font-bold text-black bg-transparent outline-none md:text-3xl"
          value={ctaUpdates.title}
          disabled={disableEditing}
          placeholder="Blogs and resources"
          onChange={(e) =>
            setUpdates((prev) => {
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
          isSectionActive || !!(!isSectionActive && ctaUpdates.description)
        }
      >
        <textarea
          className={classNames(
            "bg-transparent text-black outline-none w-full font-sm md:font-medium max-w-[501px] md:text-base mt-5",
            "resize-none overflow-hidden border-none p-0 m-0 text-sm",
          )}
          value={ctaUpdates.description}
          disabled={disableEditing}
          placeholder="Add subtext here..."
          onChange={(e) =>
            setUpdates((prev) => {
              return {
                ...prev,
                description: resizeTextArea(e),
              };
            })
          }
        />
      </If>

      <div className="flex flex-wrap gap-4 mt-5">
        {ctaUpdates.items.map((cta) => {
          return (
            <div
              className="bg-white text-[#C6C6C6] rounded-2xl border w-[355px] p-10 min-h-[222px]"
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
                    disabled={disableEditing}
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
                      disabled={disableEditing}
                      className="bg-transparent outline-none font-medium text-sm text-[#0085FF]"
                      value={cta.link}
                      placeholder="Add link"
                      onChange={(e) =>
                        handleChange(cta.id, "link", e.target.value)
                      }
                    />
                  </If>

                  <If condition={!isSectionActive && !!cta.link}>
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
          <div className="rounded-2xl border p-3 w-[355px] min-h-[222px] flex items-center justify-center bg-[#EFEFEF]">
            <div
              className="cursor-pointer"
              onClick={() =>
                setUpdates((prev) => {
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
    </ActionController>
  );
};

export default CTA;
