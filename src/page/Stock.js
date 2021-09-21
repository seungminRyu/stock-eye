import React from 'react';
import useAsync from '../hook/useAsync';
import { parseQueryString } from '../lib/util';
import { fetchChartData } from '../lib/api';
import AppTemplate from '../component/AppTemplate';
import Chart from '../component/Chart';

function Stock({ location }) {
    const getStockName = () => {
        const queryObj = parseQueryString(location.search);
        const ret = decodeURIComponent(queryObj.name)
        return ret;
    }

    const name = getStockName();
    const [state, refetch] = useAsync({
        callback: fetchChartData,
        params: [name]
    })
    
    console.log("stock name: ", name)
    const { loading, data: data, error } = state;
    console.log("state: ", state);

    return (
        <AppTemplate>
            <h1>{name}</h1>
            {loading ? <p>로딩</p> : <p>로딩 끝</p>}
            <Chart name={name} />
        </AppTemplate>
    );
}

export default Stock;
