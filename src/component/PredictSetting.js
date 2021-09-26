import React, { useReducer, useState } from "react";
import styled from 'styled-components';
import { requestPredict } from '../lib/api';
import { getLocalStorageItem, setLocalStorageItem } from '../lib/util';

import icoPlus from '../static/asset/ico_plus.svg';
import icoMinus from '../static/asset/ico_minus.svg';
import aniLoading from '../static/asset/ani_loading.gif';

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

function PredictSetting(props) {
    const { name, values } = props;
    const [predictDate, dispatchPridictDate] = useReducer(predictDateReducer, 1);

    const onIncrease = () => {
        if (predictDate < 30) {
            dispatchPridictDate({ type: 'INCREASE' });
        }
    }
    const onDecrease = () => {
        if (predictDate > 1) {
            dispatchPridictDate({ type: 'DECREASE' });
        }
    }

    const onPredictBtn = async () => {
        const findPredictItemIdx = (predictList, targetName) => {
            return predictList.findIndex(predictItem => predictItem.name === targetName);
        }

        const getNextPredictList = predictItem => {
            const curPredictList = getLocalStorageItem('PREDICT_LIST');
            const i = findPredictItemIdx(curPredictList, name);
            const ret = i !== -1 ?
                curPredictList.fill(predictItem, i, i+1) :
                curPredictList.concat(predictItem);
            
            return ret;
        }

        const updatePredictList = predictItem => {
            const nextPredictList = getNextPredictList(predictItem);
            setLocalStorageItem('PREDICT_LIST', nextPredictList);
        }

        const getStartDayVals = () => {
            const { data } = values;
            let ret = {}
            Object.keys(data).forEach(dataType => {
                const todayIdx = Object.keys(data[dataType]).pop();
                const todayVal = data[dataType][todayIdx];

                ret = {
                    ...ret,
                    [dataType.toLowerCase()]: todayVal
                }
            });

            return ret;
        }

        const createPredictItem = (id, startDayVals) => {
            const date = new Date();
            return {
                id,
                name,
                predictDate,
                startDate: `${date.getMonth() + 1}월 ${date.getDate()}일`,
                startVals: startDayVals
            };
        }

        try {
            const res = await requestPredict(name, predictDate);
            const { id } = res.data;
            const startDayVals = getStartDayVals();
            const predictItem = createPredictItem(id, startDayVals);
            updatePredictList(predictItem);
        } catch(e) {
            console.error('네트워트 에러: ', e.message);
        }
    }

    return (
        <PredictSettingBlock>
            <DateSetting>
                <DecreaseBtn type="button" onClick={onDecrease}/>
                <DateInput type="text" value={predictDate}/>
                <span>일 뒤</span>
                <IncreaseBtn type="button" onClick={onIncrease}/>
            </DateSetting>
            <PredictBtn type="button" onClick={onPredictBtn}>예측 가치 계산하기</PredictBtn>
        </PredictSettingBlock>
    );
}

const PredictSettingBlock = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--bg-white);
    box-shadow: 0 4px 20px #33333333;
    padding: 16px 20px 18px;
`;

const DateSetting = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DecreaseBtn = styled.button`
    width: 42px;
    height: 42px;
    border-radius: 21px;
    background-color: var(--bg-gray);
    background-image: url(${icoMinus});
    background-position: center;
    background-repeat: no-repeat;
    margin-right: 44px;
`;

const IncreaseBtn = styled.button`
    width: 42px;
    height: 42px;
    border-radius: 21px;
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
    height: 58px;
    font-size: 14px;
    font-weight: 600;
    color: var(--white);
    background-color: var(--main);
    border-radius: 14px;
    margin-top: 16px;
`;

// const RequestingBtn = styled.button`
//     display: grid;
//     place-content: center;
//     width: 100%;
//     height: 58px;
//     background-color: var(--main);
//     background-image: url(${aniLoading});
//     background-repeat: no-repeat;
//     background-position: center center;
//     background-size: 84px 84px;
//     border-radius: 14px;
//     margin-top: 16px;
// `;

export default PredictSetting;