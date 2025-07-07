const AssistiveTechInfo = ({ emojiData, matchCards }) => {
  return (
    <section className="sr-only">
      <h2>Game Status</h2>
      <p>Number matched pair: {matchCards.length / 2}</p>
      <p>
        Number of cards left to match: {emojiData.length - matchCards.length}{" "}
      </p>
    </section>
  );
};

export default AssistiveTechInfo;
