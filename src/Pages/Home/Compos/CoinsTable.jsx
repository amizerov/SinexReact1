import React, { useEffect, useState } from 'react'
import { CoinList } from '../../../Config/api';
import { CurrState } from '../../../Contexts/CurrCont';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Container, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from '../../../Helpers';

const CoinsTable = () => {
  
  //console.log('CoinsTable');

  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [coinsFiltered, setCoinsFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); 
  const rowsOnPage = 5;
  
  const {currency, symbol} = CurrState();
  
  const fetchCoins = async () => {
    setLoading(true);
    const res = await fetch(CoinList(currency));
    const data = await res.json();
    setCoins(data);
    setCoinsFiltered(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#EEBC1D',
      }
    },
  });

  const useStyles = makeStyles((theme) => ({
    tableRow: {
      backgroundColor: '#16171a',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#131111',
      },
      fontFamily: 'Montserrat',
    },
  }));  
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{textAlign: "center"}}>
        <Typography variant="h4" 
          style={{margin: 18, fontFamily: "Montserrat"}}
        >
          Top 100 Coins by Market Cap
        </Typography>
        <TextField label="Search for a Coin" 
          variant="outlined" 
          style={{marginBottom: 20, width: "100%"}}
          onChange={(e) => {
            var search = e.target.value;
            setCoinsFiltered(coins.filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
          ))
          }}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{backgroundColor: "gold"}} />
          ) : (
            <Table>
              <TableHead style={{backgroundColor: "#EEBC1D"}}>
                <TableRow>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                    <TableCell key={head}
                      style={{
                        color: 'black',
                        fontWeight: '700',
                        fontFamily: 'Montserrat',                      
                      }}
                      align={head === 'Coin' ? 'left' : 'right'}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead> 
              <TableBody>
                {coinsFiltered.slice((page-1)*rowsOnPage, page*rowsOnPage)
                 .map((coin) => {
                 
                  const profit = coin?.price_change_percentage_24h >= 0;

                  return(
                    <TableRow key={coin.name}
                      onClick={() => navigate(`/coin/${coin.id}`)}
                      className={classes.tableRow}
                    >
                      <TableCell component='th' scope='row'
                        style={{
                          display: 'flex',
                          gap: 15,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        <img 
                          src={coin?.image}
                          alt={coin.name}
                          height='50'
                          style={{marginRight: 10}}
                        />
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <span style={{textTransform: 'uppercase', fontSize: 22}}>
                            {coin.symbol}
                          </span>
                          <span style={{color: 'darkgray'}}>
                            {coin.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align='right'>
                        <span style={{fontWeight: 'bold'}}>
                          {symbol}{" "}
                          {numberWithCommas(coin.current_price.toFixed(2))}
                        </span>
                      </TableCell>
                      <TableCell align='right'
                        style={{
                          color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                          fontWeight: 'bold',
                        }}
                      >
                        {profit && '+'}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align='right'
                        style={{fontWeight: 'bold'}}
                      >
                        {symbol}{" "}
                        {numberWithCommas(coin.market_cap)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination count={Math.ceil(coinsFiltered.length/rowsOnPage)} 
          onChange={(e, value) => setPage(value)}
          variant='outlined'
          color='primary'
          size='large'
          style={{
            marginTop: 20,
            paddingBottom: 20,
            display: 'flex',
            justifyContent: 'center',
          }}
        />
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable