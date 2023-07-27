import React, { useEffect, useState } from "react";
import { CurrState } from "../../../Contexts/CurrCont";
import { ThemeProvider } from "@emotion/react";
import { CircularProgress, createTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { HistoricalChart } from "../../../Config/api";
import { Line } from "react-chartjs-2";
import { chartDays } from "../../../Config/data";
import BtnPeriod from "./BtnPeriod";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const ChartContainer = styled("div")(({ theme }) => ({
  width: "75%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  justifyContent: "center",
  padding: 40,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginTop: 0,
    padding: 20,
    paddingTop: 0,
  },
}));

const CoinInfo = ({ coin }) => {
  const [historData, setHistorData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CurrState();

  const fetchHistorData = async () => {
    const res = await fetch(HistoricalChart(coin.id, days, currency));
    const data = await res.json();
    setHistorData(data.prices);
  };

  useEffect(() => {
    fetchHistorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);

  return (
    <ThemeProvider theme={darkTheme}>
      <ChartContainer theme={darkTheme}>
        {!historData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days)`,
                    borderColor: "#EEBC1D",
                    backgroundColor: "#EEBC1D",
                    pointRadius: 0,
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <BtnPeriod
                  key={day.value}
                  selected={day.value === days}
                  onClick={() => setDays(day.value)}
                  day={day}
                />
              ))}
            </div>
          </>
        )}
      </ChartContainer>
    </ThemeProvider>
  );
};

export default CoinInfo;
