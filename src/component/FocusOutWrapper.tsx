import React, {useRef, useEffect, ReactNode} from "react";

type FocusOutWrapperProps = {
  children: ReactNode;
  onFocusOut: () => void;
};

const FocusOutWrapper: React.FC<FocusOutWrapperProps> = ({
  children,
  onFocusOut,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onFocusOut(); // Fire event when click is outside the wrapper
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [onFocusOut]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default FocusOutWrapper;
