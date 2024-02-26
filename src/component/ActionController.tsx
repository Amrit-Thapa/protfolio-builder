import editIcon from "@/../public/assets/icons/editIcon.png";
import bin from "@/../public/assets/icons/bin.png";
import {ComponentProps} from "react";
import classNames from "classnames";

export const DeleteButton = ({...props}: ComponentProps<"button">) => {
  return (
    <button className="p-2 rounded hover:bg-gray-200" {...props}>
      <img src={bin.src} />
    </button>
  );
};

export const EditButton = ({...props}: ComponentProps<"button">) => {
  return (
    <button className="p-2 rounded hover:bg-gray-200" {...props}>
      <img src={editIcon.src} />
    </button>
  );
};

export const SaveButton = ({...props}: ComponentProps<"button">) => {
  return (
    <button
      className="text-white rounded-3xl bg-[#0085FF] text-xs font-semibold px-4 py-1 p-2"
      {...props}
    >
      Save
    </button>
  );
};
export const CancelButton = ({...props}: ComponentProps<"button">) => {
  return (
    <button className="text-xs font-semibold" {...props}>
      Cancel
    </button>
  );
};

const Button = ({children, ...props}: ComponentProps<"button">) => {
  return (
    <button className="p-2 rounded hover:bg-gray-200" {...props}>
      {children}
    </button>
  );
};
export const ActionGroup = ({
  children,
  isChildren,
  ...props
}: ComponentProps<"div"> & {isChildren?: boolean}) => {
  return (
    <div
      className={classNames("absolute right-0 flex gap-4 -top-10 md:-top-14", {
        "md:-top-10": !!isChildren,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
const ActionController = ({
  children,
  active,
}: ComponentProps<"div"> & {active?: boolean}) => {
  return (
    <div
      className={classNames({
        "relative p-5 mt-20 border-black md:border md:rounded-xl": active,
      })}
    >
      {children}
    </div>
  );
};

export default ActionController;
