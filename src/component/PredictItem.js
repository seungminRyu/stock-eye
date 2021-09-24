import React from "react";
import styled from "styled-components";

import icoRight from "../static/asset/ico_right.svg";

function PredictItem(props) {
    const { predictInfo: {id, name, predictDate, startDate} } = props;
    return (
        <PredictItemBlock>
            <StockName>
                <p className="stock-name">{name}</p>
            </StockName>
            <PredictInfo>
                <p className="predict-state">예측값 계산중</p>
                <p className="predict-date">{startDate}로 부터 D+{predictDate}</p>
            </PredictInfo>
        </PredictItemBlock>
    )
}

const PredictItemBlock = styled.div`
    display: flex;
    width: 100%;
    padding: 14px 0;
`;

const StockName = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    color: var(--font);
`;

const PredictInfo = styled.div`
    width: 100%;
    text-align: end;
    background-image: url(${icoRight});
    background-repeat: no-repeat;
    background-position: 100% center;
    padding-right: 26px;

    .predict-state {
        font-size: 14px;
        color: var(--gray);
    }

    .predict-date {
        font-size: 12px;
        color: var(--gray);
        margin-top: 12px;
    }
`;

export default PredictItem;