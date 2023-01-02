import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coinCost, setCost] = useState(0);
  const [coinSymbol, setSymbol] = useState("");
  const [money, setMoney] = useState();
  const handleInputMoney = (event) => {
    setMoney(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const handleChangeCoins = (event) => {
    const {
      target: { value },
    } = event;
    if (value === "Select Coin !") {
      setCost(0);
      setSymbol("");
      return;
    }
    setCost(JSON.parse(value).quotes.USD.price);
    setSymbol(JSON.parse(value).symbol);
  };
  return (
    <>
      <h1>
        {loading ? "" : `Dollar => coin ! ( we have ${coins.length} coins! )`}
      </h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <h3>Input how much dollar do you have !</h3>
          <input
            id="money"
            type="number"
            placeholder="Enter the money you have"
            onChange={handleInputMoney}
          />
          <label htmlFor="money">Dollar </label>
          <br />
          <select onChange={handleChangeCoins}>
            <option>Select Coin !</option>
            {coins.map((coin, index) => (
              <option key={index} value={JSON.stringify(coin)}>
                {coin.name} ({coin.symbol}) : {coin.quotes.USD.price}
              </option>
            ))}
          </select>
          <br />
          {money ? (
            <h3>
              {coinCost === 0
                ? "Plz select coins !"
                : ` => ${money / coinCost} ${coinSymbol}`}
            </h3>
          ) : (
            " "
          )}
        </div>
      )}
    </>
  );
}
export default App;
