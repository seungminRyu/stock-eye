import React from 'react';
import Search from './component/Search';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>home</h1>
      </header>
      <button>검색</button>
      <Search />
    </div>
  );
}

export default App;
