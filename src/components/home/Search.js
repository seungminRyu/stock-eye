import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import ModalTemplate from "../ModalTemplate";
import SearchResultItem from "./SearchResultItem";
import { debouncer } from "../../lib/util";

import icoClose from "../../static/asset/ico_close.svg";
import icoSearchInput from "../../static/asset/ico_search-input.svg";

function Search(props) {
    const { isSearchOpen, setIsSearchOpen } = props;
    const [searchResultList, setSearchResultList] = useState([]);
    const $input = useRef();

    const onSearchQuit = () => {
        const resetData = () => {
            $input.current.value = "";
            setSearchResultList([]);
        };

        const deactivateSearch = () => setIsSearchOpen(false);

        deactivateSearch();
        resetData();
    };

    const onKeyUp = (e) => {
        const requestSearch = async (e) => {
            const query = e.target.value;
            if (!query) return false;
            const url = `https://stock-mlp.com/graduation/search?name=${query}`;
            const respone = await axios.get(url);
            const ret = respone.data;

            return ret;
        };

        debouncer(300, async () => {
            const searchResultList = await requestSearch(e);

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
                        <QuitButton onClick={onSearchQuit} />
                    </div>
                </SearchHeader>
                <SearchBody>
                    <SearchInput
                        placeholder="주식명, 코드명을 입력하세요."
                        onKeyUp={onKeyUp}
                        ref={$input}
                    />
                    <SearchResult>
                        <ul className="search-result-list">
                            {searchResultList.map((resultItem, i) => (
                                <SearchResultItem key={i} stock={resultItem} />
                            ))}
                        </ul>
                    </SearchResult>
                </SearchBody>
            </ModalTemplate>
        </SearchBlock>
    );
}

const SearchBlock = styled.div`
    display: none;

    ${(props) =>
        props.isSearchOpen &&
        css`
            display: block;
        `}
`;

const SearchHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: ". title button";
    flex-shrink: 0;
    padding: 24px 0;

    .search-header__title {
        display: grid;
        place-content: center;
        grid-area: title;
        font-size: 14px;
        color: var(--font);
    }

    .search-header__quit-btn {
        grid-area: button;
        margin-left: auto;
    }
`;

const QuitButton = styled.button`
    width: 28px;
    height: 28px;
    border-radius: 14px;
    background-color: var(--light-gray);
    background-image: url(${icoClose});
    background-repeat: no-repeat;
    background-position: center;
`;

const SearchBody = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
`;

const SearchInput = styled.input`
    font-size: 14px;
    font-weight: 300;
    color: var(--black);
    border: none;
    border-radius: 8px;
    background-color: var(--light-gray);
    background-image: url(${icoSearchInput});
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-position: 8px center;
    padding: 12px 12px 12px 36px;
`;

const SearchResult = styled.div`
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 40px;
    margin-top: 28px;

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export default Search;
