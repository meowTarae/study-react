import React from "react";

function App() {
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
  };
  return (
    <>
      <form>
        <input type="text" placeholder="Hello!" onChange={onChange} />
        <button>Login</button>
      </form>
    </>
  );
}

export default App;
