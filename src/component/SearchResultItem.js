import React from 'react';
import styled from 'styled-components';
import { useStockDispatch } from '../context/StockContext';

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
        font-weight: 600;
        color: var(--gray);
    }

    .stock-name {
        font-size: 16px;
        font-weight: 600;
        color: var(--font);
        margin-top: 4px;
    }
`;

const AddButton = styled.button`
    font-size: 12px;
    font-weight: 600;
    color: var(--white);
    background-color: var(--main);
    border-radius: 8px;
    padding: 12px;
`;

function SearchResultItem({stock}) {
    const { name, code } = stock;
    const dispatch = useStockDispatch();

    const isAdded = JSON.parse(localStorage.getItem('STOCK_LIST')).findIndex(stock => 
        stock.code === code
    ) === -1 ? false : true;

    const onAdd = () => {
        const updateLocalStorage = () => {
            const nextStockList = JSON.parse(localStorage.getItem('STOCK_LIST')).concat(stock);
            localStorage.setItem('STOCK_LIST', JSON.stringify(nextStockList));
        }

        const addStateItem = () => dispatch({ type: 'ADD', stock });
        
        addStateItem();
        updateLocalStorage();
    };

    return (
        <SearchResultItemBlock>
            <StockLabel>
                <span className="stock-code">{ code }</span>
                <p className="stock-name">{ name }</p>
            </StockLabel>
            { isAdded ?
                <button className="exist-btn">추가 됨</button> :
                <AddButton onClick={onAdd}>추가하기</AddButton>
            }
        </SearchResultItemBlock>
    )
}

export default SearchResultItem;