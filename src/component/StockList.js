import React from 'react';
import styled from 'styled-components';
import { useStockState } from '../context/StockContext';
import StockItem from './StockItem';

const StockListBlock = styled.div`
   background-color: rgb(200, 255, 237);
`;

function StockList() {
    const stockList = useStockState();

    return (
        <StockListBlock>

            <ul className="stock-list">
                {stockList.map(stock =>
                    <StockItem name={stock.name} id={stock.id} />    
                )}
            </ul>
        </StockListBlock>
    );
}

export default StockList;