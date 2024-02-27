import React, {ComponentProps} from "react";

const MainContainer = ({children}: ComponentProps<"div">) => {
  return (
    <div className="flex flex-wrap items-start justify-between px-5 md:flex-nowrap md:px-[100px]">
      {children}
    </div>
  );
};

export default MainContainer;

export const StickyLeftContainer = ({children}: ComponentProps<"div">) => {
  return <div className="md:sticky md:top-20 w-[295px]">{children}</div>;
};

export const RightContainer = ({children}: ComponentProps<"div">) => {
  return <div className="md:w-[852px] w-full md:p-10">{children}</div>;
};

export const SectionContainer = ({
  children,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div className="mt-10 md:mt-20" {...props}>
      {children}
    </div>
  );
};
