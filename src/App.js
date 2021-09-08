import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route } from 'react-router';
import { StockProvider } from './context/StockContext';
import Home from './component/Home';
import Stock from './component/Stock';

const GlobalStyle = createGlobalStyle`
    body {
        display: block;
        background: #e4e4e4;
    }
`;

function App() {
    return (
        <StockProvider>
            <GlobalStyle/>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/stock" component={Stock}/>
        </StockProvider>
    );
}

export default App;
