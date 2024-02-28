import React, {useState} from "react";
import imageIcon from "@/../public/assets/icons/imageIcon.png";
import ImagePicker from "../component/ImagePicker";
import {useAppContext} from "@/context/AppContext";
import If from "@/component/If";
import {Section} from "@/context/types";
import ActionController, {
  ActionGroup,
  DeleteButton,
  EditButton,
  SaveButton,
} from "@/component/ActionController";
import {Actions} from "@/context/reducer";
import TextEditor from "@/component/Editor";
import {RenderElementProps} from "slate-react";
import {removeUnUpdatedItem} from "@/utils";
import {Plus} from "lucide-react";

const CTA = () => {
  const {state, dispatch} = useAppContext();
  const {cta, activeSection, editing} = state;
  const [ctaUpdates, setUpdates] = useState(cta);
  const isSectionActive = activeSection === Section.CTA;
  const enableEditing = isSectionActive && editing;

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

  const handleSaveClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    dispatch({
      type: Actions.SET_CTA,
      payload: {
        cta: ctaUpdates,
      },
    });
  };

  const onDeleteClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({type: Actions.REMOVE_SECTION, payload: Section.CTA});
  };

  const onEditClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({type: Actions.SET_EDITING, payload: true});
  };

  return (
    <ActionController active={isSectionActive}>
      <ActionGroup>
        {editing ? (
          <>
            <SaveButton onClick={handleSaveClick} />
          </>
        ) : (
          <>
            <DeleteButton onClick={onDeleteClick} />
            <EditButton onClick={onEditClick} />
          </>
        )}
      </ActionGroup>

      <TextEditor
        initialText={JSON.parse(ctaUpdates.head)}
        disabled={!enableEditing}
        onChange={(value) =>
          setUpdates((prev) => {
            return {...prev, head: value};
          })
        }
      />

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
                  <div
                    onClick={(e) => {
                      if (!enableEditing) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
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
                  </div>
                </If>

                <div className="mt-5 text-black">
                  <TextEditor
                    initialText={JSON.parse(cta.description)}
                    disabled={!enableEditing}
                    placeholder={CtaPlaceHolder}
                    onChange={(value) =>
                      handleChange(cta.id, "description", value)
                    }
                  />
                </div>

                <div>
                  <If condition={isSectionActive}>
                    <input
                      disabled={!enableEditing}
                      className="bg-transparent outline-none font-medium text-sm text-[#0085FF]"
                      value={cta.link}
                      placeholder="Add link title here"
                      onBlur={() => {
                        if (!cta.link) return;
                        const url = prompt("Enter link Url");
                        if (url) {
                          handleChange(cta.id, "linkUrl", url);
                        }
                      }}
                      onChange={(e) =>
                        handleChange(cta.id, "link", e.target.value)
                      }
                    />
                  </If>

                  <If condition={!isSectionActive && !!cta.linkUrl}>
                    <a href={cta.linkUrl} target="_blank" className="text-sm">
                      <span>{cta.link}</span>
                    </a>
                  </If>
                </div>
              </div>
            </div>
          );
        })}
        {enableEditing && (
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
                        title: "",
                        icon: "",
                        link: "",
                        linkUrl: "",
                        description:
                          '[{"type":"","children":[{"text":"Add description..."}]}]',
                      },
                    ],
                  };
                })
              }
            >
              <Plus className="m-auto" />
              Add new card
            </div>
          </div>
        )}
      </div>
    </ActionController>
  );
};

export default CTA;

const CtaPlaceHolder = ({attributes}: RenderElementProps) => (
  <div {...attributes}>
    <div className="text-sm font-normal">Write description here...</div>
  </div>
);
