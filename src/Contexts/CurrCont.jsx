import React, { createContext, useContext, useEffect, useState } from 'react'

const cxt = createContext();

const CurrContext = ({children}) => {
  const [currency, setCurrency] = useState('RUB');
  const [symbol, setSymbol] = useState('₽');

  useEffect(() => {
    if (currency === 'USD') {
      setSymbol('$');
    } else if (currency === 'EUR') {
      setSymbol('€');
    } else {
      setSymbol('₽');
    }
  }, [currency]);

  return( 
    <cxt.Provider value={{currency,symbol,setCurrency}}>
      {children}
    </cxt.Provider>
  )
};

export default CurrContext;

export const CurrState = () => {
  const {currency,symbol,setCurrency} = useContext(cxt);
  if (!currency || !symbol || !setCurrency) {
    throw new Error('SinexState must be used within a c.Provider');
  }
  return {currency,symbol,setCurrency};
}