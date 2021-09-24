import React, { useState, useReducer } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useAsync from '../hook/useAsync';
import { getLocalStorageItem, parseQueryString, setLocalStorageItem } from '../lib/util';
import { fetchChartData, requestPredict } from '../lib/api';
import AppTemplate from '../component/AppTemplate';
import Chart from '../component/Chart';

import icoPlus from '../static/asset/ico_plus.svg';
import icoMinus from '../static/asset/ico_minus.svg';
import icoBack from '../static/asset/ico_back.svg';

function Stock({ location }) {
    const getStockInfo = () => {
        const queryObj = parseQueryString(location.search);
        const name = decodeURIComponent(queryObj.name);
        const code = decodeURIComponent(queryObj.code);
        return { name, code };
    }

    const { name, code } = getStockInfo();
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
            <Header>
                <Link to="/">
                    <BackBtn/>
                </Link>
                <p className="stock-code">{code}</p>
                <h1 className="stock-name">{name}</h1>
            </Header>
            {/* {loading ? <p>로딩</p> : <p>로딩 끝</p>} */}
            {/* <Chart name={name} data={c} /> */}
            <PredictSetting>
                <DateSetting>
                    <DecreaseBtn type="button" onClick={onDecrease}/>
                    <DateInput type="text" value={predictDate}/>
                    <span>일 뒤</span>
                    <IncreaseBtn type="button" onClick={onIncrease}/>
                </DateSetting>
                <PredictBtn type="button" onClick={onRequestPredict}>예측 가치 계산하기</PredictBtn>
            </PredictSetting>
        </AppTemplate>
    );
}

const Header = styled.header`
    padding: 0 24px;

    .stock-code {
        font-size: 16px;
        font-weight: 600;
        color: var(--gray);
        margin-top: 24px;
        margin-left: 18px;
    }

    .stock-name {
        font-size: 22px;
        font-weight: 600;
        color: var(--font);
        margin-top: 12px;
        margin-left: 18px;
    }
`;

const BackBtn = styled.button`
    width: 24px;
    height: 24px;
    background-image: url(${icoBack});
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 30px;
`;

const PredictSetting = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 134px;
    background-color: var(--white);
    box-shadow: 0 0 6px #33333333;
    padding: 16px 24px 18px;
`;

const DateSetting = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DecreaseBtn = styled.button`
    width: 48px;
    height: 34px;
    border-radius: 6px;
    background-color: var(--bg-gray);
    background-image: url(${icoMinus});
    background-position: center;
    background-repeat: no-repeat;
    margin-right: 44px;
`;

const IncreaseBtn = styled.button`
    width: 48px;
    height: 34px;
    border-radius: 6px;
    background-color: var(--bg-gray);
    background-image: url(${icoPlus});
    background-position: center;
    background-repeat: no-repeat;
    margin-left: 44px;
`;

const DateInput = styled.input`
    width: 32px;
    height: 30px;
    background-color: var(--bg-gray);
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    color: var(--font);
    border: none;
    border-radius: 6px;
    margin-right: 4px
`;

const PredictBtn = styled.button`
    display: grid;
    place-content: center;
    width: 100%;
    height: 52px;
    font-size: 14px;
    font-weight: 600;
    color: var(--white);
    background-color: var(--main);
    border-radius: 14px;
    margin-top: 16px;
`;

export default Stock;