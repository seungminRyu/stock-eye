import React from "react";
import { useStockDispatch } from "../context/StockContext";

function ManagedStockItem({ stock }) {
    const { name, code } = stock;
    const dispatch = useStockDispatch();

    const onRemove = () => {
        const updateLocalStorage = () => {
            const currentStockList = JSON.parse(localStorage.getItem('STOCK_LIST'));
            const nextStockList = currentStockList.filter(stock => stock.code !== code);
            localStorage.setItem('STOCK_LIST', JSON.stringify(nextStockList));
        }

        const removeStateItem = () => dispatch({ type: 'REMOVE', code });
        
        removeStateItem();
        updateLocalStorage();
    }

    return (
        <li className="managed-stock-item">
            <div className="stock-info">
                <span>{ code }</span>
                <p>{ name }</p>
            </div>
            <div className="stock-delete-button">
                <button className="delete-button" onClick={onRemove}>
                    삭제하기
                </button>
            </div>
        </li>
    )
}

export default ManagedStockItem;