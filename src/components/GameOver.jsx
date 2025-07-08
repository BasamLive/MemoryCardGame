import RegularButton from "./RegularButton";

const GameOver = ({ handleClick }) => {
  return (
    <div className="wrapper wrapper--accent">
      <p className="p--large">You have matched all memory cards!</p>
      <RegularButton handleClick={handleClick}>Play again</RegularButton>
    </div>
  );
};

export default GameOver;
