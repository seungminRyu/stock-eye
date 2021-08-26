import React from 'react';
import { useStockDispatch } from '../context/StockContext';

function SearchResultItem({stock}) {
    const { name, code, id } = stock;
    const dispatch = useStockDispatch();
    const isAdded = JSON.parse(localStorage.getItem('STOCK_LIST')).findIndex(stock => 
        stock.id === id
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
        <li className="search-result-item">
            <div className="stock-info">
                <span>{ code }</span>
                <p>{ name }</p>
            </div>
            <div className="stock-add-btn">
                { isAdded ?
                    <button className="exist-btn">추가 됨</button> :
                    <button className="add-btn" onClick={onAdd}>추가하기</button>
                }
            </div>
        </li>
    )
}

export default SearchResultItem;