import styled from "styled-components";

const Btn = styled.button`
  background: ${(props) => (props ? "red" : "blue")};
  width: 100px;
  height: 100px;
`;

function App() {
  return (
    <>
      <Btn bgColor={false} />
    </>
  );
}

export default App;
