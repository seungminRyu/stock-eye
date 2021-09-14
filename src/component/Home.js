import React, { useState } from 'react';
import Search from './Search';
import Manage from './Manage';
import UserStocks from './UserStocks';
import Header from './Header';
import AppTemplate from './AppTemplate';

function Home() {
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
    );
}

export default Home;