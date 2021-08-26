import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialStockList = [
    {
        id: 1,
        name: "삼성전자",
        code: "0010",
        processed: true,
    },
];

function stockReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return state.concat(action.stock);
        case 'TOGGLE':
            return state.map(stock => 
                stock.id === action.id ? { ...stock, processed: !stock.processed } : stock
            );
        case 'REMOVE':
            return state.filter(stock => stock.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);

    }
}

const StockStateContext = createContext();
const StockDispatchContext = createContext();
const StockNextIdContext = createContext();

export function StockProvider({ children }) {
    const [state, dispatch] = useReducer(stockReducer, initialStockList);
    const initialId = initialStockList.length + 1;
    const nextId = useRef(initialId);
    
    return (
        <StockStateContext.Provider value={state}>
            <StockDispatchContext.Provider value={dispatch}>
                <StockNextIdContext.Provider value={nextId}>
                    {children}
                </StockNextIdContext.Provider>
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

export function useStockNextId() {
    const context = useContext(StockNextIdContext);
    if (!context) {
        throw new Error('Cannot find StockProvider')
    }
    return context;
}
