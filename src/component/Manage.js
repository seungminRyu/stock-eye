import React from 'react';
import ManagedStockItem from './ManagedStockItem';
import { useStockState } from '../context/StockContext';
import styled from 'styled-components';

const ManageBlock = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: calc(100% - 260px);
    background-color: #becfff;
`;

function Manage() {
    const managedStocklist = useStockState();
    
    return (
        <ManageBlock>
            <div className="manage-wrapper">
                <div className="manage-header">
                    <div className="manage-header__title">
                        <h1>내 주식 관리</h1>
                    </div>
                    <div className="manage-header__quit-btn">
                        <button className="quit-btn"></button>
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
            </div>
        </ManageBlock>
    )
}

export default Manage;