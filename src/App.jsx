import "./App.css";
import { languages } from "./languages";
import { useState } from "react";
import clsx from "clsx";
function App() {
  // State to hold the current word to guess
  const [currentWord] = useState("react");
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
      >
        {alphabet.toUpperCase()}
      </button>
    );
  });

  // Generate the current word display
  const currentWordArr = currentWord.split("").map((letter, index) => {
    return (
      <span key={index}>
        {userGuess.includes(letter) ? letter.toUpperCase() : ""}
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
              <h2>You win!</h2>
              <p>Well Done</p>
            </>
          ) : (
            <>
              <h2>Game over!</h2>
              <p>You lose! Better start learning Assembly : &#41;</p>
            </>
          )}
        </button>
        <section className="language-container">{languageChips}</section>
        <section className="current-word">{currentWordArr}</section>
        <section className="keyboard">{keyboard}</section>
        {isGameOver && <button className="new-game">New game</button>}
      </main>
    </>
  );
}

export default App;
