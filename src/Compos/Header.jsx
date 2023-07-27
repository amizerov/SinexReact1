import { 
  AppBar, 
  Container, 
  MenuItem, 
  Select, 
  Toolbar, 
  Typography, 
  ThemeProvider, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { CurrState } from '../Contexts/CurrCont';

const Header = () => {

  const navigate = useNavigate();
  const {currency, setCurrency} = CurrState();
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  const useStyles = makeStyles((theme) => ({
    title: {
      flex: 1,
      color: 'gold',
      fontFamily: 'Montserrat !important',
      fontWeight: 'bold !important',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    },
    select: {
      width: 100,
      height: 40,
      marginRight: 15,
    },
  }));
  const classes = useStyles();
      
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate('/')} 
              className={classes.title}
              variant='h6'
            >
              <img style={{marginRight: 10}}
                src="../face1.png" alt="logo" width="50" height="50" />
              Sinex Crypto
            </Typography>
            <Select className={classes.select}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'EUR'}>EUR</MenuItem>
              <MenuItem value={'RUB'}>RUB</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;