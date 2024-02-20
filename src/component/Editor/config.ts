import lexicalEditorTheme from "./theme";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {TableNode, TableCellNode, TableRowNode} from "@lexical/table";
import {ListNode, ListItemNode} from "@lexical/list";

function onError(error: any) {
  console.error(error);
}

export const lexicalEditorConfig = {
  namespace: "data editor",
  theme: lexicalEditorTheme,
  onError,

  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};
