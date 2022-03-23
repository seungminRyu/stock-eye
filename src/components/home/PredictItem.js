import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import icoRight from "../../static/asset/ico_right.svg";

function PredictItem(props) {
    const {
        predictInfo: { id, name, predictDate, startDate, isDone },
        index,
    } = props;
    return (
        <Link to={isDone ? `/predict?name=${name}` : "/"}>
            <PredictItemBlock index={index}>
                <StockLabel>
                    <p className="stock-name">{name}</p>
                    <p className="predict-date">
                        {startDate}로 부터 D+{predictDate}
                    </p>
                </StockLabel>
                <PredictInfo>
                    {isDone ? (
                        <p className="predict-done">완료</p>
                    ) : (
                        <p className="predict-on-going">예측값 계산중</p>
                    )}
                </PredictInfo>
            </PredictItemBlock>
        </Link>
    );
}

const PredictItemBlock = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    opacity: 0;
    transform: translateY(10px);
    padding: 16px 0;
    animation: fade-in 0.2s ease-in-out forwards;

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

const StockLabel = styled.div`
    .stock-name {
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        color: var(--font);
    }

    .predict-date {
        font-size: 12px;
        font-weight: 300;
        color: var(--gray);
        white-space: nowrap;
        margin-top: 12px;
    }
`;

const PredictInfo = styled.div`
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    text-align: end;
    // background-image: url(${icoRight});
    // background-repeat: no-repeat;
    // background-position: 100% center;
    // padding-right: 26px;

    .predict-on-going {
        display: inline-block;
        color: var(--gray);
        background-color: #f2f2f2;
        border-radius: 6px;
        padding: 10px 12px;
    }

    .predict-done {
        display: inline-block;
        color: var(--main);
        background-color: #cefeff;
        border-radius: 6px;
        padding: 10px 12px;
    }
`;

export default PredictItem;
