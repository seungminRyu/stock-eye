import React from 'react';
import Search from './component/Search';
import Manage from './component/Manage';
import { StockProvider } from './context/StockContext';
import './App.css';

function App() {
    return (
        <StockProvider>
            <div className="App">
                <header className="App-header">
                    <h1>home</h1>
                </header>
                <button>검색</button>
                <Manage />
                <Search />
            </div>
        </StockProvider>
    );
}

export default App;
