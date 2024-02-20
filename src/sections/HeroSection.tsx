"use client";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextarea";
import classNames from "classnames";
import ImagePicker from "../component/ImagePicker";
import {useAppContext} from "../context/AppContext";
import {Section} from "../types";

const HeroSection = () => {
  const {heroSection, setHeroSection, setActiveSection, activeSection} =
    useAppContext();
  const [introTextRef] = useAutoResizeTextarea();
  const [subTextRef] = useAutoResizeTextarea();

  return (
    <section
      className="px-5 md:px-[100px]"
      onClick={() => setActiveSection(Section.HeroSection)}
    >
      <div className="mt-[50px] text-[#C5C5C5] flex gap-2 ">
        <ImagePicker
          src={heroSection.logo}
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
          className="bg-transparent text-black outline-none font-medium text-base"
          value={heroSection.title}
          placeholder="Enter site title"
          disabled={!activeSection}
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
      <div className="mt-12 md:mt-[200px] flex flex-wrap md:flex-nowrap justify-between">
        <div className="md:w-[295px] flex flex-col md:mt-0">
          <ImagePicker
            src={heroSection.profileImage}
            height={295}
            width={295}
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
        <div className="w-full item-center text-[#AAAAAA] md:w-[852px] p-3 md:p-10">
          <textarea
            ref={introTextRef}
            disabled={!activeSection}
            className={classNames(
              "bg-transparent text-black w-full font-medium md:text-7xl text-4xl outline-none",
              "resize-none overflow-hidden border-none p-0 m-0",
            )}
            value={heroSection.introText}
            placeholder="Click to add title"
            onChange={(e) =>
              setHeroSection((prev) => {
                return {
                  ...prev,
                  introText: e.target.value as string,
                };
              })
            }
          />
          <textarea
            ref={subTextRef}
            disabled={!activeSection}
            className={classNames(
              "bg-transparent text-black outline-none w-full md:max-w-[340px] font-normal text-lg",
              "resize-none overflow-hidden border-none p-0 m-0",
            )}
            value={heroSection.subText}
            placeholder="Click to add subtitle"
            onChange={(e) =>
              setHeroSection((prev) => {
                return {
                  ...prev,
                  subText: e.target.value as string,
                };
              })
            }
          />
        </div>
      </div>
      <div className="mt-10">
        <div>
          <input
            className="bg-transparent text-black outline-none font-bold w-full"
            value={heroSection.name}
            placeholder="Enter your name here"
            disabled={!activeSection}
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
            className="bg-transparent text-black outline-none mt-3 text-sm font-normal w-full"
            value={heroSection.email}
            placeholder="Enter email"
            disabled={!activeSection}
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
