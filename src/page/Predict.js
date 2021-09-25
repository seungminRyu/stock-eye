import React from "react";
import AppTemplate from "../component/AppTemplate";
import useAsync from "../hook/useAsync";
import { fetchPredictData } from "../lib/api";
import { getLocalStorageItem, parseQueryString } from "../lib/util";

const getStockName = url => {
    const queryObj = parseQueryString(url);
    return decodeURIComponent(queryObj.name);
}

const getTargetPredictItem = name => {
    return getLocalStorageItem('PREDICT_LIST').filter(item => item.name === name)[0];
}

function Predict({ location }) {
    const name = getStockName(location.search);
    const { id, predictDate, startDate, startVals } = getTargetPredictItem(name);
    console.log(getTargetPredictItem(name));
    const [state, refetch] = useAsync({
        callback: fetchPredictData,
        params: [name, id]
    });
    const { data } = state;
    console.log(data);

    return (
        <AppTemplate>
            <h1>predict</h1>   
        </AppTemplate>
    );
}

export default Predict;