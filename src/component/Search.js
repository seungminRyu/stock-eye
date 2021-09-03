import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import ModalTemplate from './ModalTemplate';
import SearchResultItem from './SearchResultItem';
import { debouncer } from '../util/util';

// const initList = [
//     {
//         name: "LG",
//         code: "0020",
//         processed: true,
//     },
//     {
//         name: "카카오",
//         code: "0030",
//         processed: true,
//     },
//     {
//         name: "네이버",
//         code: "0040",
//         processed: true,
//     },
//     {
//         name: "셀트리온",
//         code: "0050",
//         processed: true,
//     },
//     {
//         name: "카카오게임즈",
//         code: "0060",
//         processed: true,
//     },
//     {
//         name: "초코뮤직",
//         code: "0070",
//         processed: true,
//     },
// ];
const SearchBlock = styled.div`
    display: none;

    ${props =>
        props.isSearchOpen &&
        css`
            display: block;
        `
    }
`;

const SearchHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
        ". title button";
    flex-shrink: 0;

    .search-header__title {
        grid-area: title;
    }

    .search-header__quit-btn {
        grid-area: button;
    }
`;


const SearchBody = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
`;

const SearchResult = styled.div`
    height: 100%;
    overflow-y: scroll;
`;

function Search(props) {
    const { isSearchOpen, onSearchQuit } = props;
    const [searchResultList, setSearchResultList] = useState([]);

    const onKeyUp = (e) => {
        const requestSearch = async (e) => {
            const query = e.target.value;
            if (!query) return false;
            const url = `https://stock-mlp.com/graduation/search?name=${query}`;
            const respone = await axios.get(url);
            const ret = respone.data;
            
            return ret;
        }

        debouncer(300, async () => {
            const searchResultList =  await requestSearch(e);
            
            if (searchResultList) {
                setSearchResultList(searchResultList);
            }
        });
    };

    return (
        <SearchBlock isSearchOpen={isSearchOpen}>
            <ModalTemplate>
                <SearchHeader>
                    <div className="search-header__title">
                        <h1>주식 추가</h1>
                    </div>
                    <div className="search-header__quit-btn">
                        <button className="quit-btn" onClick={onSearchQuit}>닫기</button>
                    </div>
                </SearchHeader>
                <SearchBody>
                    <input className="search-input" onKeyUp={onKeyUp}></input>
                    <SearchResult>
                        <ul className="search-result-list">
                            {searchResultList.map((resultItem, i) => (
                                <SearchResultItem 
                                    key={i}
                                    stock={resultItem}
                                />
                            ))}
                        </ul>
                    </SearchResult>
                </SearchBody>
            </ModalTemplate>    
        </SearchBlock>
    );
}

export default Search;