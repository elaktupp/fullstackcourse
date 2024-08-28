import { useState } from "react";

function App() {
  return (
    <>
      <h1>Anecdote</h1>
      <AnecdoteGadget />
    </>
  );
}

export const AnecdoteGadget = () => {
  const [index, setIndex] = useState(0);
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  return (
    <>
      <hr />
      <p>
        <i>"{anecdotes[index]}"</i>
      </p>
      <button
        onClick={() => {
          let random = Math.random(); // range from 0 to 1
          let biggestIndex = anecdotes.length - 1;
          let newIndex = Math.round(biggestIndex * random); // round to closes integer
          setIndex(newIndex);
        }}
      >
        Next anecdote
      </button>
      <hr />
    </>
  );
};

export default App;
