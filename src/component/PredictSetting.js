import React, { useReducer } from "react";
import styled from 'styled-components';
import { requestPredict } from '../lib/api';
import { getLocalStorageItem, setLocalStorageItem } from '../lib/util';

import icoPlus from '../static/asset/ico_plus.svg';
import icoMinus from '../static/asset/ico_minus.svg';

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
    const { name } = props;
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
        <PredictSettingBlock>
            <DateSetting>
                <DecreaseBtn type="button" onClick={onDecrease}/>
                <DateInput type="text" value={predictDate}/>
                <span>일 뒤</span>
                <IncreaseBtn type="button" onClick={onIncrease}/>
            </DateSetting>
            <PredictBtn type="button" onClick={onRequestPredict}>예측 가치 계산하기</PredictBtn>
        </PredictSettingBlock>
    );
}

const PredictSettingBlock = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
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

export default PredictSetting;