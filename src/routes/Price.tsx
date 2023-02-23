import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NowTime = styled.div`
  margin: 2% 0;
`;

const PriceBox = styled.div<{ isPriceGoUp: boolean | number }>`
  width: 80%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2% 0;
  padding: 0 6%;

  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;

  text-align: center;
  span {
    color: ${(props) => (props.isPriceGoUp ? "#c23616" : "#487eb0")};
  }
  b {
    color: ${(p) => p.theme.accentColor};
  }
`;

const NoData = styled.div`
  width: 100%;
  margin-top: 25px;
  color: white;
  font-size: 2em;
  text-align: center;
`;
interface PriceProps {
  coinId: string;
}
interface dataProps {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<dataProps[]>(
    ["ohlcv-Price", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  let priceData = data?.filter((v, i) => i >= 19);
  let nowTime = priceData
    ? new Date(priceData[1].time_close * 1000).toDateString()
    : `Sorry, There's no time`;
  let volume = priceData
    ? [
        +priceData[1].volume >= +priceData[0].volume,
        (parseFloat(priceData[1].volume) / parseFloat(priceData[0].volume)) *
          100,
      ]
    : [false, 0];
  let open = priceData
    ? [
        +priceData[1].open >= +priceData[0].open,
        (parseFloat(priceData[1].open) / parseFloat(priceData[0].open)) * 100,
      ]
    : [false, 0];
  let high = priceData
    ? [
        +priceData[1].high >= +priceData[0].high,
        (parseFloat(priceData[1].high) / parseFloat(priceData[0].high)) * 100,
      ]
    : [false, 0];
  let low = priceData
    ? [
        +priceData[1].low >= +priceData[0].low,
        (parseFloat(priceData[1].low) / parseFloat(priceData[0].low)) * 100,
      ]
    : [false, 0];
  let close = priceData
    ? [
        +priceData[1].close >= +priceData[0].close,
        (parseFloat(priceData[1].close) / parseFloat(priceData[0].close)) * 100,
      ]
    : [false, 0];

  return (
    <Container>
      {isLoading ? (
        "Now Loading..."
      ) : priceData ? (
        <>
          <NowTime>{`Standard : ${nowTime} (DoD)`}</NowTime>
          {/* Volume */}
          <PriceBox isPriceGoUp={volume[0]}>
            <p>
              <b>Volume </b>
              {` : ${Number(priceData[1].volume).toFixed(3)} $`}
            </p>
            <span>{`${
              volume[0]
                ? "+" + (Number(volume[1]) - 100).toFixed(2) + "%"
                : "-" + (100 - Number(volume[1])).toFixed(2) + "%"
            }`}</span>
          </PriceBox>
          {/* Open */}
          <PriceBox isPriceGoUp={open[0]}>
            <p>
              <b>Open </b>
              {` : ${Number(priceData[1].open).toFixed(3)} $`}
            </p>
            <span>{`${
              open[0]
                ? "+" + (Number(open[1]) - 100).toFixed(2) + "%"
                : "-" + (100 - Number(open[1])).toFixed(2) + "%"
            }`}</span>
          </PriceBox>
          {/* High */}
          <PriceBox isPriceGoUp={high[0]}>
            <p>
              <b>High </b>
              {` : ${Number(priceData[1].high).toFixed(3)} $`}
            </p>
            <span>{`${
              high[0]
                ? "+" + (Number(high[1]) - 100).toFixed(2) + "%"
                : "-" + (100 - Number(high[1])).toFixed(2) + "%"
            }`}</span>
          </PriceBox>
          {/* Low */}
          <PriceBox isPriceGoUp={low[0]}>
            <p>
              <b>Low </b>
              {` : ${Number(priceData[1].low).toFixed(3)} $`}
            </p>
            <span>{`${
              low[0]
                ? "+" + (Number(low[1]) - 100).toFixed(2) + "%"
                : "-" + (100 - Number(low[1])).toFixed(2) + "%"
            }`}</span>
          </PriceBox>
          {/* Close */}
          <PriceBox isPriceGoUp={close[0]}>
            <p>
              <b>Close </b>
              {` : ${Number(priceData[1].close).toFixed(3)} $`}
            </p>
            <span>{`${
              close[0]
                ? "+" + (Number(close[1]) - 100).toFixed(2) + "%"
                : "-" + (100 - Number(close[1])).toFixed(2) + "%"
            }`}</span>
          </PriceBox>
        </>
      ) : (
        <NoData>Sorry. There's no data.</NoData>
      )}
    </Container>
  );
}

export default Price;
