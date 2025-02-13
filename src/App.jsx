import "./App.css";
import { languages } from "./languages";
import { useState } from "react";
import clsx from "clsx";
import { getFarewellText, randomWordGenerator } from "./utils";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
function App() {
  // State to hold the current word to guess
  const [currentWord, setCurrentWord] = useState(randomWordGenerator());

  // State to hold the user's guesses
  const [userGuess, setUserGuess] = useState([]);

  const wrongGuessCount = userGuess.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => userGuess.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = userGuess[userGuess.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
  function resetButton() {
    setCurrentWord(randomWordGenerator());
    setUserGuess([]);
  }
  function updateUserGuess(alphabet) {
    setUserGuess((prevArr) =>
      prevArr.includes(alphabet) ? prevArr : [...prevArr, alphabet]
    );
  }

  // Alphabet string
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Generate keyboard buttons from the alphabet
  const keyboard = alphabet.split("").map((alphabet) => {
    const isGuessed = userGuess.includes(alphabet);
    const isCorrect = isGuessed && currentWord.includes(alphabet);
    const isWrong = isGuessed && !currentWord.includes(alphabet);

    const btnClass = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });
    return (
      <button
        className={btnClass}
        key={alphabet}
        onClick={() => {
          updateUserGuess(alphabet);
        }}
        disabled={isGameOver}
      >
        {alphabet.toUpperCase()}
      </button>
    );
  });

  // Generate the current word display
  const currentWordArr = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || userGuess.includes(letter);
    const letterClassName = clsx(
      isGameLost && !userGuess.includes(letter) && "missed-letter"
    );
    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  // Generate language chips from the languages array
  const languageChips = languages.map((lang, i) => {
    const langClass = clsx("language-btn", {
      dead: i < wrongGuessCount,
    });
    return (
      <span
        key={lang.name}
        style={{ backgroundColor: lang.backgroundColor, color: lang.color }}
        className={langClass}
      >
        {lang.name}
      </span>
    );
  });

  const statusClass = clsx("status playing", {
    won: isGameWon,
    lost: isGameLost,
  });
  const { width, height } = useWindowSize();
  return (
    <>
      <main>
        <header>
          <h1>Assembly: Endgame</h1>
          <p>
            Guess the word in under 8 attempts to keep the programming world
            safe from Assembly!
          </p>
        </header>
        <button className={statusClass}>
          {isGameWon ? (
            <>
              <ReactConfetti
                width={width}
                height={height}
                numberOfPieces={1000}
                recycle={false}
              />
              <h2>You win!</h2>
              <p>Well Done</p>
            </>
          ) : isGameOver ? (
            <>
              <h2>Game over!</h2>
              <p>You lose! Better start learning Assembly : &#41;</p>
            </>
          ) : !isGameOver && isLastGuessIncorrect ? (
            <>
              <p className="farewell-message">
                {getFarewellText(languages[wrongGuessCount - 1].name)}
              </p>
            </>
          ) : null}
        </button>
        <section className="language-container">{languageChips}</section>
        <section className="current-word">{currentWordArr}</section>
        <section className="keyboard">{keyboard}</section>
        {isGameOver && (
          <button className="new-game" onClick={resetButton}>
            New game
          </button>
        )}
      </main>
    </>
  );
}

export default App;
