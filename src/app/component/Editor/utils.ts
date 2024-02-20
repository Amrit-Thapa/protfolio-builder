import orderListIcon from "../../../../public/assets/icons/orderedList.png";
import unOrderedList from "../../../../public/assets/icons/unOrderedList.png";
import underLineIcon from "../../../../public/assets/icons/underLineIcon.png";
import boldIcon from "../../../../public/assets/icons/boldIcon.png";
import italicIcon from "../../../../public/assets/icons/italicIcon.png";

export enum eventTypes {
  paragraph = "paragraph",
  h1 = "h1",
  h2 = "h2",
  ul = "ul",
  ol = "ol",
  formatCode = "formatCode",
  formatUndo = "formatUndo",
  formatRedo = "formatRedo",
  formatBold = "formatBold",
  formatItalic = "formatItalic",
  formatUnderline = "formatUnderline",
  formatStrike = "formatStrike",
  formatInsertLink = "formatInsertLink",
  formatAlignLeft = "formatAlignLeft",
  formatAlignCenter = "formatAlignCenter",
  formatAlignRight = "formatAlignRight",
  insertImage = "insertImage",
}

const pluginsList = [
  {
    id: 1,
    Icon: boldIcon,
    event: eventTypes.formatBold,
  },
  {
    id: 2,
    Icon: italicIcon,
    event: eventTypes.formatItalic,
  },
  {
    id: 3,
    Icon: underLineIcon,
    event: eventTypes.formatUnderline,
  },
  {
    id: 4,
    Icon: unOrderedList,
    event: eventTypes.ul,
  },

  {
    id: 5,
    Icon: orderListIcon,
    event: eventTypes.ol,
  },
];

export default pluginsList;
