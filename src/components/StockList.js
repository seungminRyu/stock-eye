import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StockItem from './StockItem';

function StockList(props) {
    const { stockList } = props;

    return (
        <StockListBlock>
            <h2 className="section-title">주식 목록</h2>
            <ul className="stock-list">
                {stockList.map((stock, i) =>
                    <Link to={`/stock?name=${stock.name}&code=${stock.code}`} key={stock.code}>
                        <StockItem index={i} name={stock.name} code={stock.code} key={`item_${i}`}/>
                    </Link>
                )}
            </ul>
        </StockListBlock>
    );
}

const StockListBlock = styled.section`
    background-color: var(--bg-white);
    padding: 0 20px 80px;
    margin-top: 40px;
`;

export default StockList;