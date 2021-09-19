import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route } from 'react-router';
import axios from 'axios';
import { StockProvider } from './context/StockContext';
import Home from './page/Home';
import Stock from './page/Stock';
import { getLocalStorageItem } from './lib/util/util';

const GlobalStyle = createGlobalStyle`
    body {
        display: block;
        background: #e4e4e4;
    }
`;

const requestStocks = () => {
    const stockList = getLocalStorageItem("STOCK_LIST");
    axios
        .all(
            stockList.map(stockItem => {
                return axios.post("https://stock-mlp.com/graduation/stock", {
                    body: {
                        name: stockItem.name
                    }
                });
            })
        )
        .then(
            axios.spread((...res) => {
                console.log(res);
            })
        )
} 

function App() {
    useEffect(() => {
        requestStocks();

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

export default App;
