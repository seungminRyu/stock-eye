import { useReducer, useEffect } from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                loading: true,
                data: null,
                error: null,
            };
        case "SUCCESS":
            return {
                loading: false,
                data: action.data,
                error: null,
            };
        case "ERROR":
            return {
                loading: false,
                data: null,
                error: action.error,
            };
        default:
            throw new Error(`[useAsync] Unhandled action type: ${action.type}`);
    }
};

function useAsync({ callback, params = [] }, deps = []) {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: false,
    });

    const fetchData = async () => {
        dispatch({ type: "LOADING" });
        try {
            const respone = await callback(...params);
            dispatch({ type: "SUCCESS", data: respone });
        } catch (err) {
            console.error(err.massage);
            dispatch({ type: "ERROR", error: err });
        }
    };

    useEffect(() => {
        fetchData();
    }, deps);

    return [state, fetchData];
}

export default useAsync;
