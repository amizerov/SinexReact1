import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import Carousel from './Carousel';

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: 'URL(./banner2.jpg)',
  },
  bannerContent: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around',
  },
  tagline: {
    display: 'flex',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography 
            variant='h2'
            style={{
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: 'Montserrat',
            }}
          >
            Synex Crypto
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Trading monitor for crypto currencies from many exchanges
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
}

export default Banner