import { useEffect, useState } from "react";

function Hello() {
  useEffect(() => {
    console.log("Create! :D");
    return () => console.log("Destroy! :(");
  }, []);
  return <h1>Hello</h1>;
}

function App() {
  const [showing, setShowing] = useState(true);
  function onClick() {
    setShowing((prev) => !prev);
  }
  return (
    <>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </>
  );
}

export default App;
