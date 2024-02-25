import {useAppContext} from "@/context/AppContext";
import React from "react";

const PreviousCompany = () => {
  const {state} = useAppContext();
  const {experience} = state;
  return (
    <div>
      {experience.items?.length > 1 && (
        <div className="mt-10 md:my-24 ">
          <div className="text-[#828282] text-sm md:text-right">Previously</div>
          <div className="md:flex md:justify-end">
            {experience.items.map((item, index) => {
              if (index === 0) return;
              return (
                <div className="mt-2" key={item.id}>
                  {<img src={experience.items[index].logo} height={35} />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviousCompany;
