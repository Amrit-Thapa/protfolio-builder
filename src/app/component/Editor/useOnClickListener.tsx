import React from "react";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {eventTypes} from "./utils";
import {FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND} from "lexical";

const useOnClickListener = () => {
  const [editor] = useLexicalComposerContext();

  const onClick = (event: eventTypes) => {
    switch (event) {
      case eventTypes.formatBold:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        break;
      case eventTypes.formatItalic:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        break;
      case eventTypes.formatUnderline:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        break;
      case eventTypes.formatAlignLeft:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        break;
      default:
        break;
    }
  };
  return {onClick};
};

export default useOnClickListener;
