import { useEffect, useState } from "react";
import type { JSX } from "react";
import Confetti from "react-confetti";
import styles from "./App.module.css";
function App(): JSX.Element {
  const [numbers, setNumbers] = useState<number[]>([
    4, 4, 6, 3, 1, 4, 5, 1, 2, 3,
  ]);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [lockedNumbers, setLockedNumbers] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    setNumbers(
      Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)),
    );
  }, []);

  function Locknumber(index: number): void {
    setLockedNumbers((prev: boolean[]): boolean[] =>
      prev.map((selected: boolean, i: number) =>
        i === index ? !selected : selected,
      ),
    );

    const allSame: boolean = numbers.every((num) => num === numbers[0]);
    if (allSame) {
      Won();
    }
  }
  function RollFunc(): void {
    setNumbers((prev: number[]): number[] =>
      prev.map((num, i) =>
        lockedNumbers[i] === false ? Math.floor(Math.random() * 10) : num,
      ),
    );
  }
  function Won() {
    setIsGameWon(true);
  }
  function NewGame(): void {
    setIsGameWon(false);
    setLockedNumbers((prev: boolean[]): boolean[] => prev.map(() => false));

    setNumbers((prev: number[]): number[] =>
      prev.map((num) => (num = Math.floor(Math.random() * 10))),
    );
  }
  return (
    <div className={styles.body}>
      {isGameWon === true ? <Confetti /> : ""}
      <h1 className={styles.welcomeTitle}>
        Welcome to Taimoor's Tenzies Game!
      </h1>{" "}
      <div className={styles.holder}>
        <h1 className={styles.title}>Tenzies</h1>
        <p className={styles.textp}>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls
        </p>
        <div className={styles.diceContainer}>
          {numbers.map((box, index) => (
            <div
              className={`${styles.dice} ${
                lockedNumbers[index] ? styles.selected : ""
              }`}
              key={index}
              onClick={() => Locknumber(index)}
            >
              {box}
            </div>
          ))}
        </div>
        {isGameWon ? (
          <button className={styles.buttonRoll} onClick={() => NewGame()}>
            New Game
          </button>
        ) : (
          <button className={styles.buttonRoll} onClick={() => RollFunc()}>
            Roll
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
