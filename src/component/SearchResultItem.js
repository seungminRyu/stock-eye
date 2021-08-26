import React from 'react';
import { useStockDispatch } from '../context/StockContext';

function SearchResultItem(props) {
    const { stock } = props;
    const dispatch = useStockDispatch();
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
        <li className="search-result-item">
            <div className="stock-info">
                <span>{ stock.code }</span>
                <p>{ stock.name }</p>
            </div>
            <div className="stock-add-button">
                <button className="add-button" onClick={onAdd}>
                    추가하기
                </button>
            </div>
        </li>
    )
}

export default SearchResultItem;