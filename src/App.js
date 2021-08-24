import React from 'react';
import Search from './component/Search';
import Manage from './component/Manage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>home</h1>
      </header>
      <button>검색</button>
      <Manage />
    </div>
  );
}

export default App;
