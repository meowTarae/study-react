import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => {
    setToDo(event.target.value);
  };
  const onClick = (event) => {
    event.preventDefault();
    setToDo("");
    setToDos([toDo, ...toDos]);
  };
  return (
    <>
      <form>
        <h1>My To Dos ({toDos.length})</h1>
        <input
          type="text"
          placeholder="Input your to dos!"
          value={toDo}
          onChange={onChange}
        />
        <button type="submit" onClick={onClick}>
          Add
        </button>
      </form>
    </>
  );
}

export default App;
