import React, { useEffect } from 'react';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import { Route } from 'react-router';
import { getLocalStorageItem } from './lib/util/util';
import { StockProvider } from './context/StockContext';
import Home from './page/Home';
import Stock from './page/Stock';

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
                const formData = new FormData();
                formData.append("name", stockItem.name);
                return axios.post("https://stock-mlp.com/graduation/stock", formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
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
