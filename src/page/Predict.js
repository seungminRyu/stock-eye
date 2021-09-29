import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import useAsync from "../hook/useAsync";
import { fetchPredictData } from "../lib/api";
import { getLocalStorageItem, parseQueryString } from "../lib/util";

import AppTemplate from "../component/AppTemplate";
import Chart from '../component/Chart';

import icoBack from '../static/asset/ico_back.svg';
import imgGood from '../static/asset/img_good.png';
import imgBad from '../static/asset/img_bad.png';
import imgSoso from '../static/asset/img_soso.png';
import imgCalc from '../static/asset/img_calculating.png';

const getStockName = url => {
    const queryObj = parseQueryString(url);
    return decodeURIComponent(queryObj.name);
}

const getTargetPredictItem = name => {
    return getLocalStorageItem('PREDICT_LIST').filter(item => item.name === name)[0];
}

const parseData = (values) => {
    const xValList = Object.keys(values.Open);
    const _data = xValList.map(xVal => {
        return {
            x: xVal,
            y: [
                parseInt(parseFloat(values.Open[xVal]).toFixed(0)),
                parseInt(parseFloat(values.High[xVal]).toFixed(0)),
                parseInt(parseFloat(values.Low[xVal]).toFixed(0)),
                parseInt(parseFloat(values.Close[xVal]).toFixed(0))
            ]
        }
    });

    const ret = [{
        name: 'candle',
        data: _data
    }];

    return ret;
}

const getPredictDayVals = (predictVals, predictDate) => {
    const targetKey = `D+${predictDate}`;
    const { 
        Open: { [targetKey]: open },
        High: { [targetKey]: high },
        Low: { [targetKey]: low },
        Close: { [targetKey]: close },
        Volume: { [targetKey]: volume },
    } = predictVals;
    
    const ret = { 
        open: open.toFixed(0),
        high: high.toFixed(0),
        low: low.toFixed(0),
        close: close.toFixed(0),
        volume: volume.toFixed(0)
    };
    
    return ret;
}

const getVariance = (startVal, predictVal) => {
    const percent = (predictVal - startVal) / startVal * 100;
    const ret = percent >= 0 ? `+${percent.toFixed(2)}` : `${percent.toFixed(2)}`;

    return ret;
}

const createVarianceObj = (startVals, predictDayVals) => {
    return { 
        open: getVariance(startVals.open, predictDayVals.open),
        high: getVariance(startVals.high, predictDayVals.high),
        low: getVariance(startVals.low, predictDayVals.low),
        close: getVariance(startVals.close, predictDayVals.close),
        volume: getVariance(startVals.volume, predictDayVals.volume),
    }
}

const getVarianceState = (variance) => {
    const varianceVal = parseFloat(variance);
    
    if (varianceVal > 0) {
        return 'PLUS';
    } else if (varianceVal === 0) {
        return 'ZERO';
    } else {
        return 'MINUS';
    }
}

function Predict({ location }) {
    const name = getStockName(location.search);
    const { id, predictDate, startDate, startVals } = getTargetPredictItem(name);
    const [state, refetch] = useAsync({
        callback: fetchPredictData,
        params: [name, id]
    });
    const { data } = state;
    // const { data: { accuracy, data: predictVals } } = data;
    const { data: { accuracy, data: predictVals } } = predictData;

    const predictDayVals = getPredictDayVals(predictVals, 3);
    const variances = createVarianceObj(startVals, predictDayVals);
    const predictChartData = parseData(predictVals);

    return (
        <AppTemplate>
            <PredictBlock>
                <Nav>
                    <div className="predict-nav__back-btn">
                        <Link to="/">
                            <BackBtn/>
                        </Link>
                    </div>
                    <div className="predict-nav__title">
                        <h1>{name}</h1>
                    </div>
                </Nav>
                <Header>
                    <div className="predict-header__indicator">
                        <Indicator varienceState={getVarianceState(variances.close)}/>
                    </div>
                    <div className="predict-header__summary">
                        <Summary varienceState={getVarianceState(variances.close)}>
                            <p>{startDate}로 부터 <strong>{predictDate}일</strong> 뒤</p>
                            <p><strong>{name}</strong>의 예상가치는</p>
                            <p>
                                <span className="close-value">
                                    {predictDayVals.close} 원 
                                    ({variances.close}%)
                                </span> 입니다.
                            </p>
                        </Summary>
                    </div>
                </Header>
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
                        <ValueContainer varienceState={getVarianceState(variances.open)}>
                            <p className="label">예상 시가</p>
                            <p className="predict-value">
                                {predictDayVals.open}원 ({variances.open}%)
                            </p>
                        </ValueContainer>
                        <ValueContainer varienceState={getVarianceState(variances.close)}>
                            <p className="label">예상 종가</p>
                            <p className="predict-value">
                                {predictDayVals.close}원 ({variances.close}%)
                            </p>
                        </ValueContainer>
                        <ValueContainer varienceState={getVarianceState(variances.high)}>
                            <p className="label">예상 고가</p>
                            <p className="predict-value">
                                {predictDayVals.high}원 ({variances.high}%)
                            </p>
                        </ValueContainer>
                        <ValueContainer varienceState={getVarianceState(variances.low)}>
                            <p className="label">예상 저가</p>
                            <p className="predict-value">
                                {predictDayVals.low}원 ({variances.low}%)
                            </p>
                        </ValueContainer>
                        <ValueContainer varienceState={getVarianceState(variances.volume)}>
                            <p className="label">예상 거래량</p>
                            <p className="predict-value">
                                {predictDayVals.volume} ({variances.volume}%)
                            </p>
                        </ValueContainer>
                    </PredictValues>
                </Report>
                <ChartReport>
                    <h2 className="section-title">총 예측값 그래프</h2>
                    <Chart name={name} data={predictChartData} />
                </ChartReport>
            </PredictBlock>
        </AppTemplate>
    );
}

export default Predict;

const PredictBlock = styled.div`
    width: 100%;
    padding: 0 20px 80px;

    .section-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--font);
    }
`;

const Nav = styled.nav`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
        "button title .";
    width: 100%;
    height: 84px;
    flex-shrink: 0;

    .predict-nav__back-btn {
        display: flex;
        align-items: center;
        grid-area: button;
        magin-right: auto;
    }

    .predict-nav__title {
        display: grid;
        width: 100%;
        height: 100%;
        place-content: center;
        grid-area: title;
        font-size: 12px;
        color: var(--gray);
        text-align: center;
    }
`;

const BackBtn = styled.button`
    width: 24px;
    height: 24px;
    background-image: url(${icoBack});
    background-repeat: no-repeat;
    background-position: center;
`;

const Header = styled.header`
    display: flex;
    width: 100%;
    border-radius: 16px;
    background-color: var(--bg-gray);
    padding: 24px 20px;

    .predict-header__summary {
        display: grid;
        place-content: center;
        width: 100%;
    }
`;

const Indicator = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 28px;
    background-repeat: no-repeat;
    background-size: 24px 24px;
    background-position: center;

    ${ props => 
        props.varienceState === 'PLUS' &&
        css`
            background-color: var(--red);
            background-image: url(${imgGood});
        `
    }
    
    ${ props => 
        props.varienceState === 'MINUS' &&
        css`
            background-color: var(--blue);
            background-image: url(${imgBad});
        `
    }
    
    ${ props => 
        props.varienceState === 'ZERO' &&
        css`
            background-color: var(--gray);
            background-image: url(${imgSoso});
        `
    }
`;

const Summary = styled.div`
    width: 200px;
    font-size: 14px;
    white-space: nowrap;
    line-height: 18px;
    color: var(--black);
    margin-left: 8px;

    strong {
        font-weight: 600;
    }

    .close-value {
        display: inline-block;
        font-size: 16px;
        font-weight: 600;
        padding-top: 4px;

        ${props => 
            props.varienceState === 'PLUS' &&
            css`
                color: var(--red);
            `
        }
        
        ${props => 
            props.varienceState === 'MINUS' &&
            css`
                color: var(--blue);
            `
        }
        
        ${props => 
            props.varienceState === 'ZERO' &&
            css`
                color: var(--gray);
            `
        }
    }
`;

const Report = styled.section`
    margin-top: 40px;
        
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
        font-weight: 600;
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
        font-weight: 600;
        margin-top: 8px;
        ${props =>
            props.varienceState === 'PLUS' &&
            css`
                color: var(--red);
            `
        }

        ${props =>
            props.varienceState === 'MINUS' &&
            css`
                color: var(--blue);
            `
        }

        ${props =>
            props.varienceState === 'ZERO' &&
            css`
                color: var(--gray);
            `
        }
    }
`;

const ChartReport = styled.section`
    margin-top: 40px;
`;

const predictData = {
    "200": "Success",
    "data": {
        "name": "카카오",
        "accuracy": 0.0181183852,
        "data": {
            "Open": {
                "D+1": 20091.849609375,
                "D+2": 20051.849609375,
                "D+3": 20071.849609375,
                "D+4": 20093.849609375,
                "D+5": 20041.849609375,
                "D+6": 20231.849609375
            },
            "High": {
                "D+1": 21249.166015625,
                "D+2": 21319.166015625,
                "D+3": 21229.166015625,
                "D+4": 21210.166015625,
                "D+5": 21329.166015625,
                "D+6": 21459.166015625
            },
            "Low": {
                "D+1": 20015.6015625,
                "D+2": 29315.6015625,
                "D+3": 20025.6015625,
                "D+4": 20010.6015625,
                "D+5": 20325.6015625,
                "D+6": 20455.6015625
            },
            "Close": {
                "D+1": 20338.80859375,
                "D+2": 22338.80859375,
                "D+3": 20328.80859375,
                "D+4": 20330.80859375,
                "D+5": 20328.80859375,
                "D+6": 20458.80859375
            },
            "Volume": {
                "D+1": 2389179,
                "D+2": 2389379,
                "D+3": 2389129,
                "D+4": 2389170,
                "D+5": 2389329,
                "D+6": 2389459
            }
        },
        "id": 1632410113788
    }
}
