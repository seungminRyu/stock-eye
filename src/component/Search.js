import React, { useState } from 'react';
import SearchResultItem from './SearchResultItem';

function Search() {
    const initList = [
        {
            name: "삼성전자",
            code: "0001"
        },
        {
            name: "LG",
            code: "0002"
        },
        {
            name: "카카오",
            code: "0003"
        },
        {
            name: "네이버",
            code: "0004"
        },
        {
            name: "셀트리온",
            code: "0005"
        },
        {
            name: "카카오게임즈",
            code: "0006"
        },
        {
            name: "초코뮤직",
            code: "0007"
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
                        {searchResultList.map(resultItem => (
                            <SearchResultItem name={resultItem.name} code={resultItem.code} />
                        ))}
                    </ul>
                </div>
            </div>            
        </div>
    );
}

export default Search;