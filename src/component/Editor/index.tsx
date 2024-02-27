import React, {useCallback, useEffect, useRef, useState} from "react";
import {
  Bold,
  Italic,
  Underline,
  ListOrdered,
  List,
  Heading1,
  Heading2,
} from "lucide-react";
import {
  BaseEditor,
  Editor,
  Descendant,
  createEditor,
  Transforms,
  Element as SlateElement,
} from "slate";
import {
  ReactEditor,
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
  useFocused,
} from "slate-react";
import {withHistory, HistoryEditor} from "slate-history";
import Element, {ElementType} from "./Element";
import Leaf, {LeafType} from "./Leaf";
import {Button, Menu} from "./Helper";

type CustomElement = {type: ElementType; children: CustomText[]};

type CustomText = {
  text: string;
} & {[K in LeafType]: boolean};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const TextEditor = ({
  initialText,
  id,
  onChange,
  disabled,
  placeholder,
  className,
}: {
  initialText: Descendant[];
  id?: string;
  onChange: ((value: string) => void) | undefined;
  className?: string;
  placeholder?: any;
  disabled: boolean;
}) => {
  const [editor] = useState(() => withReact(withHistory(createEditor())));

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  );

  return (
    <Slate
      editor={editor as ReactEditor}
      initialValue={initialText}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op: any) => "set_selection" !== op.type,
        );
        if (isAstChange) {
          onChange?.(JSON.stringify(value));
        }
      }}
      key={id}
    >
      <HoverToolBar editor={editor} />
      <Editable
        readOnly={disabled}
        renderElement={renderElement}
        renderPlaceholder={placeholder}
        renderLeaf={renderLeaf}
        contentEditable={false}
        className={className || "outline-none rounded"}
        placeholder="Click here to edit"
      />
    </Slate>
  );
};

export default TextEditor;

const isMarkActive = (editor: Editor, format: LeafType) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, format: LeafType) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: Editor, format: ElementType) => {
  const [match] = Editor.nodes(editor, {
    match: (n: any) => n.type === format,
  });

  return !!match;
};

const toggleBlock = (editor: Editor, format: ElementType) => {
  const isActive = isBlockActive(editor, format);

  Transforms.setNodes(
    editor,
    {type: isActive ? undefined : format},
    {match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n)},
  );
};

const HoverToolBar = ({editor}: {editor: Editor}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inFocus = useFocused();

  useEffect(() => {
    const element = ref.current;
    const {selection} = editor;

    if (element) {
      if (!selection || !inFocus || Editor.string(editor, selection) === "") {
        element.removeAttribute("style");
        return;
      }

      element.style.display = "block";
    }
  });

  return (
    <div className="relative">
      <Menu
        ref={ref}
        className="p-1 w-fit absolute -top-14 left-0 hidden mb-2 bg-white border border-black rounded"
      >
        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, "bold");
          }}
        >
          <Bold size={14} />
        </Button>
        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, "italic");
          }}
        >
          <Italic size={14} />
        </Button>
        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, "underline");
          }}
        >
          <Underline size={14} />
        </Button>
        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, "heading-one");
          }}
        >
          <Heading1 size={14} />
        </Button>
        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, "heading-two");
          }}
        >
          <Heading2 size={14} />
        </Button>
        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, "numbered-list");
          }}
        >
          <ListOrdered size={14} />
        </Button>
        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, "bulleted-list");
          }}
        >
          <List size={14} />
        </Button>
      </Menu>
    </div>
  );
};
