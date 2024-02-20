import classNames from "classnames";
import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
const para = `I'm your go-to Full Stack Developer, ready to bring your dream product to life in the virtual world. From crafting sleek websites for small and medium-sized businesses to empowering you by building your dream tech product, I've got the skills and expertise to make it happen.

With a mastery of JavaScript, React.js, Node.js, express.js, CSS and Next.js, I can help ensure your online presence stands out from the crowd. I am skilled in creating user-friendly interfaces, building RESTful APIs, and seamlessly integrating external services. Besides, I am a technical lead/project manager, who prefers to meticulously oversee every aspect of a project, from conception to completion, leaving no room for mediocrity.

Your dream + my expertise = scalable, performant, reliable, and intuitive products. Let's build something extraordinary!

Beyond the code, I step into the shoes of a technical lead and project manager, where I bring a meticulous approach to overseeing every stage of a project. My commitment to excellence leaves no room for mediocrity, ensuring that each endeavor I embark upon is a success.

In the collaborative realm, I thrive. Whether it's solving intricate technical challenges or leading a team towards a shared goal, I believe that extraordinary results are born out of effective collaboration.`;
const AboutMe = () => {
  const [introTitle, setIntroTitle] = useState("About Me");
  const [subText, setSubTitle] = useState(para);
  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
    setter: Dispatch<SetStateAction<string>>,
  ) => {
    setter(event.target.value);
    const textareaLineHeight = 24;
    event.target.style.height = "auto";
    event.target.style.height =
      event.target.scrollHeight + textareaLineHeight + "px";
  };
  return (
    <section className="px-5 md:px-[100px] mt-28 md:mt-20 flex justify-end">
      <aside className="md:w-[800px] md:min-h-[428px] border border-[#828282] rounded-lg p-3 md:p-10">
        <textarea
          className="bg-transparent text-black w-full font-bold text-3xl outline-none"
          value={introTitle}
          placeholder="Click to add title"
          onChange={(e) => handleChange(e, setIntroTitle)}
        />
        <textarea
          className={classNames(
            "bg-transparent text-black outline-none w-full font-medium text-base",
            "resize-none overflow-hidden border-none p-0 m-0",
          )}
          value={subText}
          placeholder="Start writing"
          onChange={(e) => handleChange(e, setSubTitle)}
        />
      </aside>
    </section>
  );
};

export default AboutMe;
