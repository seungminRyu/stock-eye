import React from 'react';
import { useStockState } from '../context/StockContext';
import styled, { css } from 'styled-components';
import ModalTemplate from './ModalTemplate';
import ManagedStockItem from './ManagedStockItem';


const ManageBlock = styled.div`
    display: none;

    ${props =>
        props.isManageOpen &&
        css`
            display: block;
        `
    }
`;

function Manage(props) {
    const {
        isManageOpen,
        onManageQuit
    } = props;
    const managedStocklist = useStockState();
    
    return (
        <ManageBlock isManageOpen={isManageOpen}>
            <ModalTemplate>
                <div className="manage-header">
                    <div className="manage-header__title">
                        <h1>내 주식 관리</h1>
                    </div>
                    <div className="manage-header__quit-btn">
                        <button className="quit-btn" onClick={onManageQuit}>닫기</button>
                    </div>
                </div>
                <div className="manage-body">
                    <ul className="managed-stock-list">
                        {managedStocklist.map((stockItem, i) => 
                            <ManagedStockItem 
                                key={i}
                                stock={stockItem}
                            />
                        )}
                    </ul>
                </div>
            </ModalTemplate>
        </ManageBlock>
    )
}

export default Manage;