import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState();
  const handleInputMoney = (event) => {
    setMoney(event.target.value);
    let test = coins[0].quotes.USD.price;
    console.log(test.toFixed(3));
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <h1>{loading ? "" : `We have ${coins.length} coins!`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <label htmlFor="money">Input how much dollar do you have!</label>
          <br />
          <input
            id="money"
            type="number"
            placeholder="Enter the money you have"
            onChange={handleInputMoney}
          />
          <br />

          <select>
            {coins.map((coin, index) => (
              <option key={index}>
                {coin.name} : {coin.quotes.USD.price}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}
export default App;

/*
  ̶1̶.̶ ̶R̶e̶c̶e̶i̶v̶e̶ ̶i̶n̶p̶u̶t̶ ̶f̶r̶o̶m̶ ̶t̶h̶e̶ ̶u̶s̶e̶r̶ ̶o̶f̶ ̶t̶h̶e̶ ̶d̶o̶l̶l̶a̶r̶ ̶t̶h̶e̶y̶ ̶c̶u̶r̶r̶e̶n̶t̶l̶y̶ ̶h̶a̶v̶e̶.̶
  2. option에서 코인을 선택한다.
  3. 현재 달러로 해당 코인을 얼마나 살 수 있는지 보여준다.
*/
