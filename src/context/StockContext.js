import React, { useReducer, createContext, useContext } from 'react';

function stockReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return state.concat(action.stock);
        case 'TOGGLE':
            return state.map(stock => 
                stock.id === action.code ? { ...stock, processed: !stock.processed } : stock
            );
        case 'REMOVE':
            return state.filter(stock => stock.code !== action.code);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);

    }
}

const StockStateContext = createContext();
const StockDispatchContext = createContext();

export function StockProvider({ children }) {
    let initialStockList;
    if (localStorage.getItem('STOCK_LIST') === null) {
        localStorage.setItem('STOCK_LIST', JSON.stringify([]));
        initialStockList = [];
    } else {
        initialStockList = JSON.parse(localStorage.getItem('STOCK_LIST'));
    }

    const [state, dispatch] = useReducer(stockReducer, initialStockList);
    
    return (
        <StockStateContext.Provider value={state}>
            <StockDispatchContext.Provider value={dispatch}>
                { children }
            </StockDispatchContext.Provider>
        </StockStateContext.Provider>
    );
}

export function useStockState() {
    const context = useContext(StockStateContext);
    if (!context) {
        throw new Error('Cannot find StockProvider')
    }
    return context;
}

export function useStockDispatch() {
    const context = useContext(StockDispatchContext);
    if (!context) {
        throw new Error('Cannot find StockProvider')
    }
    return context;
}