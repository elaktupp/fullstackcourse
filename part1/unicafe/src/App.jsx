import { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let stats = "";
  // Show Statistics only if there is feedback given.
  if (good + neutral + bad > 0) {
    stats = <Statistics good={good} neutral={neutral} bad={bad} />;
  }

  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
        <button
          onClick={() => {
            setGood(0);
            setNeutral(0);
            setBad(0);
          }}
        >
          reset
        </button>
        {stats}
      </div>
    </>
  );
}

export const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = () => {
    return good + neutral + bad;
  };

  // Good = 1, Neutral = 0, Bad = -1
  const averageScore = () => {
    let total = good + bad;
    if (total === 0) total = 1;
    return (good - bad) / total;
  };

  const isPositivePercentage = () => {
    if (good + neutral + bad === 0) return 0;
    else return (good / (good + neutral + bad)) * 100;
  };

  return (
    <>
      <h1>Statistics</h1>
      <ul>
        <li>good: {good}</li>
        <li>neutral: {neutral}</li>
        <li>bad: {bad}</li>
        <li>total feedback: {totalFeedback()}</li>
        <li>average score: {averageScore()}</li>
        <li>positives {isPositivePercentage()} %</li>
      </ul>
    </>
  );
};

export default App;
