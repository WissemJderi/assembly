import "./App.css";
import { languages } from "./languages";
import { useState } from "react";

function App() {
  // State to hold the current word to guess
  const [currentWord] = useState("react");
  // State to hold the user's guesses
  const [userGuess, setUserGuess] = useState([]);
  console.log(userGuess);
  function updateUserGuess(alphabet) {
    setUserGuess((prevArr) =>
      prevArr.includes(alphabet) ? prevArr : [...prevArr, alphabet]
    );
  }
  // Alphabet string
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Generate keyboard buttons from the alphabet
  const keyboard = alphabet
    .toUpperCase()
    .split("")
    .map((alphabet) => {
      return (
        <button
          className="alphabet-btn"
          key={alphabet}
          onClick={() => {
            updateUserGuess(alphabet);
          }}
        >
          {alphabet}
        </button>
      );
    });

  // Generate the current word display
  const currentWordArr = currentWord
    .toUpperCase()
    .split("")
    .map((letter, index) => {
      return <span key={index}>{letter}</span>;
    });

  // Generate language chips from the languages array
  const languageChips = languages.map((lang) => {
    return (
      <span
        key={lang.name}
        style={{ backgroundColor: lang.backgroundColor, color: lang.color }}
        className="language-btn"
      >
        {lang.name}
      </span>
    );
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
        <button className="status">
          You win! <br />
          Well Done!
        </button>
        <section className="language-container">{languageChips}</section>
        <section className="current-word">{currentWordArr}</section>
        <section className="keyboard">{keyboard}</section>
        <button className="new-game">New Game</button>
      </main>
    </>
  );
}

export default App;
