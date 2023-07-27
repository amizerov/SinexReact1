import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { CurrState } from "../../../Contexts/CurrCont";
import { numberWithCommas } from "../../../Helpers";

const Root = styled("div")(({ theme }) => ({
  alignSelf: "flex-start",
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  fontFamily: "Montserrat !important",
  fontWeight: "bold !important",
  padding: 25,
  width: "100%",
  backgroundColor: "#222",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    flexDirection: "row",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
}));

const Line = styled(Typography)(({ theme }) => ({
  display: "flex",
  marginBottom: 20,
  fontFamily: "Montserrat",
  /*no wrap*/
  whiteSpace: "nowrap",
  [theme.breakpoints.down("md")]: {
    marginRight: 20,
  },
}));

const lineHead = {
  fontWeight: "bold",
  fontFamily: "Montserrat",
  marginRight: 10,
};

const Marketdata = ({ coin }) => {
  const { currency, symbol } = CurrState();
  const curr = currency.toLowerCase();
  const price = coin.market_data.current_price[curr];
  const cap = coin.market_data.market_cap[curr];

  return (
    <Root>
      {[
        { l: "Rank", r: coin.market_cap_rank },
        { l: "Price", r: symbol + " " + numberWithCommas(price) },
        { l: "Cap", r: symbol + " " + numberWithCommas(cap) },
      ].map((e, i) => (
        <Line key={i} variant="h5">
          <div style={lineHead}>{e.l}:</div> {e.r}
        </Line>
      ))}
    </Root>
  );
};

export default Marketdata;
