import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...",
    "Any fool can write code that a computer can understand...",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code...",
    "Programming without console.log is like a doctor refusing tests.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNext = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const maxVotes = Math.max(...votes);
  const mostVotedIndex = votes.indexOf(maxVotes);

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>

      <h2>Most voted anecdote</h2>
      <p>{anecdotes[mostVotedIndex]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  );
};

export default App;
