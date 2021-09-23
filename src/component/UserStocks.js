import React from 'react';
import styled from 'styled-components';
import { useStockState } from '../context/StockContext';
import StockList from './StockList';
import PredictList from './PredictList';

import icoSearch from '../static/asset/ico_search.svg';
import icoManage from '../static/asset/ico_manage.svg';

function UserStocks(props) {
    const {
        onSearchOpen,
        onManageOpen
    } = props;
    const stockList = useStockState();
    const stockNum = stockList.length;

    return (
        <UserStocksBlock>
            <UserDashBoard>
                <h2 className="section-title">유승민 님의 Stock-eye</h2>
                <DashBoardBody>
                    <StockNum>
                        <p>현재 관리중인 주식:</p>
                        <p className="num-text">{stockNum} 개</p>
                    </StockNum>
                    <Menu>
                        <MenuButton className="search-btn" onClick={onSearchOpen}>
                            <span>주식추가</span>
                        </MenuButton>
                        <div className="split-bar"></div>
                        <MenuButton className="manage-btn" onClick={onManageOpen}>
                            <span>내 주식관리</span>
                        </MenuButton>
                    </Menu>
                </DashBoardBody>
            </UserDashBoard>
            <PredictList/>
            <UserStockList>
                <h2 className="section-title">주식 목록</h2>
                <StockList stockList={stockList}/>
            </UserStockList>
        </UserStocksBlock>
    )
}

const UserStocksBlock = styled.main`
    width: 100%;
    height: 100%;
    background-color: var(--bg-white);
    color: var(--font);
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;

    .section-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
    }
    
`;

const UserDashBoard = styled.div`
    padding: 40px 24px 0;
`;

const DashBoardBody = styled.div`
    width: 100%;
    border-radius: 24px;
    background-color: var(--bg-gray);
    padding: 24px 24px 0;
`;

const StockNum = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 15px;
    border-bottom: solid 1px var(--border);
    padding-bottom: 20px;

    .num-text {
        font-size: 16px;
        font-weight: 600;
        text-align: end;
    }
`;

const Menu = styled.div`
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    place-content: center;

    .split-bar {
        width: 1px;
        height: 10px;
        margin-top: 23px;
        background-color: var(--border);
    }
`;

const MenuButton = styled.button`
    width: 100%;
    height: 100%;
    font-size: 15px;
    padding: 20px 0 24px;

    & span {
        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-position: 0 center;
        padding-left: 24px;
    }

    &.search-btn span {
        background-image: url(${icoSearch});
    }

    &.manage-btn span {
        background-image: url(${icoManage});
    }
`;

const UserStockList = styled.div`
    background-color: var(--bg-white);
    padding: 0 24px 80px;
    margin-top: 40px;
`;

export default UserStocks;