import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StockItem from './StockItem';

const StockListBlock = styled.div``;

function StockList(props) {
    const { stockList } = props;

    return (
        <StockListBlock>
            <ul className="user-stock-list">
                {stockList.map((stock, i) =>
                    <Link to={`/stock?name=${stock.name}`} key={stock.code}>
                        <StockItem index={i} name={stock.name} code={stock.code} key={`item_${i}`}/>
                    </Link>
                )}
            </ul>
        </StockListBlock>
    );
}

export default StockList;