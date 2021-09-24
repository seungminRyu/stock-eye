import React from "react";
import styled from "styled-components";
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
        <ManagedStockItemBlock>
            <StockLabel>
                <span className="stock-code">{ code }</span>
                <p className="stock-name">{ name }</p>
            </StockLabel>
            <DeleteButton onClick={onRemove}>
                삭제하기
            </DeleteButton>
        </ManagedStockItemBlock>
    )
}

const ManagedStockItemBlock = styled.li`
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
        font-size: 14px;
        font-weight: 600;
        color: var(--font);
        margin-top: 8px;
    }
`;

const DeleteButton = styled.button`
    font-size: 12px;
    font-weight: 600;
    color: var(--white);
    background-color: var(--red);
    border-radius: 8px;
    padding: 12px 12px 11px;
`;

export default ManagedStockItem;