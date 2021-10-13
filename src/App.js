import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { Route } from "react-router";
import { getLocalStorageItem, initWebSocket } from "./lib/util";
import { requestQueueInStocks } from "./lib/api";
import { StockProvider } from "./context/StockContext";
import Home from "./page/Home";
import Stock from "./page/Stock";
import Predict from "./page/Predict";

const initSocket = (setCalcState) => {
    const url = "wss://stock-mlp.com/graduation/socket";
    const websocket = new WebSocket(url);

    const onError = () => {
        console.error("websocket connect error");
    };

    const onMessage = (e) => {
        const calcState = e.data;
        setCalcState(calcState);
    };

    const onClose = () => {
        console.log("success websocket disconnect");
    };

    const onOpen = () => {
        console.log("success websocket connect");
        websocket.send("CONNECT");
    };

    const testWebSocket = (url) => {
        websocket.onopen = (e) => onOpen(e);
        websocket.onclose = (e) => onClose(e);
        websocket.onmessage = (e) => onMessage(e);
        websocket.onerror = (e) => onError(e);
    };
};

function App() {
    const [calcState, setCalcState] = useState({});
    initWebSocket();
    initPredictList(setCalcState);
    useEffect(async () => {
        const stockList = getLocalStorageItem("STOCK_LIST");
        await requestQueueInStocks(stockList);

        return () => console.log("gone");
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

const initPredictList = () => {
    if (localStorage.getItem("PREDICT_LIST") === null) {
        localStorage.setItem("PREDICT_LIST", JSON.stringify([]));
    }
};

const GlobalStyle = createGlobalStyle`
    body {
        display: block;
        background: #e4e4e4;
    }
`;

export default App;
