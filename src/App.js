import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route } from 'react-router';
import { getLocalStorageItem } from './lib/util';
import { requestQueueInStocks } from './lib/api';
import { StockProvider } from './context/StockContext';
import Home from './page/Home';
import Stock from './page/Stock';

function App() {
    useEffect(async () => {
        const stockList = getLocalStorageItem("STOCK_LIST");
        await requestQueueInStocks(stockList);
        initPredictList();

        return () => console.log("gone");
    }, [])

    return (
        <StockProvider>
            <GlobalStyle/>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/stock" component={Stock}/>
        </StockProvider>
    );
}

const initPredictList = () => {
    if (localStorage.getItem('PREDICT_LIST') === null) {
        localStorage.setItem('PREDICT_LIST', JSON.stringify([]));
    }
}

const GlobalStyle = createGlobalStyle`
    body {
        display: block;
        background: #e4e4e4;
    }
`;

export default App;
