import { useState } from "react";

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

const History = ({ allClicks }) => {
  let everyClick = "";
  if (allClicks.length > 0) everyClick = allClicks.join(" ");
  else everyClick = "Click buttons above...";

  return (
    <>
      <hr />
      <h3>{everyClick}</h3>
    </>
  );
};

function App() {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAllClicks] = useState([]);

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAllClicks(allClicks.concat("R"));
    setRight(right + 1);
  };

  const handleResetClick = () => {
    // Put 'debugger' anywhere in code
    // to stop execution in browser's debugger.
    // debugger;
    setLeft(0);
    setRight(0);
    setAllClicks([]);
  };

  return (
    <>
      <h1>LEFT AND RIGHT</h1>
      <span>
        <CounterButton
          onClick={handleLeftClick}
          style={{ fontSize: 32 }}
          text="L"
        />
        <span style={{ fontSize: 32, marginRight: 6 }}>{left}</span>
        <CounterButton
          onClick={handleResetClick}
          style={{ fontSize: 32 }}
          text="C"
        />
        <span style={{ fontSize: 32, marginLeft: 6 }}>{right}</span>
        <CounterButton
          onClick={handleRightClick}
          style={{ fontSize: 32 }}
          text="R"
        />
      </span>
      <History allClicks={allClicks} />
    </>
  );
}

export default App;
