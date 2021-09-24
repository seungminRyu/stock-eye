import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StockItem from './StockItem';

function StockList(props) {
    const { stockList } = props;

    return (
        <StockListBlock>
            <h2 className="section-title">주식 목록</h2>
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

const StockListBlock = styled.div`
    background-color: var(--bg-white);
    padding: 0 24px 80px;
    margin-top: 40px;
`;

export default StockList;