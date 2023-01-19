import { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ChartProps {
  coinId: string;
}

interface dataProps {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  console.log(data);

  return <>{isLoading ? "Now Loading..." : <ul></ul>}</>;
}

export default Chart;
