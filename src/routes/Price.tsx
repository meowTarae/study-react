import { useQuery } from "react-query";
import { fetchCoinPrice } from "../api";
import ApexCharts from "react-apexcharts";
interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceProps>(
    ["ohlcv-Price", coinId],
    () => fetchCoinPrice(coinId),
    {
      refetchInterval: 1000000,
    }
  );

  return (
    <>
      {isLoading ? (
        "Now Loading..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data: [
                {
                  x: new Date(1538778600000),
                  y: [6629.81, 6650.5, 6623.04, 6633.33],
                },
                {
                  x: new Date(1538780400000),
                  y: [6632.01, 6643.59, 6620, 6630.11],
                },
              ],
            },
          ]}
          options={{
            chart: {
              height: 300,
            },
          }}
        />
      )}
    </>
  );
}

export default Price;
