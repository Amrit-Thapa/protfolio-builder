import React, {ComponentProps, useCallback, useState} from "react";
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
} from "slate-react";
import {withHistory, HistoryEditor} from "slate-history";
import classNames from "classnames";

export type BlockType =
  | "paragraph"
  | "heading-one"
  | "heading-two"
  | "heading-three"
  | "numbered-list"
  | "bulleted-list"
  | "paraText-one"
  | "paraText-two"
  | "paraText-three";

export type LeafType =
  | "bold"
  | "italic"
  | "underline"
  | "hashtag"
  | "semiBold"
  | "small"
  | "smallGray";

type CustomElement = {type: BlockType; children: CustomText[]};

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
  className,
}: {
  initialText: Descendant[];
  id?: string;
  onChange: ((value: Descendant[]) => void) | undefined;
  className?: string;
  disabled: boolean;
}) => {
  const [editor] = useState(() => withReact(withHistory(createEditor())));

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps): JSX.Element => <Leaf {...props} />,
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
          onChange?.(value);
          const content = JSON.stringify(value);
        }
      }}
      key={id}
    >
      <div className="relative">
        {!disabled && (
          <div className="absolute flex justify-center gap-2 p-1 bg-white rounded outline-1 left-2/4 -translate-x-2/4 outline -top-20">
            <MarkButton
              onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, "bold");
              }}
            >
              <Bold size={14} />
            </MarkButton>
            <MarkButton
              onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, "italic");
              }}
            >
              <Italic size={14} />
            </MarkButton>
            <MarkButton
              onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, "underline");
              }}
            >
              <Underline size={14} />
            </MarkButton>
            <MarkButton
              onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, "heading-one");
              }}
            >
              <Heading1 size={14} />
            </MarkButton>
            <MarkButton
              onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, "heading-two");
              }}
            >
              <Heading2 size={14} />
            </MarkButton>
            <MarkButton
              onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, "numbered-list");
              }}
            >
              <ListOrdered size={14} />
            </MarkButton>
            <MarkButton
              onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, "bulleted-list");
              }}
            >
              <List size={14} />
            </MarkButton>
          </div>
        )}
      </div>
      <Editable
        renderPlaceholder={({children, attributes}) => (
          <div {...attributes}>
            <p>{children}</p>
            <pre>
              Use the renderPlaceholder prop to customize rendering of the
              placeholder
            </pre>
          </div>
        )}
        readOnly={disabled}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        contentEditable={false}
        className={className || "outline-none rounded"}
        placeholder="Enter some rich text…"
      />
    </Slate>
  );
};

export default TextEditor;

const Element = ({attributes, children, element}: RenderElementProps) => {
  switch (element.type) {
    case "bulleted-list":
      return (
        <ul className="list-disc" {...attributes}>
          <li>{children}</li>
        </ul>
      );
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
    case "numbered-list":
      return (
        <ol className="list-decimal" {...attributes}>
          {children}
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

const MarkButton = ({children, onMouseDown}: ComponentProps<"button">) => {
  return (
    <button onMouseDown={onMouseDown} className="p-2 rounded hover:bg-gray-200">
      {children}
    </button>
  );
};

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

const isBlockActive = (editor: Editor, format: BlockType) => {
  const [match] = Editor.nodes(editor, {
    match: (n: any) => n.type === format,
  });

  return !!match;
};

const toggleBlock = (editor: Editor, format: BlockType) => {
  const isActive = isBlockActive(editor, format);

  Transforms.setNodes(
    editor,
    {type: isActive ? undefined : format},
    {match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n)},
  );
};
