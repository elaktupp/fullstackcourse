import { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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

  // Statistics - destructured props, functions in Statistics.
  // Statistics2 - uses props and also functions as parameters.

  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
        <Statistics good={good} neutral={neutral} bad={bad} />
        <Statistics2
          good={good}
          neutral={neutral}
          bad={bad}
          total={totalFeedback}
          avgScore={averageScore}
          positivePct={isPositivePercentage}
        />
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

export const Statistics2 = (props) => {
  return (
    <>
      <h1>Statistics</h1>
      <ul>
        <li>good: {props.good}</li>
        <li>neutral: {props.neutral}</li>
        <li>bad: {props.bad}</li>
        <li>total feedback: {props.total()}</li>
        <li>average score: {props.avgScore()}</li>
        <li>positives {props.positivePct()} %</li>
      </ul>
    </>
  );
};

export default App;
