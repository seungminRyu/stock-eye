import React, { useState, useReducer } from 'react';
import useAsync from '../hook/useAsync';
import { getLocalStorageItem, parseQueryString, setLocalStorageItem } from '../lib/util';
import { fetchChartData, requestPredict } from '../lib/api';
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


    // dfdfdfd
    const predictDateReducer = (state, action) => {
        switch (action.type) {
            case 'INCREASE':
                return state + 1;
            case 'DECREASE':
                return state - 1;
            default:
                throw new Error(`[Stock] Unhandled action type: ${action.type}`);
        }
    }

    const [predictDate, dispatchPridictDate] = useReducer(predictDateReducer, 1);
    const onIncrease = () => {
        if (predictDate < 10) {
            dispatchPridictDate({ type: 'INCREASE' });
        }
    }
    const onDecrease = () => {
        if (predictDate > 1) {
            dispatchPridictDate({ type: 'DECREASE' });
        }
    }
    const onRequestPredict = async () => {
        const findPredictItemIdx = (predictList, targetName) => {
            return predictList.findIndex(predictItem => predictItem.name === targetName);
        }

        const createPredictItem = (id, name, predictDate) => {
            const date = new Date();
            return {
                id,
                name,
                predictDate,
                startDate: `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
            };
        }

        const getNextPredictList = (predictItem) => {
            const curPredictList = getLocalStorageItem('PREDICT_LIST');
            const i = findPredictItemIdx(curPredictList, name);
            const ret = i !== -1 ?
                curPredictList.fill(predictItem, i, i+1) :
                curPredictList.concat(predictItem);
            
            return ret;
        }

        const updatePredictList = id => {
            const predictItem = createPredictItem(id, name, predictDate);
            const nextPredictList = getNextPredictList(predictItem);
            setLocalStorageItem('PREDICT_LIST', nextPredictList);
        }

        try {
            const res = await requestPredict(name, predictDate);
            const { id } = res.data;
            updatePredictList(id);
        } catch(e) {
            console.error('네트워트 에러: ', e.message);
        }
    }

    return (
        <AppTemplate>
            <h1>{name}</h1>
            {loading ? <p>로딩</p> : <p>로딩 끝</p>}
            <Chart name={name} data={c} />
            <div>
                <button type="button" onClick={onDecrease}>-</button>
                <input type="text" value={predictDate}></input>
                <button type="button" onClick={onIncrease}>+</button>
                <button type="button" onClick={onRequestPredict}>예측 가치 계산하기</button>
            </div>
        </AppTemplate>
    );
}

export default Stock;
