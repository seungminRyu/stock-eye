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
                <input className="search-input"></input>
                <ul className="search-result">
                    {searchResultList.map(item => (
                        <SearchResultItem name={item.name} code={item.code} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Search;