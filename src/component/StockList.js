import React from 'react';
import styled from 'styled-components';
import { useStockState } from '../context/StockContext';

const StockListBlock = styled.div`
   background-color: rgb(200, 255, 237);
`;

function StockList() {
    const stockList = useStockState();

    return (
        <StockListBlock>
            <ul className="stock-list">
                {stockList.map(stock =>
                    <li className="stock-list-item">{stock.name}</li>    
                )}
            </ul>
        </StockListBlock>
    );
}

export default StockList;