import React, { useState } from 'react';
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
    const [isManageOpen, setIsManageOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const onManageOpen = () => {
        const activateManage = () => setIsManageOpen(true);
        activateManage();
    }

    const onManageQuit = () => {
        const deactivateManage = () => setIsManageOpen(false);
        deactivateManage();
    }

    const onSearchOpen = () => {
        const activateSearch = () => setIsSearchOpen(true);
        activateSearch();
    }

    return (
        <StockProvider>
            <GlobalStyle/>
            <AppTemplate>
                <Header/>
                <UserStocks
                    onManageOpen={onManageOpen}
                    onSearchOpen={onSearchOpen}
                />
                <Manage
                    isManageOpen={isManageOpen}
                    onManageQuit={onManageQuit}
                />
                <Search
                    isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
                />
            </AppTemplate>
        </StockProvider>
    );
}

export default App;
