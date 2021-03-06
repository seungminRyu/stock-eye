import React, { useReducer, useState } from "react";
import styled from "styled-components";
import { requestPredict } from "../../lib/api";
import { getLocalStorageItem, setLocalStorageItem } from "../../lib/util";

import icoPlus from "../../static/asset/ico_plus.svg";
import icoMinus from "../../static/asset/ico_minus.svg";
import aniLoading from "../../static/asset/ani_loading.gif";

const predictDateReducer = (state, action) => {
    switch (action.type) {
        case "INCREASE":
            return state + 1;
        case "DECREASE":
            return state - 1;
        default:
            throw new Error(`[Stock] Unhandled action type: ${action.type}`);
    }
};

function PredictSetting(props) {
    const { name, values } = props;
    const [predictDate, dispatchPridictDate] = useReducer(
        predictDateReducer,
        1
    );

    const onIncrease = () => {
        if (predictDate < 30) {
            dispatchPridictDate({ type: "INCREASE" });
        }
    };
    const onDecrease = () => {
        if (predictDate > 1) {
            dispatchPridictDate({ type: "DECREASE" });
        }
    };

    const onPredictBtn = async () => {
        const findPredictItemIdx = (predictList, targetName) => {
            return predictList.findIndex(
                (predictItem) => predictItem.name === targetName
            );
        };

        const getNextPredictList = (predictItem) => {
            const curPredictList = getLocalStorageItem("PREDICT_LIST");
            const i = findPredictItemIdx(curPredictList, name);
            const ret =
                i !== -1
                    ? curPredictList.fill(predictItem, i, i + 1)
                    : curPredictList.concat(predictItem);

            return ret;
        };

        const updatePredictList = (predictItem) => {
            const nextPredictList = getNextPredictList(predictItem);
            setLocalStorageItem("PREDICT_LIST", nextPredictList);
        };

        const createPredictItem = (id, startVals, pastVals) => {
            const date = new Date();
            return {
                id,
                name,
                predictDate,
                startDate: `${date.getMonth() + 1}??? ${date.getDate()}???`,
                startVals,
                pastVals,
                predictResult: {},
                isDone: false,
            };
        };

        const getPastVals = () => {
            const pastValDate = 19;
            const { data } = values;
            const dates = Object.keys(data["Close"]).slice(
                parseInt(`-${pastValDate}`)
            );

            const ret = dates.map((date) => {
                return {
                    open: data.Open[date],
                    close: data.Close[date],
                    low: data.Low[date],
                    high: data.High[date],
                };
            });
            return ret;
        };

        const getStartVals = () => {
            const { data } = values;
            const dates = Object.keys(data["Close"]).slice(-1);

            const ret = dates.map((date) => {
                return {
                    open: data.Open[date],
                    close: data.Close[date],
                    low: data.Low[date],
                    high: data.High[date],
                    volume: data.Volume[date],
                };
            });
            return ret[0];
        };

        try {
            const res = await requestPredict(name, predictDate);
            const { id } = res.data;
            const pastValList = getPastVals();
            const startVals = getStartVals();
            const predictItem = createPredictItem(id, startVals, pastValList);
            updatePredictList(predictItem);
        } catch (e) {
            console.error("???????????? ??????: ", e.message);
        }
    };

    return (
        <PredictSettingBlock>
            <PredictSettingBody>
                <DateSetting>
                    <DecreaseBtn type="button" onClick={onDecrease} />
                    <DateInput type="text" value={predictDate} />
                    <span>??? ???</span>
                    <IncreaseBtn type="button" onClick={onIncrease} />
                </DateSetting>
                <PredictBtn type="button" onClick={onPredictBtn}>
                    ?????? ?????? ????????????
                </PredictBtn>
            </PredictSettingBody>
        </PredictSettingBlock>
    );
}

const PredictSettingBlock = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
`;

const PredictSettingBody = styled.div`
    max-width: 512px;
    background-color: var(--bg-white);
    box-shadow: 0 4px 20px #33333333;
    padding: 16px 20px 40px;
    margin: 0 auto;
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
    margin-right: 4px;
`;

const PredictBtn = styled.button`
    display: grid;
    place-content: center;
    width: 100%;
    height: 58px;
    font-size: 14px;
    font-weight: 500;
    color: var(--white);
    background-color: var(--main);
    border-radius: 14px;
    margin-top: 16px;
`;

export default PredictSetting;
