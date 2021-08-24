import React from 'react';
import ManagedStockItem from './ManagedStockItem';

function Manage() {
    const managedStocklist = [
        {
            name: "삼성전자",
            code: "0001"
        },
        {
            name: "LG",
            code: "0002"
        },
        {
            name: "카카오",
            code: "0003"
        },
        {
            name: "네이버",
            code: "0004"
        },
        {
            name: "셀트리온",
            code: "0005"
        },
        {
            name: "카카오게임즈",
            code: "0006"
        },
        {
            name: "초코뮤직",
            code: "0007"
        },
    ]

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
                        {managedStocklist.map(stockItem => <ManagedStockItem name={stockItem.name} code={stockItem.code} />)}
                    </ul>
                </div>
            </div>            
        </div>
    )
}

export default Manage;