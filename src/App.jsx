import { useState, useEffect } from "react";
import Confetti from "react-confetti";

import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";
import AssistiveTechInfo from "./components/AssistiveTechInfo";

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojiData, setEmojiData] = useState([]);
  const [selectedCard, setSelectedCard] = useState([]);
  const [matchCards, setMatchCards] = useState([]);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);

  useEffect(
    () => {
      if (
        selectedCard.length === 2 &&
        selectedCard[0]["name"] === selectedCard[1]["name"]
      ) {
        setMatchCards((prevMatachCards) => [
          ...prevMatachCards,
          ...selectedCard,
        ]);
      }
    },
    [
      selectedCard,
    ] /* By adding the selected Card to the dependencies array The useEffect will run whenever the value of selectedCard changes */
  );

  useEffect(() => {
    if (emojiData.length && matchCards.length === emojiData.length) {
      setAreAllCardsMatched(true);
    }
  }, [matchCards]);

  async function startGame(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://emojihub.yurace.pro/api/all/category/animals-and-nature"
      );
      if (!response.ok) {
        throw new Error("There was problem fetching your endpoint");
      }
      const data = await response.json();
      const dataSlice = getDataSlice(data);
      const emojisArray = await getEmojisArray(dataSlice);

      setEmojiData(emojisArray);
      setIsGameOn(true);
    } catch (error) {
      console.log(error);
    }
  }
  //////////////////////////////////////////////////////////
  // the end of the start game faunction
  //////////////////////////////////////////////////////////

  function getDataSlice(data) {
    const randomIndices = getRandomIndecies(data);
    const dataSlice = randomIndices.map((index) => data[index]);
    return dataSlice;
  }

  function getRandomIndecies(data) {
    const randomIndeciesArray = [];
    for (let i = 0; i < 5; i++) {
      const randomNum = Math.floor(Math.random() * data.length) + 1;
      if (!randomIndeciesArray.includes(randomNum)) {
        randomIndeciesArray.push(randomNum);
      } else {
        i--;
      }
    }
    return randomIndeciesArray;
  }

  async function getEmojisArray(data) {
    const pairedEmojisArray = [...data, ...data];
    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pairedEmojisArray[i];
      pairedEmojisArray[i] = pairedEmojisArray[j];
      pairedEmojisArray[j] = temp;
    }
    return pairedEmojisArray;
  }

  ////////////////////////////////////////////
  // Start Game function
  ///////////////////////////////////////////

  function turnCard(name, index) {
    if (selectedCard.length < 2) {
      setSelectedCard((prevSelectedCards) => [
        ...prevSelectedCards,
        { name, index },
      ]);
    } else if (selectedCard.length === 2) {
      setSelectedCard([{ name, index }]);
    }
  }

  return (
    <main>
      {areAllCardsMatched && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <h1>Memory</h1>
      {!areAllCardsMatched && <Form handleSubmit={startGame} />}
      {isGameOn && !areAllCardsMatched && (
        <AssistiveTechInfo emojiData={emojiData} matchCards={matchCards} />
      )}
      {isGameOn && (
        <MemoryCard
          handleClick={turnCard}
          data={emojiData}
          selectedCard={selectedCard}
          matchCards={matchCards}
        />
      )}
    </main>
  );
}

export default App;
