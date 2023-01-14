import { useParams } from "react-router";

interface RouteParams {
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  return <h2>Coin: {coinId}</h2>;
}

export default Coin;
