import "./App.css";
import { languages } from "./languages";
import { useState } from "react";
function App() {
  const [currentWord] = useState("react");
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const keyboard = alphabet
    .toUpperCase()
    .split("")
    .map((alphabet) => {
      return (
        <button className="alphabet-btn" key={alphabet}>
          {alphabet}
        </button> 
      );
    });

  const currentWordArr = currentWord
    .toUpperCase()
    .split("")
    .map((letter, index) => {
      return <span key={index}>{letter}</span>;
    });
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
      </main>
    </>
  );
}

export default App;
