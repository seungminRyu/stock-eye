import React from 'react';
import styled from 'styled-components';

const StockItemBlock = styled.li`

`;

function StockItem(props) {
    const { name, id } = props

    return (
        <StockItemBlock>
            <div className="stock-info">
                <p>{ name } <span>좋음</span></p>
            </div>
            <div className="stock-value-data">
                <p>종가 1일 뒤 2일 뒤 MSE</p>
            </div>
        </StockItemBlock>
    );
}

export default StockItem;