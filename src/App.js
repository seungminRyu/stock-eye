import React from 'react';
import styled from 'styled-components';
import { StockProvider } from './context/StockContext';
import Search from './component/Search';
import Manage from './component/Manage';
import UserStocks from './component/UserStocks';

const AppBlock = styled.div`

`;

function App() {
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
