import { useQuery } from "react-query";
import { fetchCoinPrice } from "../api";

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceProps>(
    ["ohlcv-Price", coinId],
    () => fetchCoinPrice(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return <h1>price tab!</h1>;
}

export default Price;
