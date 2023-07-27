import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CurrState } from '../../Contexts/CurrCont';
import { SingleCoin } from '../../Config/api';
import CoinInfo from './Compos/CoinInfo';
import { styled } from '@mui/material/styles';
import { CircularProgress, Typography } from '@mui/material';
import Description from './Compos/Description';
import Marketdata from './Compos/Marketdata';

const Coin = () => {

  const {id} = useParams();
  const [coin, setCoin] = useState([]);
  const {currency} = CurrState();

  const fetchCoin = async () => {
    const res = await fetch(SingleCoin(id));
    const data = await res.json();
    
    //wait for 1 second
    await new Promise(r => setTimeout(r, 100));

    setCoin(data);
    //console.log(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const Root = styled('div')(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

  const Sidebar = styled('div')(({theme}) => ({
    width: "30%",
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRight: '2px solid #555',
    marginTop: 25,
  }));

  const Heading = styled(Typography)(() => ({
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat',
  }));

  if(!coin.image) 
    return <CircularProgress 
              style={{
                color: 'gold', marginTop: 100, marginBottom: 100,
                marginLeft: 'auto', marginRight: 'auto', display: 'block'
              }}
           />;
  else
    return (
    <Root>
      <Sidebar>
        <img src={coin.image.large} alt={coin.name} 
          height="200" style={{marginBottom: 20}}
        />
        <Heading variant="h3">{coin.name}</Heading>
        <Description coin={coin} />
        <Marketdata coin={coin} />
      </Sidebar>
      {/*chart*/}
      <CoinInfo coin={coin}/>
    </Root>
  )
}

export default Coin