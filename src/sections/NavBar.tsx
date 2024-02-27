import ImagePicker from "@/component/ImagePicker";
import imageIcon from "@/../public/assets/icons/imageIconSm.png";
import {useAppContext} from "@/context/AppContext";
import React, {useState} from "react";
import useDeviceType from "@/hooks/useDeviceType";
import If from "@/component/If";
import {scrollToSection} from "@/utils";

const NavBar = () => {
  const device = useDeviceType();
  const {state} = useAppContext();
  const [pageIcon, setPageIcon] = useState(state.pageIcon);
  const [pageTitle, setPageTitle] = useState(state.pageTitle);

  return (
    <div className="h-[30px] mt-[50px] w-full px-5 md:px-[100px]">
      <div className="flex justify-between">
        <div className="flex items-end gap-3">
          <ImagePicker
            src={pageIcon || imageIcon.src}
            height={25}
            width={25}
            disabled={false}
            onChange={(b64) => setPageIcon(b64 as string)}
            id="page-icon"
            className="inline"
          />
          <input
            className="text-base font-medium bg-transparent outline-none"
            placeholder="Enter site title"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
          />
        </div>
        <If condition={device === "web"}>
          <div className="flex items-end gap-x-10">
            {state.section.map((item) => {
              return (
                <div
                  key={item}
                  className="px-2 text-base font-medium cursor-pointer"
                  onClick={() => scrollToSection(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </If>
      </div>
    </div>
  );
};

export default NavBar;
