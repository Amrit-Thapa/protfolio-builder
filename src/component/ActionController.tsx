import Drag from "@/../public/assets/icons/drag.png";
import editIcon from "@/../public/assets/icons/editIcon.png";
import bin from "@/../public/assets/icons/bin.png";
import {ComponentProps, SyntheticEvent} from "react";

type ActionButtonsProps = {
  onCancel: (e: SyntheticEvent) => void;
  onSave: (e: SyntheticEvent) => void;
  onMove: (e: SyntheticEvent) => void;
  onDelete: (e: SyntheticEvent) => void;
  onEditing: (value: boolean) => void;
  isEditing: boolean;
  enabled: boolean;
};

const ActionButtons = ({
  isEditing,
  onCancel,
  onSave,
  onMove,
  onDelete,
  onEditing,
}: ActionButtonsProps) => {
  return isEditing ? (
    <>
      <button className="text-xs font-semibold" onClick={onCancel}>
        Cancel
      </button>
      <button
        className="text-white rounded-3xl bg-[#0085FF] text-xs font-semibold px-4 py-1"
        onClick={onSave}
      >
        Save
      </button>
    </>
  ) : (
    <>
      <Buttons onClick={onMove}>
        <img src={Drag.src} />
      </Buttons>
      <div>
        <Buttons onClick={onDelete}>
          <img src={bin.src} />
        </Buttons>
        <Buttons onClick={() => onEditing?.(!isEditing)}>
          <img src={editIcon.src} />
        </Buttons>
      </div>
    </>
  );
};

const Buttons = ({children, ...props}: ComponentProps<"button">) => {
  return (
    <button className="p-2 rounded hover:bg-gray-200" {...props}>
      {children}
    </button>
  );
};

const ActionController: React.FC<
  ActionButtonsProps & ComponentProps<"div">
> = ({
  children,
  isEditing,
  onCancel,
  onSave,
  onMove,
  onDelete,
  onEditing,
  enabled,
}) => {
  return enabled ? (
    <div className="relative p-5 border border-black">
      <div className="absolute right-0 flex gap-4 -top-10 md:-top-14">
        <ActionButtons
          onCancel={onCancel}
          onSave={onSave}
          onMove={onMove}
          onDelete={onDelete}
          onEditing={onEditing}
          isEditing={isEditing}
        />
      </div>
      {children}
    </div>
  ) : (
    children
  );
};

export default ActionController;
