import React, { useEffect } from 'react';
import styled from 'styled-components';
import { StockProvider } from './context/StockContext';
import Search from './component/Search';
import Manage from './component/Manage';
import UserStocks from './component/UserStocks';

const AppBlock = styled.div`
    .header {
        font-weight: bold;
    }
`;

function App() {
    return (
        <StockProvider>
            <AppBlock>
                <header className="header">
                    <h1>현재 내 주식의 예상 가치는</h1>
                    <h1>0원</h1>
                    <h1>입니다.</h1>
                </header>
                <UserStocks/>
                <div className="modal">
                    <Manage/>
                    <Search/>
                </div>
            </AppBlock>
        </StockProvider>
    );
}

export default App;
