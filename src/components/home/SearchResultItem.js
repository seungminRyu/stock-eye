import React, { useState } from "react";
import styled from "styled-components";
import { useStockDispatch } from "../../context/StockContext";
import { getLocalStorageItem } from "../../lib/util";

function SearchResultItem({ stock }) {
    const { name, code } = stock;
    const dispatch = useStockDispatch();
    const [isAdded, setIsAdded] = useState(
        getLocalStorageItem("STOCK_LIST").findIndex(
            (stock) => stock.code === code
        ) === -1
            ? false
            : true
    );

    const onAdd = () => {
        const updateLocalStorage = () => {
            const nextStockList = JSON.parse(
                localStorage.getItem("STOCK_LIST")
            ).concat(stock);
            localStorage.setItem("STOCK_LIST", JSON.stringify(nextStockList));
        };

        const addStateItem = () => dispatch({ type: "ADD", stock });

        addStateItem();
        updateLocalStorage();
        setIsAdded(!isAdded);
    };

    return (
        <SearchResultItemBlock>
            <StockLabel>
                <span className="stock-code">{code}</span>
                <p className="stock-name">{name}</p>
            </StockLabel>
            {isAdded ? (
                <Added>추가 됨</Added>
            ) : (
                <AddButton onClick={onAdd}>추가하기</AddButton>
            )}
        </SearchResultItemBlock>
    );
}

const SearchResultItemBlock = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px var(--border);
    padding: 15px 0 16px;
`;

const StockLabel = styled.div`
    .stock-code {
        font-size: 12px;
        font-weight: 500;
        color: var(--gray);
    }

    .stock-name {
        font-size: 14px;
        font-weight: 500;
        color: var(--font);
        margin-top: 8px;
    }
`;

const AddButton = styled.button`
    display: grid;
    place-items: center;
    width: 68px;
    height: 36px;
    font-size: 12px;
    font-weight: 500;
    color: var(--white);
    background-color: var(--main);
    border-radius: 8px;
`;

const Added = styled.button`
    display: grid;
    place-items: center;
    width: 68px;
    height: 36px;
    font-size: 12px;
    font-weight: 500;
    color: var(--main);
    border: solid 1px var(--main);
    border-radius: 8px;
    cursor: unset;
`;

export default SearchResultItem;
