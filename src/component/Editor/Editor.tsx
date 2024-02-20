"use client";
import {$getRoot, $getSelection} from "lexical";
import React, {useState} from "react";
import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugin/ToolBarPlugin";
import {lexicalEditorConfig} from "./config";

const Editor = ({
  placeholder,
  editable,
}: {
  placeholder?: React.ReactNode;
  editable: boolean;
}) => {
  const [editorState, setEditorState] = useState<string>();
  const [isEditing, setEditing] = useState(false);

  function onChange(editorState: any) {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();
      console.log(root, selection);
    });
  }
  console.log(editable);
  return (
    <LexicalComposer initialConfig={{...lexicalEditorConfig, editable}}>
      {isEditing && <ToolbarPlugin />}
      {/* <ToolbarPlugin /> */}
      <div className="bg-white relative rounded">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="relative p-1 rounded-lg outline-none" />
          }
          placeholder={placeholder}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
};

export default Editor;
