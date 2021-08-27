import React, { useEffect } from 'react';
import styled from 'styled-components';
import { StockProvider } from './context/StockContext';
import Search from './component/Search';
import Manage from './component/Manage';
import UserStocks from './component/UserStocks';
import Header from './component/Header';

const AppBlock = styled.div`
    .header {
        font-weight: bold;
    }
`;

function App() {
    return (
        <StockProvider>
            <AppBlock>
                <Header/>
                <UserStocks/>
                <Manage/>
                <Search/>
            </AppBlock>
        </StockProvider>
    );
}

export default App;
