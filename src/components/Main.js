import React from "react";
import styled from "styled-components";
import { useStockState } from "../context/StockContext";
import StockList from "./StockList";
import PredictList from "./PredictList";
import DashBoard from "./DashBoard";

function Main(props) {
    const { onSearchOpen, onManageOpen } = props;
    const stockList = useStockState();

    return (
        <MainBlock>
            <DashBoard
                onManageOpen={onManageOpen}
                onSearchOpen={onSearchOpen}
                stockList={stockList}
            />
            <PredictList />
            <StockList stockList={stockList} />
        </MainBlock>
    );
}

const MainBlock = styled.main`
    width: 100%;
    height: 100%;
    background-color: var(--bg-white);
    color: var(--font);
    z-index: 10;
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
    margin-top: 160px;

    .section-title {
        color: var(--black);
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 16px;
    }
`;

export default Main;
