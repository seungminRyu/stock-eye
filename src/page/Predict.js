import React from "react";
import AppTemplate from "../component/AppTemplate";
import useAsync from "../hook/useAsync";
import { fetchPredictData } from "../lib/api";
import { getLocalStorageItem, parseQueryString } from "../lib/util";

function Predict({ location }) {
    const queryObj = parseQueryString(location.search);
    const name = decodeURIComponent(queryObj.name);
    console.log(name);
    const { id } = getLocalStorageItem('PREDICT_LIST').filter(item => item.name === name)[0];
    console.log(id )
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