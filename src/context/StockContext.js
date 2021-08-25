import React, { useReducer, createContext, useContext } from 'react';

const initialStockList = [
    {
        id: 1,
        name: "삼성전자",
        code: "0001",
        processed: true,
    },
    {
        id: 2,
        name: "LG",
        code: "0002",
        processed: true,
    },
    {
        id: 3,
        name: "카카오",
        code: "0003",
        processed: true,
    },
    {
        id: 4,
        name: "네이버",
        code: "0004",
        processed: true,
    },
    {
        id: 5,
        name: "셀트리온",
        code: "0005",
        processed: true,
    },
    {
        id: 6,
        name: "카카오게임즈",
        code: "0006",
        processed: true,
    },
    {
        id: 7,
        name: "초코뮤직",
        code: "0007",
        processed: true,
    },
]

function stockReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
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

export function StockProvider({ children }) {
    const [state, dispatch] = useReducer(stockReducer, initialStockList);
    return (
        <StockStateContext.Provider value={state}>
            <StockDispatchContext.Provider value={dispatch}>
                {children}
            </StockDispatchContext.Provider>
        </StockStateContext.Provider>
    );
}

export function useStockState() {
    return useContext(StockStateContext);
}

export function useStockDispatch() {
    return useContext(StockDispatchContext);
}