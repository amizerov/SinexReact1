import React from 'react'
import ReactHtmlParser from 'html-react-parser';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

  const Root = styled(Typography)(() => ({
    width: "100%",
    paddingBottom: 15,
    paddingTop: 0,
    padding: 25,
    fontFamily: 'Montserrat',
    textAlign: 'justify',
  }));

const Description = ({coin}) => {

  var desc = coin?.description.en;
  const ar = desc.split('. ');
  const cn = ar.length;
  //code to make decr string shorter than 1000 chars and it should contain full sentences
  if (cn > 1) {
    var i = 0;
    var str = '';
    while (str.length < 200) {
      str += ar[i] + '. ';
      i++;
    }
    desc = str;
  }

  return (
    <Root>          
      {ReactHtmlParser(desc)}
    </Root>
  )
}

export default Description