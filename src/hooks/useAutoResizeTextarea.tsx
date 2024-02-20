import React, {useEffect, useRef} from "react";

type UseAutoResizeTextareaReturnType = [React.RefObject<HTMLTextAreaElement>];

const useAutoResizeTextarea = (): UseAutoResizeTextareaReturnType => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleInput = () => {
      if (textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    if (textareaRef.current) {
      textareaRef.current.addEventListener("input", handleInput);
      return () => {
        if (textareaRef.current) {
          textareaRef.current.removeEventListener("input", handleInput);
        }
      };
    }
  }, []);

  return [textareaRef];
};

export default useAutoResizeTextarea;
