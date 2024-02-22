"use client";
import If from "@/component/IF";
import imageIconSm from "@/../public/assets/icons/imageIconSm.png";
import imageIcon from "@/../public/assets/icons/imageIcon.png";
import useLocalStorage from "@/hooks/useLocalStorage";
import {resizeTextArea} from "@/utils";
import classNames from "classnames";
import {useEffect} from "react";
import ImagePicker from "../component/ImagePicker";
import {useAppContext} from "../context/AppContext";
import {Section} from "../types";

const initialState = {
  title: "",
  logo: "",
  name: "",
  email: "",
  introText: "",
  subText: "",
  profileImage: "",
};

const HeroSection = () => {
  const {setActiveSection, activeSection} = useAppContext();
  const {
    updates: heroSection,
    setUpdates: setHeroSection,
    storeAllData,
  } = useLocalStorage<typeof initialState>(Section.HeroSection, initialState);

  useEffect(() => {
    storeAllData(Section.HeroSection, heroSection);
  }, [heroSection]);

  const isActive = activeSection === Section.HeroSection;
  return (
    <section
      className="px-5 md:px-[100px]"
      onClick={() => setActiveSection(Section.HeroSection)}
    >
      <div className="mt-[50px] text-[#C5C5C5] flex gap-2 ">
        <ImagePicker
          src={heroSection.logo || imageIconSm.src}
          height={25}
          width={25}
          id="company-icon"
          onChange={(b64) =>
            setHeroSection((prev) => {
              return {
                ...prev,
                logo: b64 as string,
              };
            })
          }
        />
        <input
          className="text-base font-medium text-black bg-transparent outline-none"
          value={heroSection.title}
          placeholder="Enter site title"
          onChange={(e) =>
            setHeroSection((prev) => {
              return {
                ...prev,
                title: e.target.value,
              };
            })
          }
        />
      </div>
      <div className="mt-12 md:mt-[200px] flex flex-wrap md:flex-nowrap justify-between items-start">
        <div className="md:w-[295px] flex flex-col md:mt-0 items-end justify-center">
          <ImagePicker
            src={heroSection.profileImage || imageIcon.src}
            height={295}
            width={295}
            disabled={false}
            onChange={(b64) =>
              setHeroSection((prev) => {
                return {
                  ...prev,
                  profileImage: b64 as string,
                };
              })
            }
            id="profile-icon"
            className="rounded-xl"
          />
        </div>
        <div className="w-full item-center text-[#AAAAAA] md:w-[852px] md:p-10">
          <textarea
            className={classNames(
              "bg-transparent text-black w-full font-medium md:text-7xl mt-4 md:mt-0 text-4xl outline-none",
              "resize-none overflow-hidden border-none p-0 m-0",
            )}
            rows={1}
            value={heroSection.introText}
            placeholder="Click to add title"
            onChange={(e) =>
              setHeroSection((prev) => {
                return {
                  ...prev,
                  introText: resizeTextArea(e),
                };
              })
            }
          />
          <textarea
            className={classNames(
              "bg-transparent text-black outline-none w-full md:max-w-[340px] font-normal text-lg",
              "resize-none overflow-hidden border-none p-0 mt-3",
            )}
            rows={1}
            value={heroSection.subText}
            placeholder="Click to add subtitle"
            onChange={(e) =>
              setHeroSection((prev) => {
                return {
                  ...prev,
                  subText: resizeTextArea(e),
                };
              })
            }
          />
        </div>
      </div>
      <div className="mt-10">
        <div>
          <input
            className="w-full font-bold text-black bg-transparent outline-none"
            value={heroSection.name}
            placeholder="Enter your name here"
            onChange={(e) =>
              setHeroSection((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              })
            }
          />
          <input
            className="w-full mt-3 text-sm font-normal text-black bg-transparent outline-none"
            value={heroSection.email}
            placeholder="Enter email"
            onChange={(e) =>
              setHeroSection((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              })
            }
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
