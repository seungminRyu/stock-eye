import React from 'react';
import styled from 'styled-components';
import { useStockState } from '../context/StockContext';
import StockList from './StockList';

const UserStocksBlock = styled.div`

`;

function UserStocks() {
    const stockList = useStockState();
    const stockNum = stockList.length;

    return (
        <UserStocksBlock>
            <div className="user-dash-board">
                <h3>
                    현재 관리중인 주식: {stockNum} 개
                </h3>
                <button>주식 추가</button>
                <button>내 주식 관리</button>
            </div>
            <div className="user-stock-list">
                <StockList stockList={stockList}></StockList>
            </div>
        </UserStocksBlock>
    )
}

export default UserStocks;