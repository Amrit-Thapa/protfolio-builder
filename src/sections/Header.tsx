"use client";
import Image from "next/image";
import logo from "@/../public/assets/logo.png";
import downArrow from "@/../public/assets/icons/downArrow.png";
import exclamationMark from "@/../public/assets/icons/exclamationMark.png";
import {useAppContext} from "../context/AppContext";
import {useState} from "react";
import {Section} from "../types";
import {sectionConfig} from "../utils";
import {SectionMenu} from "../component/AddSection";

const Header = () => {
  const {section, updateSection, setActiveSection, togglePreview} =
    useAppContext();

  const [showSectionMenu, toggleSectionMenu] = useState(false);

  return (
    <header className="hidden md:block">
      <nav className="bg-black h-[55px] flex items-center justify-between px-[35px] text-white shadow-[0_6px_25px_0_#00000040]">
        <div className="flex gap-16">
          <Image src={logo} alt="logo" />
          <div className="relative">
            <span
              onClick={() => toggleSectionMenu((prev) => !prev)}
              className="mr-1"
            >
              Section
            </span>
            <Image src={downArrow} className="inline-block" alt="down arrow" />
            {!!showSectionMenu ? (
              section?.length > 1 ? (
                <SectionMenu
                  onMouseEnter={(e) => e.stopPropagation()}
                  onMouseLeave={() => toggleSectionMenu(false)}
                >
                  {section.map((item) => {
                    if (item === Section.HeroSection) return;
                    return (
                      <li
                        key={item}
                        className="cursor-pointer hover:bg-[#EFEFEF] p-1 rounded-lg"
                        onClick={() => {
                          setActiveSection(item);
                          toggleSectionMenu(false);
                        }}
                      >
                        {sectionConfig[item].title}
                      </li>
                    );
                  })}
                </SectionMenu>
              ) : (
                <SectionMenu
                  onMouseEnter={(e) => e.stopPropagation()}
                  onMouseLeave={() => toggleSectionMenu(false)}
                >
                  <Image
                    src={exclamationMark}
                    alt="exclamation"
                    height={34}
                    width={34}
                    className="mx-auto mb-3"
                  />
                  <div className="w-[201px] h-[48px] text-center mx-auto mb-3 font-semibold text-[12px]">
                    You have not added any sections, click to add new section
                  </div>
                  <div
                    className="m-auto text-center border-black border rounded-3xl py-2 w-[130px] h-[36px] text-[12px] font-semibold hover:cursor-pointer"
                    onClick={() => {
                      updateSection([Section.HeroSection]);
                      setActiveSection(Section.HeroSection);
                      toggleSectionMenu(false);
                    }}
                  >
                    Add new section
                  </div>
                </SectionMenu>
              )
            ) : undefined}
          </div>
          <div>
            <span className="mr-1">Preference</span>
            <Image src={downArrow} className="inline-block" alt="down arrow" />
          </div>
        </div>
        <div className="flex gap-16">
          <button onClick={() => togglePreview((prev) => !prev)}>
            Preview
          </button>
          <div className="font-bold bg-[#0085FF] w-[87px] h-[30px] text-center rounded-[50px] p-1">
            Publish
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
