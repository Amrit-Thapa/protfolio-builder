import React, {ComponentProps, useState} from "react";
import Image from "next/image";
import addSectionIcon from "@/../public/assets/icons/addSection.png";
import plusIcon from "@/../public/assets/icons/plus.png";
import {sectionConfig} from "@/utils";
import {useAppContext} from "@/context/AppContext";
// import {Section} from "@/types";
import classNames from "classnames";
import {Section} from "@/context/types";
import {Actions} from "@/context/reducer";

export const SectionMenu = ({children, ...props}: ComponentProps<"div">) => {
  return (
    <div
      className={classNames(
        "w-[239px] m-h-[225px] absolute rounded-xl top-11 left-2/4 -translate-x-2/4",
        "shadow-[0_6px_50px_0_#00000026] p-5 bg-white text-black border list-none z-10",
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const AddSection = () => {
  const {state, dispatch} = useAppContext();
  const {section, editing, preview, publish} = state;

  const [showSectionMenu, toggleSectionMenu] = useState(false);
  return (
    <section
      className={classNames("px-5 md:px-[100px] mt-14 min-h-[300px] w-full", {
        relative: showSectionMenu,
      })}
    >
      {section.length < 6 && !editing && !preview && (
        <div
          className="border-dashed border border-black rounded-xl flex justify-center items-center bg-[#EFEFEF] h-16 hover:cursor-pointer"
          onClick={() => toggleSectionMenu((prev) => !prev)}
        >
          <Image
            src={addSectionIcon}
            alt="Placeholder"
            className="inline rounded"
          />
        </div>
      )}
      {showSectionMenu && (
        <SectionMenu
          onMouseEnter={(e) => e.stopPropagation()}
          onMouseLeave={() => toggleSectionMenu(false)}
        >
          {Object.keys(sectionConfig).map((item) => {
            if (section.includes(item as Section)) return;
            return (
              <li
                key={item}
                className="cursor-pointer group hover:bg-[#EFEFEF] p-1 rounded-lg"
                onClick={() => {
                  dispatch({
                    type: Actions.SET_SECTION,
                    payload: item,
                  });
                  toggleSectionMenu(false);
                }}
              >
                <span className="group-hover:bg-white px-1 py-0.2 rounded-full mr-2">
                  <Image src={plusIcon} alt="add" className="inline" />
                </span>
                {sectionConfig[item as Section].title}
              </li>
            );
          })}
        </SectionMenu>
      )}
    </section>
  );
};
export default AddSection;
