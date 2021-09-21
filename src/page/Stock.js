import React, { useState } from 'react';
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
    });
    const [chartData, setChartData] = useState(null);

    // open, high, low, close
    const parseData = (data) => {
        const { data: values } = data;
        const xValList = Object.keys(values.Open);
        const _data = xValList.map(xVal => {
            // console.log(xVal)
            return {
                x: xVal,
                y: [parseInt(values.Open[xVal]), parseInt(values.High[xVal]), parseInt(values.Low[xVal]), parseInt(values.Close[xVal])]
            }
        });

        const ret = [{
            name: 'candle',
            data: _data.slice(0, 60)
        }];

        return ret;
    }
    
    console.log("stock name: ", name)
    const { loading, data, error } = state;
    console.log("state: ", state);
    let c;
    if (data) {
        c = parseData(data);
        console.log(c);
        // setChartData(chartData);
    }

    return (
        <AppTemplate>
            <h1>{name}</h1>
            {loading ? <p>로딩</p> : <p>로딩 끝</p>}
            <Chart name={name} data={c} />
        </AppTemplate>
    );
}

export default Stock;
