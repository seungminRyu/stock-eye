import React from "react";
import styled from "styled-components";

import icoRight from "../static/asset/ico_right.svg";

function PredictItem(props) {
    const { predictInfo: {id, name, predictDate, startDate}, isDone, index } = props;
    return (
        <PredictItemBlock index={index}>
            <StockName>
                <p className="stock-name">{name}</p>
            </StockName>
            <PredictInfo>
                {isDone ? 
                    <p className="predict-done">완료</p> :
                    <p className="predict-on-going">예측값 계산중</p>
                }
                <p className="predict-date">{startDate}로 부터 D+{predictDate}</p>
            </PredictInfo>
        </PredictItemBlock>
    )
}

const PredictItemBlock = styled.div`
    display: flex;
    width: 100%;
    opacity: 0;
    transform: translateY(10px);
    padding: 16px 0;
    animation: fade-in 0.2s ease-in-out 0.${props => props.index}s forwards;

    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 100%;
            transform: translateY(0);
        }
    }
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

    .predict-on-going {
        font-size: 14px;
        color: var(--gray);
    }

    .predict-done {
        font-size: 14px;
        color: var(--main);
    }

    .predict-date {
        font-size: 12px;
        color: var(--gray);
        margin-top: 12px;
    }
`;

export default PredictItem;