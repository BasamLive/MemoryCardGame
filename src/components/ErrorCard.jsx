import { useRef, useEffect } from "react";
import RegularButton from "./RegularButton";

const ErrorCard = ({ handleClick }) => {
  const errorRef = useRef(null);

  useEffect(() => {
    errorRef.current.focus();
  }, []);
  return (
    <div
      className="wrapper wrapper--accent"
      ref={errorRef}
      aria-atomic="true"
      tabIndex={-1}
    >
      <p className="p--large">Sorry there was an error</p>
      <p className="p--regular">
        Please come back later or click the button below to try restarting the
        game
      </p>
      <RegularButton handleClick={handleClick}>Restart game</RegularButton>
    </div>
  );
};

export default ErrorCard;
