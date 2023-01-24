import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface ChartProps {
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

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<dataProps[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <>
      {isLoading ? (
        "Now Loading..."
      ) : (
        <ApexCharts
          series={[
            {
              name: "Price",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            chart: {
              type: "line",
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            theme: {
              mode: "dark",
            },
            yaxis: {
              show: false,
            },
            stroke: {
              width: 4,
              curve: "smooth",
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0be881"],
                stops: [0, 100],
              },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((time) => {
                let closeTime = new Date(time.time_close * 1000);
                return closeTime.toLocaleDateString("en-US");
              }),
            },
          }}
        />
      )}
    </>
  );
}

export default Chart;
