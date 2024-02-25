import {useAppContext} from "@/context/AppContext";
import React from "react";

const CurrentCompany = () => {
  const {state} = useAppContext();
  const {experience} = state;
  return (
    <div>
      {experience.items.length && experience.items?.[0] && (
        <div className="mt-5 font-medium">
          <div className="text-[#828282] text-sm">Currently</div>
          <div className="flex items-center gap-4 mt-2">
            {<img src={experience.items[0].logo} height={35} />}
            {
              <div className="text-base font-semibold">
                {experience.items[0].designation}, {experience.items[0].name}
              </div>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentCompany;
