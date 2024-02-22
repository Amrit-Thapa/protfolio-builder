import React, {PropsWithChildren} from "react";

interface ActiveProps {
  condition?: boolean;
}

const If = ({condition, children}: PropsWithChildren<ActiveProps>) => {
  return <>{!!condition && children}</>;
};

export default If;
