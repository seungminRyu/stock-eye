import React from "react";
import { useStockState } from "../../context/StockContext";
import styled, { css } from "styled-components";
import ModalTemplate from "../common/ModalTemplate";
import ManagedStockItem from "./ManagedStockItem";

import icoClose from "../../static/asset/ico_close.svg";

function Manage(props) {
    const { isManageOpen, setIsManageOpen } = props;
    const managedStocklist = useStockState();

    const onQuitBtnClick = () => setIsManageOpen(false);

    return (
        <ManageBlock isManageOpen={isManageOpen}>
            <ModalTemplate>
                <ManageHeader>
                    <div className="manage-header__title">
                        <h1>주식 관리</h1>
                    </div>
                    <div className="manage-header__quit-btn">
                        <QuitButton onClick={onQuitBtnClick} />
                    </div>
                </ManageHeader>
                <ManageBody>
                    <ul className="managed-stock-list">
                        {managedStocklist.map((stockItem, i) => (
                            <ManagedStockItem key={i} stock={stockItem} />
                        ))}
                    </ul>
                </ManageBody>
            </ModalTemplate>
        </ManageBlock>
    );
}

const ManageBlock = styled.div`
    display: none;

    ${(props) =>
        props.isManageOpen &&
        css`
            display: block;
        `}
`;

const ManageHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: ". title button";
    flex-shrink: 0;
    padding: 24px 0;

    .manage-header__title {
        display: grid;
        place-content: center;
        grid-area: title;
        font-size: 14px;
        color: var(--font);
    }

    .manage-header__quit-btn {
        grid-area: button;
        margin-left: auto;
    }
`;

const QuitButton = styled.button`
    width: 28px;
    height: 28px;
    border-radius: 14px;
    background-color: var(--light-gray);
    background-image: url(${icoClose});
    background-repeat: no-repeat;
    background-position: center;
`;

const ManageBody = styled.div`
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 40px;

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export default Manage;
