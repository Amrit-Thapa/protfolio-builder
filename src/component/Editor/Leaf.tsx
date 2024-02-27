import React from "react";
import {RenderLeafProps} from "slate-react";

export type LeafType =
  | "bold"
  | "italic"
  | "underline"
  | "hashtag"
  | "semiBold"
  | "small"
  | "smallGray";

const Leaf = ({attributes, children, leaf}: RenderLeafProps): JSX.Element => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.hashtag) {
    children = <span className="text-[#0094ff]">{children}</span>;
  }

  if (leaf.semiBold) {
    children = <span className="text-base font-semibold">{children}</span>;
  }

  if (leaf.small) {
    children = <span className="text-sm font-medium">{children}</span>;
  }

  if (leaf.smallGray) {
    children = (
      <span className="text-sm font-medium text-[#858585]">{children}</span>
    );
  }

  return <span {...attributes}>{children}</span>;
};

export default Leaf;
