"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import {resizeTextArea} from "@/utils";
import classNames from "classnames";
import ImagePicker from "../component/ImagePicker";
import {useAppContext} from "../context/AppContext";
import {Section} from "../types";

const initialState = {
  title: "AMRITTHAPA",
  logo: "",
  name: "Amrit Thapa",
  email: "amritthapa@gmail.com",
  introText: "Hey! I'm Neeraj Walia, a full stack developer.",
  subText: "Ready to bring your dream product to life in the virtual world.",
  profileImage: "",
};

const HeroSection = () => {
  const {setActiveSection, activeSection} = useAppContext();
  const [heroSection, setHeroSection] = useLocalStorage<typeof initialState>(
    Section.HeroSection,
    initialState,
  );

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
          className="text-base font-medium text-black bg-transparent outline-none"
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
                  introText: resizeTextArea(e),
                };
              })
            }
          />
          <textarea
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
            className="w-full mt-3 text-sm font-normal text-black bg-transparent outline-none"
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
