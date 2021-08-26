import React from 'react';
import Search from './component/Search';
import Manage from './component/Manage';
import { StockProvider, useStockState } from './context/StockContext';
import './App.css';

function App() {

    return (
        <StockProvider>
            <div className="app">
                <header className="app-header">
                    <h1>home</h1>
                </header>
                <div className="app-body">

                </div>
                <Manage />
                <Search />
            </div>
        </StockProvider>
    );
}

export default App;
