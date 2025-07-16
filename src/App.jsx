////////////////////////////
// All of the imports
////////////////////////////

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";
import AssistiveTechInfo from "./components/AssistiveTechInfo";
import GameOver from "./components/GameOver";
import ErrorCard from "./components/ErrorCard";
/////////////////////////////
// The beginning of our app
////////////////////////////
function App() {
  const initialFormData = {
    category: "animals-and-nature",
    number: 10,
  };
  ////////////////////////
  // Our states Variables
  ////////////////////////
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojiData, setEmojiData] = useState([]);
  const [selectedCard, setSelectedCard] = useState([]);
  const [matchCards, setMatchCards] = useState([]);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setAdvice(data.slip.advice);
    };
    getData();
  }, []);

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

  ///////////////////////////////////
  // The game starter function
  //////////////////////////////////

  async function startGame(e) {
    e.preventDefault();
    try {
      if (isError) throw new Error("I am now throwing new custom error");
      const response = await fetch(
        `https://emojihub.yurace.pro/api/all/category/${formData.category}`
      );

      if (!response.ok) {
        throw new Error("There was a problem fetching this endpoint.");
      }

      const data = await response.json();
      const dataSlice = getDataSlice(data);
      const emojisArray = await getEmojisArray(dataSlice);

      setEmojiData(emojisArray);
      setIsGameOn(true);
      setIsFirstRender(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsFirstRender(false);
    } finally {
      setIsFirstRender(false);
    }
  }
  //////////////////////////////////////////////////////////
  // Getting the data
  //////////////////////////////////////////////////////////

  function getDataSlice(data) {
    const randomIndices = getRandomIndecies(data);
    const dataSlice = randomIndices.map((index) => data[index]);
    return dataSlice;
  }
  ////////////////////////////////////////////////////
  // Pushing random number to the randomIndeciesArray
  ///////////////////////////////////////////////////
  function getRandomIndecies(data) {
    const randomIndeciesArray = [];
    for (let i = 0; i < formData.number / 2; i++) {
      const randomNum = Math.floor(Math.random() * data.length) + 1;
      if (!randomIndeciesArray.includes(randomNum)) {
        randomIndeciesArray.push(randomNum);
      } else {
        i--;
      }
    }
    console.log(formData.number);
    console.log(randomIndeciesArray);
    return randomIndeciesArray;
  }
  /////////////////////////
  // Getting the emojis
  ////////////////////////
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
  // Flipping the Cards
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
  /////////////////////////////
  // The game reseter function
  /////////////////////////////
  const resetGame = () => {
    setIsGameOn(false);
    setAreAllCardsMatched(false);

    setMatchCards([]);
    setSelectedCard([]);
    setAdvice("");
  };

  ////////////////////////
  // Rest the Error
  ///////////////////////
  function resetError() {
    setIsError(false);
  }
  /////////////////////////////////////////////
  // Handling the changes in the Form component
  /////////////////////////////////////////////
  const handleFormChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  /////////////////////////////
  // What the App renders
  ////////////////////////////
  return (
    <main>
      {areAllCardsMatched && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={1000}
          recycle={false}
        />
      )}
      <h1>Memory</h1>
      {!areAllCardsMatched && !isError && (
        <Form
          handleSubmit={startGame}
          handleChange={handleFormChange}
          isFirstRender={isFirstRender}
        />
      )}
      {isGameOn && !areAllCardsMatched && (
        <AssistiveTechInfo emojiData={emojiData} matchCards={matchCards} />
      )}
      {areAllCardsMatched && <GameOver handleClick={resetGame} />}
      {isGameOn && (
        <MemoryCard
          handleClick={turnCard}
          data={emojiData}
          selectedCard={selectedCard}
          matchCards={matchCards}
        />
      )}
      {isError && <ErrorCard handleClick={resetError} />}
      {advice ? (
        <p className="advice">{advice}</p>
      ) : (
        <p className="advice">Loding advice....</p>
      )}
    </main>
  );
}

export default App;
