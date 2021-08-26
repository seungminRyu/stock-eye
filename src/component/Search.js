import React, { useState } from 'react';
import { useStockDispatch } from '../context/StockContext';
import SearchResultItem from './SearchResultItem';

function Search() {
    const initList = [
        {
            id: 2,
            name: "LG",
            code: "0020",
            processed: true,
        },
        {
            id: 3,
            name: "카카오",
            code: "0030",
            processed: true,
        },
        {
            id: 4,
            name: "네이버",
            code: "0040",
            processed: true,
        },
        {
            id: 5,
            name: "셀트리온",
            code: "0050",
            processed: true,
        },
        {
            id: 6,
            name: "카카오게임즈",
            code: "0060",
            processed: true,
        },
        {
            id: 7,
            name: "초코뮤직",
            code: "0070",
            processed: true,
        },
    ];
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
                            <SearchResultItem 
                                key={i}
                                stock={resultItem}
                            />
                        ))}
                    </ul>
                </div>
            </div>            
        </div>
    );
}

export default Search;