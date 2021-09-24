import React from "react";
import styled from 'styled-components';

import icoSearch from '../static/asset/ico_search.svg';
import icoManage from '../static/asset/ico_manage.svg';

function DashBoard(props) {
    const {
        onSearchOpen,
        onManageOpen,
        stockList
    } = props;
    const stockNum = stockList.length;

    return (
        <DashBoardBlock>
            <h2 className="section-title">유승민 님의 Stock-eye</h2>
            <div className="dashboard-wrapper">
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
            </div>
        </DashBoardBlock>
    )
}

const DashBoardBlock = styled.section`
    padding: 40px 24px 0;

    .dashboard-wrapper {
        width: 100%;
        border-radius: 24px;
        background-color: var(--bg-gray);
        padding: 24px 24px 0;
    }
`;

const StockNum = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 15px;
    white-space: nowrap;
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

export default DashBoard;