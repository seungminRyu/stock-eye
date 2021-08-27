import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { StockProvider } from './context/StockContext';
import Search from './component/Search';
import Manage from './component/Manage';
import UserStocks from './component/UserStocks';
import Header from './component/Header';
import AppTemplate from './component/AppTemplate';

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
            <AppTemplate>
                <Header/>
                <UserStocks/>
                <Manage/>
                <Search/>
            </AppTemplate>
        </StockProvider>
    );
}

export default App;
