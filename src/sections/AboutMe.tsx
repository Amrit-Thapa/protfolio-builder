import classNames from "classnames";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextarea";
import {useAppContext} from "../context/AppContext";
import {Section} from "../types";

const AboutMe = () => {
  const {aboutMeSection, setAboutMeSection, setActiveSection, activeSection} =
    useAppContext();

  const [introTextRef] = useAutoResizeTextarea();
  const [subTextRef] = useAutoResizeTextarea();
  console.log(activeSection);
  return (
    <section className="w-full mt-28 md:mt-20 flex justify-end">
      <aside
        className={classNames(
          "md:w-[852px] md:min-h-[428px] rounded-lg p-3 md:p-10",
          {"border border-[#828282]": activeSection === Section.AboutMe},
        )}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(Section.AboutMe);
        }}
      >
        <textarea
          ref={introTextRef}
          className="bg-transparent text-black w-full font-bold text-3xl outline-none"
          value={aboutMeSection.title}
          disabled={activeSection !== Section.AboutMe}
          placeholder="Click to add title"
          onChange={(e) =>
            setAboutMeSection((prev) => {
              return {
                ...prev,
                title: e.target.value,
              };
            })
          }
        />
        <textarea
          ref={subTextRef}
          className={classNames(
            "bg-transparent text-black outline-none w-full font-medium text-base",
            "resize-none overflow-hidden border-none p-0 m-0",
          )}
          value={aboutMeSection.description}
          disabled={activeSection !== Section.AboutMe}
          placeholder="Start writing"
          onChange={(e) =>
            setAboutMeSection((prev) => {
              return {
                ...prev,
                description: e.target.value,
              };
            })
          }
        />
      </aside>
    </section>
  );
};

export default AboutMe;
