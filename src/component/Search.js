import React, { useState } from 'react';
import { useStockDispatch } from '../context/StockContext';
import SearchResultItem from './SearchResultItem';

function Search() {
    const initList = [
        {
            id: 1,
            name: "새주식1",
            code: "0011",
            processed: true,
        },
        {
            id: 2,
            name: "새주식2",
            code: "0022",
            processed: true,
        },
        {
            id: 3,
            name: "새주식3",
            code: "0033",
            processed: true,
        },
        {
            id: 4,
            name: "새주식4",
            code: "0044",
            processed: true,
        },
    ]
    const [searchResultList, setSearchResultList] = useState(initList);
    
    return (
        <div className="search">
            <div className="search-wrapper">
                <div className="search-header">
                    <div className="search-header__title">
                        <h1>주식 추가</h1>
                    </div>
                    <div className="search-header__quit-btn">
                        <button className="quit-btn"></button>
                    </div>
                </div>
                <div className="search-body">
                <input className="search-input"></input>
                    <ul className="search-result">
                        {searchResultList.map((resultItem, i) => (
                            <SearchResultItem key={i} name={resultItem.name} code={resultItem.code} />
                        ))}
                    </ul>
                </div>
            </div>            
        </div>
    );
}

export default Search;