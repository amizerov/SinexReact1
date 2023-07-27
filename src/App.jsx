import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Compos/Header';
import Home from './Pages/Home';
import Coin from './Pages/Coin';
import { makeStyles } from '@mui/styles';

function App() {

  const useStyles = makeStyles((theme) => ({
    App: {
      backgroundColor: '#14161a',
      color: '#fff',
      minHeight: '100vh',
    },
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<Coin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
