import classNames from "classnames";
import React from "react";
import {RenderElementProps} from "slate-react";

export type ElementType =
  | "paragraph"
  | "heading-one"
  | "heading-two"
  | "heading-three"
  | "numbered-list"
  | "bulleted-list"
  | "paraText-one"
  | "paraText-two"
  | "paraText-three";

const Element = ({attributes, children, element}: RenderElementProps) => {
  switch (element.type) {
    case "heading-one":
      return (
        <h1
          className="font-medium  md:text-7xl mt-4 md:mt-0 text-4xl md:!leading-[84px]"
          {...attributes}
        >
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 className="text-2xl font-bold md:text-3xl" {...attributes}>
          {children}
        </h2>
      );

    case "heading-three":
      return (
        <h2 className="text-xl font-bold" {...attributes}>
          {children}
        </h2>
      );

    case "paraText-one":
      return (
        <h2
          className={classNames(
            "text-lg font-normal text-black",
            "w-full md:max-w-[340px]",
          )}
          {...attributes}
        >
          {children}
        </h2>
      );
    case "paraText-two":
      return (
        <h2
          className={classNames("font-medium text-base text-black")}
          {...attributes}
        >
          {children}
        </h2>
      );
    case "bulleted-list":
      return (
        <ul className="list-disc" {...attributes}>
          <li>{children}</li>
        </ul>
      );
    case "numbered-list":
      return (
        <ol
          className="list-decimal text-sm font-medium md:text-base"
          {...attributes}
        >
          <li>{children}</li>
        </ol>
      );
    default:
      return (
        <p className="text-sm font-medium md:text-base" {...attributes}>
          {children}
        </p>
      );
  }
};

export default Element;
