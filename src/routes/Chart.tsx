import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";

const Container = styled.div`
  .apexcharts-tooltip {
    color: ${(props) => props.theme.accentColor};
  }
  .apexcharts-tooltip-box {
    border-radius: 8px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 0.2px solid ${(props) => props.theme.accentColor};
  }
`;
const NoData = styled.div`
  width: 100%;
  margin-top: 25px;
  color: white;
  font-size: 2em;
  text-align: center;
`;
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
  const { isLoading, data } = useQuery<dataProps[]>(
    ["ohlcv-Chart", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  let candlestickData = data?.map((v) => {
    return {
      x: v.time_close * 1000,
      y: [v.open, v.high, v.low, v.close],
    };
  });

  return (
    <Container>
      {isLoading ? (
        "Now Loading..."
      ) : candlestickData ? (
        <ApexCharts
          type="candlestick"
          series={[{ data: candlestickData }]}
          options={{
            chart: {
              height: 350,
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              type: "datetime",
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            tooltip: {
              theme: "false",
              enabled: true,
              followCursor: false,
              style: {
                fontSize: "12px",
              },
              x: {
                show: true,
                format: "dd MMM yy",
                formatter: undefined,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#487eb0",
                  downward: "#c23616",
                },
              },
            },
          }}
        />
      ) : (
        <NoData>Sorry. There's no data.</NoData>
      )}
    </Container>
  );
}

export default Chart;
