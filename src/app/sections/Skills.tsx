import React, {useState} from "react";
import Image from "next/image";
import plusIcon from "@/../public/assets/icons/plus.png";
import SkillCard from "../component/SkillCard";

const Skills = () => {
  const [skillList, setSkillList] = useState(["skill_1"]);
  return (
    <section className="px-5 md:px-[100px] mt-24 flex justify-end">
      <aside className=" w-full md:w-[852px] md:min-h-[428px] border border-[#828282] rounded-lg md:p-14 flex flex-wrap gap-4">
        {skillList.map((skill) => {
          return <SkillCard key={skill} id={skill} />;
        })}
        <div className="rounded-2xl border p-3 w-[360px] min-h-[530px] flex items-center justify-center bg-[#EFEFEF]">
          <div
            className="cursor-pointer"
            onClick={() =>
              setSkillList((prev) => [...prev, `skill_${prev.length + 1}`])
            }
          >
            <Image src={plusIcon} alt="add" className="m-auto" />
            Add new card
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Skills;
