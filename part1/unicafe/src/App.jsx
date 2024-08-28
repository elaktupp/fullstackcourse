import { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <Button text="good" clickHandler={() => setGood(good + 1)} />
        <Button text="neutral" clickHandler={() => setNeutral(neutral + 1)} />
        <Button text="bad" clickHandler={() => setBad(bad + 1)} />
        <Button
          text="reset"
          clickHandler={() => {
            setGood(0);
            setNeutral(0);
            setBad(0);
          }}
        />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  );
}

export const Button = ({ text, clickHandler }) => {
  return <button onClick={clickHandler}>{text}</button>;
};

export const StatisticLine = ({ text, value, unit }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {unit}
      </td>
    </tr>
  );
};

export const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = () => {
    return good + neutral + bad;
  };

  const averageScore = () => {
    // Good = 1, Neutral = 0, Bad = -1
    let total = good + neutral + bad;
    if (total === 0) total = 1;
    // Note: -bad
    return (good - bad) / total;
  };

  const isPositivePercentage = () => {
    if (good + neutral + bad === 0) return 0;
    else return (good / (good + neutral + bad)) * 100;
  };

  if (totalFeedback() > 0) {
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="total feedback" value={totalFeedback()} />
            <StatisticLine text="average score" value={averageScore()} />
            <StatisticLine
              text="positives"
              value={isPositivePercentage()}
              unit="%"
            />
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <h1>Statistics</h1>
        <i>No feedback given yet.</i>
      </>
    );
  }
};

export default App;
