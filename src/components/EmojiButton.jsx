import { decodeEntity } from "html-entities";

const EmojiButton = ({
  emoji,
  handleClick,
  selectedCardEntry,
  matchCardEntry,
  index,
}) => {
  const btnAria = matchCardEntry
    ? `${decodeEntity(emoji.name)}. Matched.`
    : selectedCardEntry
    ? `${decodeEntity(emoji.name)}. Not matched yet.`
    : `Card upside down`;
  const btnContent =
    matchCardEntry || selectedCardEntry ? decodeEntity(emoji.htmlCode[0]) : "?";
  const btnStyle = selectedCardEntry
    ? "btn--emoji__back--selected"
    : matchCardEntry
    ? "btn--emoji__back--matched"
    : "btn--emoji__front";
  return (
    <button
      className={`btn btn--emoji ${btnStyle}`}
      onClick={selectedCardEntry ? null : handleClick}
      disabled={matchCardEntry}
      aria-label={`Position ${index + 1}: ${btnAria}`}
      aria-live="polite"
    >
      {/* {decodeEntity(content)}  */}
      {btnContent}
    </button>
  );
};

export default EmojiButton;
