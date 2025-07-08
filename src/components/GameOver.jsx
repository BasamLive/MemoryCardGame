import { useRef, useEffect } from "react";

import RegularButton from "./RegularButton";

const GameOver = ({ handleClick }) => {
  const focusRef = useRef(null);
  useEffect(() => {
    focusRef.current.focus();
  }, []);
  return (
    <div className="wrapper wrapper--accent" ref={focusRef} tabIndex={-1}>
      <p className="p--large">You have matched all memory cards!</p>
      <RegularButton handleClick={handleClick}>Play again</RegularButton>
    </div>
  );
};

export default GameOver;
