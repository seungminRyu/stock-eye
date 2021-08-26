import React from 'react';
import ManagedStockItem from './ManagedStockItem';
import { useStockState } from '../context/StockContext';

function Manage() {
    const managedStocklist = useStockState();
    
    return (
        <div className="manage">
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
                                name={stockItem.name}
                                code={stockItem.code}
                            />
                        )}
                    </ul>
                </div>
            </div>            
        </div>
    )
}

export default Manage;