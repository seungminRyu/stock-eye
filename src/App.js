import React, { useEffect } from 'react';
import styled from 'styled-components';
import { StockProvider } from './context/StockContext';
import Search from './component/Search';
import Manage from './component/Manage';
import UserStocks from './component/UserStocks';

const AppBlock = styled.div`

`;

function App() {
    useEffect(() => {
        if (localStorage.getItem('STOCK_LIST') === null) {
            const json = JSON.stringify([]);
            localStorage.setItem('STOCK_LIST', json);
        }
        return;
    });

    return (
        <StockProvider>
            <AppBlock>
                <header className="header">
                    <h1>home</h1>
                </header>
                <main className="body">
                    <UserStocks/>
                </main>
                <div className="modal">
                    <Manage/>
                    <Search/>
                </div>
            </AppBlock>
        </StockProvider>
    );
}

export default App;
