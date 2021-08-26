import React from "react";
import { useStockDispatch } from "../context/StockContext";

function ManagedStockItem(props) {
    const { name, code, id } = props;
    const dispatch = useStockDispatch();
    const onRemove = () => dispatch({ type: 'REMOVE', id })

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