import React from 'react';
import { useStockDispatch } from '../context/StockContext';

function SearchResultItem(props) {
    const { stock } = props;
    const dispatch = useStockDispatch();
    const onAdd = () => dispatch({ type: 'ADD', stock });

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