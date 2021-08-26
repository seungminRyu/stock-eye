import React from 'react';
import styled from 'styled-components';
import StockItem from './StockItem';

const StockListBlock = styled.ul`
   background-color: rgb(200, 255, 237);
`;

function StockList(props) {
    const { stockList } = props;

    return (
        <StockListBlock>
            {stockList.map(stock =>
                <StockItem name={stock.name} id={stock.id} />    
            )}
        </StockListBlock>
    );
}

export default StockList;