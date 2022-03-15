import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { Route } from "react-router";
import { getLocalStorageItem } from "./lib/util";
import { requestQueueInStocks } from "./lib/api";
import { StockProvider } from "./context/StockContext";
import Home from "./page/Home";
import Stock from "./page/Stock";
import Predict from "./page/Predict";

const initPredictList = () => {
    if (localStorage.getItem("PREDICT_LIST") === null) {
        localStorage.setItem("PREDICT_LIST", JSON.stringify([]));
    }
};

function App() {
    const [calcState, setCalcState] = useState({});
    initPredictList(setCalcState);
    useEffect(async () => {
        const stockList = getLocalStorageItem("STOCK_LIST");
        await requestQueueInStocks(stockList);
    }, []);

    return (
        <StockProvider>
            <GlobalStyle />
            <Route path="/" exact={true} component={Home} />
            <Route path="/stock" component={Stock} />
            <Route path="/predict" component={Predict} />
        </StockProvider>
    );
}
const GlobalStyle = createGlobalStyle`
    body {
        display: block;
        background: #e4e4e4;
    }
`;

export default App;
