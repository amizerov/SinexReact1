import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { TrendingCoins } from "../../../../Config/api";
import { CurrState } from "../../../../Contexts/CurrCont";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { numberWithCommas } from "../../../../Helpers";


const Carousel = () => {
  
  const [trending, setTrending] = useState([]); 
  const {currency,symbol} = CurrState();

  const fetchTreandingCoins = async () => {
    const res = await fetch(TrendingCoins(currency));
    const data = await res.json();
    setTrending(data);
  };

  useEffect(() => {
    fetchTreandingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "#fff",
      textDecoration: "none",
    }
  }));
  const classes = useStyles();
  
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coin/${coin.id}`}>
        <img 
          src={coin?.image} 
          alt={coin.name} 
          height="80" 
          style={{marginBottom: 10}}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span style={{color: profit > 0 ? 'rgb(14, 203, 129)' : 'red'}}>
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{fontSize: 22, fontWeight: 500}}>
          {symbol} {numberWithCommas(coin?.current_price?.toFixed(2))}
        </span>
      </Link>
    )
  });

  const responsive = {
    0: {
      items: 2
    },
    512: {
      items: 3,
      itemsFit: 'contain'
    },
    1024: {
      items: 4
    }
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        horizontal={true}
        mouseTracking
        infinite
        autoPlayInterval={1000}  
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  )
}

export default Carousel