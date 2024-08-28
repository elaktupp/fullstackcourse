import { useState } from "react";

function App() {
  const [index, setIndex] = useState(0);
  const [anecdotes, setAnecdotes] = useState([
    { text: "If it hurts, do it more often.", votes: 0 },
    {
      text: "Adding manpower to a late software project makes it later!",
      votes: 0,
    },
    {
      text: "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0,
    },
    {
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      votes: 0,
    },
    { text: "Premature optimization is the root of all evil.", votes: 0 },
    {
      text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      votes: 0,
    },
    {
      text: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      votes: 0,
    },
    { text: "The only way to go fast, is to go well.", votes: 0 },
  ]);

  const voteAnecdote = () => {
    const copyOfAnecdotes = [...anecdotes];
    copyOfAnecdotes[index].votes += 1;
    setAnecdotes(copyOfAnecdotes);
  };

  const randomAnecdote = () => {
    let r = Math.random();
    let l = anecdotes.length - 1;
    let i = Math.round(l * r);
    setIndex(i);
  };

  const mostPopular = () => {
    let hasMostVotes = 0;
    anecdotes.forEach((anecdote, index) => {
      if (anecdote.votes > anecdotes[hasMostVotes].votes) {
        hasMostVotes = index;
      }
    });
    return hasMostVotes;
  };

  return (
    <>
      <h1>Anecdotes</h1>
      <AnecdoteGadget
        text={anecdotes[index].text}
        votes={anecdotes[index].votes}
        getNextAnecdote={randomAnecdote}
        giveVote={voteAnecdote}
      />
      <h1>Anecdote with most votes</h1>
      <AnecdoteGadget
        text={anecdotes[mostPopular()].text}
        votes={anecdotes[mostPopular()].votes}
      />
    </>
  );
}

export const AnecdoteGadget = ({ text, votes, getNextAnecdote, giveVote }) => {
  let buttons = "";
  if (getNextAnecdote != undefined && giveVote != undefined) {
    buttons = (
      <>
        {" "}
        <button onClick={giveVote}>Vote</button>
        <button onClick={getNextAnecdote}>Next anecdote</button>
      </>
    );
  }
  return (
    <>
      <hr />
      <p>
        <i>"{text}"</i>
      </p>
      <p>has {votes} votes</p>
      {buttons}
      <hr />
    </>
  );
};

export default App;
