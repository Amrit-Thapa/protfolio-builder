import pluginsList from "../utils";
import Image from "next/image";
import useOnClickListener from "../useOnClickListener";

const ToolbarPlugin = () => {
  const {onClick} = useOnClickListener();
  return (
    <div className="flex justify-between items-center px-4 w-[237px] h-[42px] rounded-md shadow-[0_4px_25px_0_#00000040] bg-white border border-black">
      {pluginsList.map((item) => {
        return (
          <span
            key={item.id}
            className="cursor-pointer hover:bg-[#EFEFEF] p-1 rounded-md h-7 w-7"
            onClick={() => onClick(item.event)}
          >
            <Image src={item.Icon} alt={item.event} className="m-auto" />
          </span>
        );
      })}
    </div>
  );
};

export default ToolbarPlugin;
