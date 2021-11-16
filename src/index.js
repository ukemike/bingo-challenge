import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import shuffle from "shuffle-array";
import "./index.css";
import { start } from "./Confetti";

function Confetti() {
  useEffect(() => {
    start();
  });
  return <canvas id="canvas" />;
}

function Tile({ id, children, onToggle, isSet }) {
  return (
    <div onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
      {children}
    </div>
  );
}

const bingo = [
  "Child noises in the background",
  "Hello helo",
  "Can you hear me",
  "I need to jump in on another call",
  "Can everyone go on mute",
  "Could you please get closer to the mic",
  "Next slide please",
  "Can you turn on your camera",
  "Can we take this offline",
  "Is __ on the call",
  "Could you share these slides afterwards",
  "Can somebody grant presenter right",
  "Can you email that to everyone",
  "Sorry i had problems loging in",
  "Animal noises in the background",
  "Sorry something went wrong with my calendar",
  "Who just joined",
  "I will have to get back to you",
  "I was having connections issues",
  "Sorry i didnt find the conference id",
  "Can you repeat please",
  "Sorry i was on mute",
  "You will send the minutes",
  "Lets wait for Julia",
  "CONF CALL BINGO!"
];

// convert the array to an object
const data = shuffle(bingo).reduce(
  (data, value, index) => ({ ...data, [index]: value }),
  {}
);

//get the conf call bingo
// const matches = bingo.filter(s => s.includes('CONF'));

function App() {
  const [completed, setCompleted] = useState({ checked: {} });
  const isWon = checked => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find(row => range.every(column => checked[row * 5 + column])) ||
      undefined !==
        range.find(column => range.every(row => checked[row * 5 + column])) ||
        range.every(index => checked[index * 5 + index]) ||
        range.every(index => checked[index * 5 + 4 - index])
    );
  };
  const toggle = id =>
  setCompleted(completed => {
      const checked = { ...completed.checked, [id]: !completed.checked[id] };
      const won = isWon(checked);
      return {
        ...completed,
        checked,
        won
      };
    });

    // const matches = bingo.filter(bing => bing.includes('CONF'));

  return (
    <>
    <div className="App">
      <h1>Bingo Game Challenge</h1>
      <div className="wrapper">
        {Object.keys(data).map(id => (
          <Tile
            key={id}
            id={id}
            isSet={!!completed.checked[id]}
            onToggle={() => toggle(id)}
          >
            {data[id]}
          </Tile>
        ))}
      </div>
      {completed.won ? <Confetti /> : null}
      <button onClick={() => setCompleted({ checked: {} })}>Reset</button>
    </div>
 
</>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
