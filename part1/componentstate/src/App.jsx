import { useState } from "react";

const Display = ({ counter }) => <h1>Count: {counter}</h1>;
const Footer = (props) => {
  console.log("FOOTER");
  return (
    <>
      <hr />
      <h4>Lorem ipsum...</h4>
    </>
  );
};

const CounterButton = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      style={{ fontSize: 32, width: 50, height: 40, margin: 3 }}
    >
      {text}
    </button>
  );
};

const App = () => {
  const [counter, setCounter] = useState(0);

  console.log("RENDER with " + counter);

  const incrementCount = () => {
    console.log("INCREMENT " + counter + " by one");
    setCounter(counter + 1);
  };

  const resetCountToZero = () => {
    console.log("RESET " + counter + " to zero");
    setCounter(0);
  };

  const decrementCount = () => {
    console.log("DECREMENT " + counter + " by one");
    setCounter(counter - 1);
  };

  return (
    <div>
      <Display counter={counter} />
      <span>
        <CounterButton onClick={incrementCount} text="+" />
        <CounterButton onClick={resetCountToZero} text="0" />
        <CounterButton onClick={decrementCount} text="-" />
      </span>
      <Footer />
    </div>
  );
};

export default App;
