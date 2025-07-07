import RegularButton from "../components/RegularButton";
import EmojiButton from "./EmojiButton";
// import { decodeEntity } from "html-entities";

const MemoryCard = ({ handleClick, data, selectedCard, matchCards }) => {
  const cardEl = data.map((emoji, index) => {
    const selectedCardEntry = selectedCard.find(
      (emoji) => emoji.index === index
    );
    const matchCardEntry = matchCards.find((emoji) => emoji.index === index);
    const cardStyle = selectedCardEntry
      ? "card-item--selected"
      : matchCardEntry
      ? "card-item--matched"
      : "";
    return (
      <li key={index} className={`card-item ${cardStyle}`}>
        <EmojiButton
          emoji={emoji}
          index={index}
          handleClick={() => handleClick(emoji.name, index)}
          selectedCardEntry={selectedCardEntry}
          matchCardEntry={matchCardEntry}
        />
      </li>
    );
  });

  return <ul className="card-container">{cardEl}</ul>;
};

export default MemoryCard;
