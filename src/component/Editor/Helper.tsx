import {ComponentProps, forwardRef, useEffect, useRef} from "react";

export const Menu = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  (props, ref) => {
    const {className, children, ...otherProps} = props;

    return (
      <div {...otherProps} data-testid="menu" ref={ref} className={className}>
        {children}
      </div>
    );
  },
);

export const Button = ({children, ...props}: ComponentProps<"button">) => {
  return (
    <button {...props} className="p-2 rounded hover:bg-gray-200">
      {children}
    </button>
  );
};
