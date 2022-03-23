import React from "react";
import styled from "styled-components";
import { css } from "styled-components";
import { getVarianceState } from "../../lib/util";

function ReportPredictResult(props) {
    const { predictDayVals, varianceVals, predictDate, accuracy } = props;

    return (
        <Report>
            <h2 className="section-title">결과리포트</h2>
            <PredictInfo>
                <div>
                    <p className="label">예측기간</p>
                    <p className="info-data">{predictDate}일</p>
                </div>
                <div className="split-bar"></div>
                <div>
                    <p className="label">MSE(평균제곱오차)</p>
                    <p className="info-data">{accuracy}</p>
                </div>
            </PredictInfo>
            <PredictValues>
                <ValueContainer
                    varianceState={getVarianceState(varianceVals.open)}
                >
                    <p className="label">예상 시가</p>
                    <p className="predict-value --ani-fade-in">
                        {predictDayVals.open}원 ({varianceVals.open}%)
                    </p>
                </ValueContainer>
                <ValueContainer
                    varianceState={getVarianceState(varianceVals.close)}
                >
                    <p className="label">예상 종가</p>
                    <p className="predict-value --ani-fade-in">
                        {predictDayVals.close}원 ({varianceVals.close}%)
                    </p>
                </ValueContainer>
                <ValueContainer
                    varianceState={getVarianceState(varianceVals.high)}
                >
                    <p className="label">예상 고가</p>
                    <p className="predict-value --ani-fade-in">
                        {predictDayVals.high}원 ({varianceVals.high}%)
                    </p>
                </ValueContainer>
                <ValueContainer
                    varianceState={getVarianceState(varianceVals.low)}
                >
                    <p className="label">예상 저가</p>
                    <p className="predict-value --ani-fade-in">
                        {predictDayVals.low}원 ({varianceVals.low}%)
                    </p>
                </ValueContainer>
                <ValueContainer
                    varianceState={getVarianceState(varianceVals.volume)}
                >
                    <p className="label">예상 거래량</p>
                    <p className="predict-value --ani-fade-in">
                        {predictDayVals.volume} ({varianceVals.volume}%)
                    </p>
                </ValueContainer>
            </PredictValues>
        </Report>
    );
}

const Report = styled.section`
    background-color: var(--bg-white);
    padding: 40px 20px 40px;

    .label {
        font-size: 12px;
        color: var(--gray);
    }
`;

const PredictInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    text-align: center;
    margin-top: 30px;

    .info-data {
        display: inline-block;
        font-size: 14px;
        font-weight: 500;
        color: var(--font);
        margin-top: 8px;
    }
`;

const PredictValues = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 12px;
    width: 100%;
    margin-top: 8px;
`;

const ValueContainer = styled.div`
    border-bottom: solid 1px var(--bg-gray);
    padding: 16px 0;

    .predict-value {
        display: inline-block;
        font-size: 14px;
        font-weight: 500;
        animation-delay: 0.2s;
        margin-top: 8px;
        ${(props) =>
            props.varianceState === "PLUS" &&
            css`
                color: var(--red);
            `}

        ${(props) =>
            props.varianceState === "MINUS" &&
            css`
                color: var(--blue);
            `}

        ${(props) =>
            props.varianceState === "ZERO" &&
            css`
                color: var(--gray);
            `}
    }
`;

export default ReportPredictResult;
