import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => {
    setToDo(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") return;
    setToDo("");
    setToDos((prevToDos) => [toDo, ...prevToDos]);
  };
  const deleteBtn = (index) => {
    // setToDos((toDoArray) => toDoArray.filter((item, i) => i !== index));
    // setToDos(toDos.filter((item, todoIndex) => index !== todoIndex));
    console.log("hello");
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
        <button type="submit" onClick={onSubmit}>
          Add
        </button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={deleteBtn(index)}>❌</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
