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
  const { isLoading, data } = useQuery<dataProps>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return <>{isLoading ? "Now Loading..." : <ul></ul>}</>;
}

export default Chart;
