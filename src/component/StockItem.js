import React from 'react';
import styled, { css } from 'styled-components';
import imgRateVeryBad from '../static/asset/img_very-bad-rain.png';
import imgRateBad from '../static/asset/img_bad-cloud.png';
import imgRateGood from '../static/asset/img_good-cloudsun.png';
import imgRateVeryGood from '../static/asset/img_very-good-sun.png';
import imgCalculating from '../static/asset/img_calculating.png';
import icoTrendUp from '../static/asset/ico_trending-up.svg';
import icoTrendDown from '../static/asset/ico_trending-down.svg';

const StockItemBlock = styled.li`
    width: 100%;
    height: 162px;
    background-color: var(--main);
    border-radius: 24px;
    padding: 24px 24px 0;
    margin-bottom: 16px;
    animation: stock-fadein 0.4s ease-in-out 0.${props => props.index}s forwards;

    @keyframes stock-fadein {
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

const StockInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px var(--light-main);
    padding-bottom: 16px;

    .stock-name {
        font-size: 20px;
        font-weight: 600;
        color: var(--white);
    }

    .no-rate {
        width: 38px;
        height: 38px;
        border-radius: 12px;
        background-color: var(--light-main);
    }
`;

const StockRate = styled.div`
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background-color: var(--bg-white);
    background-repeat: no-repeat;
    background-size: 24px 24px;
    background-position: center;

    ${props => 
        props.rate === "VERY_BAD" &&
        css`
            background-image: url(${imgRateVeryBad});
    `}
    ${props => 
        props.rate === "BAD" &&
        css`
            background-image: url(${imgRateBad});
    `}
    ${props => 
        props.rate === "GOOD" &&
        css`
            background-image: url(${imgRateGood});
    `}
    ${props => 
        props.rate === "VERY_GOOD" &&
        css`
            background-image: url(${imgRateVeryGood});
    `}

    ${props => 
        props.isDataExist === false &&
        css`
            background: none;
            background-color: var(--light-main);
    `}
`;

const StockValueData = styled.div`
    display: flex;
    padding: 16px 0 18px;

    .label {
        display: block;
        font-size: 12px;
        color: var(--light-main);
    }
`;

const StockPrice = styled.div`
    margin-right: auto;

    .price {
        display: block;
        font-size: 16px;
        font-weight: 600;
        color: var(--white);
        margin-top: 12px;
    }
`;

const StockTrend = styled.div`
    display: flex;
    flex-direction: column;

    .label {
        text-align: center;
    }

    .trend {
        width: 40px;
        height: 28px;
        border-radius: 14px;
        background-color: var(--white);
        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-position: center;
        margin: 8px 7px 0;
    }

    ${props => 
        props.trend === "UP" &&
        css`
        .trend {
            background-image: url(${icoTrendUp});
        }
    `}
    ${props => 
        props.trend === "DOWN" &&
        css`
        .trend {
            background-image: url(${icoTrendDown});
        }
    `}
`;

const StockNoData = styled.div`
    .calculating-img {
        width: 20px;
        height: 20px;
        background-image: url(${imgCalculating});
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        margin: 18px auto 0;
    }

    p {
        font-size: 13px;
        text-align: center;
        color: var(--white);
        margin-top: 12px;
    }
`;

function StockItem(props) {
    const { index, name, id } = props;
    const rate = "GOOD";
    const price = 204500;
    const trendList = ["UP", "DOWN" ,"UP"];
    const isDataExist = true;

    return (
        <StockItemBlock index={index}>
            <StockInfo>
                <span className="stock-name">{ name }</span>
                {isDataExist ?
                    <StockRate rate={rate}/> :
                    <div className="no-rate"></div>
                }
            </StockInfo>
            {isDataExist ?
                <StockValueData>
                    <StockPrice>
                        <span className="label">호가</span>
                        <span className="price">{ price }</span>
                    </StockPrice>
                    {trendList.map((trend, i) => 
                        <StockTrend trend={trend}>
                            <span className="label">{i+1}일 뒤</span>
                            <div className="trend"></div>
                        </StockTrend>
                    )}
                </StockValueData> :
                <StockNoData>
                    <div className="calculating-img"></div>
                    <p>예측값을 계산하고 있습니다 :)</p>
                </StockNoData>
            }
        </StockItemBlock>
    );
}

export default StockItem;