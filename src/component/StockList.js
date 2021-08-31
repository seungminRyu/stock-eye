import React from 'react';
import styled from 'styled-components';
import StockItem from './StockItem';

const StockListBlock = styled.div`
   background-color: rgb(200, 255, 237);
`;

function StockList(props) {
    const { stockList } = props;

    return (
        <StockListBlock>
            <ul className="user-stock-list">
                {stockList.map((stock, i) =>
                    <StockItem key={i} name={stock.name} id={stock.id} />    
                )}
            </ul>
        </StockListBlock>
    );
}

export default StockList;