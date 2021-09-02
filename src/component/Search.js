import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import ModalTemplate from './ModalTemplate';
import SearchResultItem from './SearchResultItem';
import { debouncer } from '../util/util';

const initList = [
    {
        name: "LG",
        code: "0020",
        processed: true,
    },
    {
        name: "카카오",
        code: "0030",
        processed: true,
    },
    {
        name: "네이버",
        code: "0040",
        processed: true,
    },
    {
        name: "셀트리온",
        code: "0050",
        processed: true,
    },
    {
        name: "카카오게임즈",
        code: "0060",
        processed: true,
    },
    {
        name: "초코뮤직",
        code: "0070",
        processed: true,
    },
];

const SearchBlock = styled.div`
    display: none;

    ${props =>
        props.isSearchOpen &&
        css`
            display: block;
        `
    }
`;

function Search(props) {
    const { isSearchOpen, onSearchQuit } = props;
    const [searchResultList, setSearchResultList] = useState(initList);

    const onKeyUp = (e) => {
        const requestSearch = async (e) => {
            const qeury = e.target.value;
            // const url = `https://stock-mlp.com/graduation/search?name=${qeury}`;
            const url = 'https://dd4e85e7-9286-4729-93bf-0bcae7acd922.mock.pstmn.io/stock/';
            const respone = await axios.get(url);
            const ret = respone.data;
            return ret;
        }

        debouncer(300, async () => await requestSearch(e));
    };

    return (
        <SearchBlock isSearchOpen={isSearchOpen}>
            <ModalTemplate>
                <div className="search-header">
                    <div className="search-header__title">
                        <h1>주식 추가</h1>
                    </div>
                    <div className="search-header__quit-btn">
                        <button className="quit-btn" onClick={onSearchQuit}>닫기</button>
                    </div>
                </div>
                <div className="search-body">
                <input className="search-input" onKeyUp={onKeyUp}></input>
                    <ul className="search-result">
                        {searchResultList.map((resultItem, i) => (
                            <SearchResultItem 
                                key={i}
                                stock={resultItem}
                            />
                        ))}
                    </ul>
                </div>
            </ModalTemplate>    
        </SearchBlock>
    );
}

export default Search;