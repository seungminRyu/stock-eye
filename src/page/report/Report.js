import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import { fetchPredictData } from "../../lib/api";
import {
    getLocalStorageItem,
    getVarianceState,
    parseQueryString,
} from "../../lib/util";
import AppTemplate from "../../components/common/AppTemplate";
import TotalChart from "../../components/report/TotalChart";
import VarianceChart from "../../components/report/VarianceChart";
import PredictChart from "../../components/report/PredictChart";
import VolumeChart from "../../components/report/VolumeChart";

import icoBack from "../../static/asset/ico_back.svg";
import imgGood from "../../static/asset/img_good.png";
import imgBad from "../../static/asset/img_bad.png";
import imgSoso from "../../static/asset/img_soso.png";
import imgCalc from "../../static/asset/img_calculating.png";
import ReportPredictResult from "../../components/report/ReportPredictResult";

const getStockName = (url) => {
    const queryObj = parseQueryString(url);
    return decodeURIComponent(queryObj.name);
};

const getTargetPredictItem = (name) => {
    return getLocalStorageItem("PREDICT_LIST").filter(
        (item) => item.name === name
    )[0];
};

const parseData = (values) => {
    const xValList = Object.keys(values.Open);
    const _data = xValList.map((xVal) => {
        return {
            x: xVal,
            y: [
                parseInt(parseFloat(values.Open[xVal]).toFixed(0)),
                parseInt(parseFloat(values.High[xVal]).toFixed(0)),
                parseInt(parseFloat(values.Low[xVal]).toFixed(0)),
                parseInt(parseFloat(values.Close[xVal]).toFixed(0)),
            ],
        };
    });

    const ret = [
        {
            name: "candle",
            data: _data,
        },
    ];

    return ret;
};

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
        volume: volume.toFixed(0),
    };

    return ret;
};

const getVariance = (start, predict) => {
    console.log(start);
    const startVal = parseInt(start);
    const predictVal = parseInt(predict);
    console.log("s, p: ", startVal, predictVal);
    const percent = ((predictVal - startVal) / startVal) * 100;
    console.log("per: ", percent);
    const ret =
        percent >= 0 ? `+${percent.toFixed(2)}` : `${percent.toFixed(2)}`;

    return ret;
};

const createVarianceObj = (startVals, predictDayVals) => {
    return {
        open: getVariance(startVals.open, predictDayVals.open),
        high: getVariance(startVals.high, predictDayVals.high),
        low: getVariance(startVals.low, predictDayVals.low),
        close: getVariance(startVals.close, predictDayVals.close),
        volume: getVariance(startVals.volume, predictDayVals.volume),
    };
};

const parseValueOnType = (values, startVals, type, variance) => {
    const labels = Object.keys(values.Open);
    const series = labels.map((date) => {
        if (variance) {
            const predict = parseInt(parseFloat(values[type][date]).toFixed(0));
            const start = startVals[type.toLowerCase()];
            return getVariance(start, predict);
        } else {
            return parseInt(parseFloat(values[type][date]).toFixed(0));
        }
    });

    return { labels, series };
};

function Report({ location }) {
    const [chartType, setChartType] = useState("Close");
    const $actType = useRef();
    // const name = getStockName(location.search);
    const name = "테스트 주식";

    // 예측등록 당시 가치
    // const { id, predictDate, startDate, startVals, pastVals, predictResult } =
    //     getTargetPredictItem(name);
    const { id, predictDate, startDate, startVals, pastVals, predictResult } =
        testPastData;

    // const [state, refetch] = useAsync({
    //     callback: fetchPredictData,
    //     params: [name, id],
    // });
    // const { data } = state;
    // const { data: { accuracy, data: predictVals } } = data;

    // 예측 가치
    // const { accuracy, data: predictVals } = predictResult;
    const {
        data: { accuracy, data: predictVals },
    } = testPredictData;

    const predictDayVals = getPredictDayVals(predictVals, predictDate);
    const variances = createVarianceObj(startVals, predictDayVals);

    // 종합 차트에 쓸 데이터
    const predictChartData = parseData(predictVals);
    const predictCloseChartData = parseValueOnType(
        predictVals,
        undefined,
        "Close"
    );

    // 과거 20일 차트 값
    // const pastCloseVals = pastVals.map((item) => parseInt(item.close));
    const pastCloseVals = [
        115066, 118848, 123579, 113854, 114291, 112788, 121238, 113782, 127892,
        128792, 120091, 117882, 121238, 121237, 129273, 131293, 135123, 122349,
        136812, 128911,
    ];

    const onChartTypeClick = (e) => {
        const updateActType = ($targetTypeItem) => {
            $actType.current.classList.remove("--act");
            $targetTypeItem.classList.add("--act");
            $actType.current = $targetTypeItem;
        };

        const setNextChartType = ($targetTypeItem) => {
            const nextType = $targetTypeItem.value;
            setChartType(nextType);
        };

        const $targetTypeItem = e.target.closest("button");
        if (!$targetTypeItem) return;
        updateActType($targetTypeItem);
        setNextChartType($targetTypeItem);
    };

    return (
        <AppTemplate>
            <PredictBlock>
                <Nav>
                    <div className="predict-nav__back-btn">
                        <Link to="/">
                            <BackBtn />
                        </Link>
                    </div>
                    <div className="predict-nav__title">
                        <h1>{name}</h1>
                    </div>
                </Nav>
                <Header>
                    <div className="predict-header-body">
                        <div className="predict-header__indicator">
                            <Indicator
                                varienceState={getVarianceState(
                                    variances.close
                                )}
                            >
                                <div className="indicator-symbol --ani-fade-in"></div>
                            </Indicator>
                        </div>
                        <div className="predict-header__summary">
                            <Summary
                                varienceState={getVarianceState(
                                    variances.close
                                )}
                            >
                                <p>
                                    {startDate}로 부터{" "}
                                    <strong>{predictDate}일</strong> 뒤
                                </p>
                                <p>
                                    <strong>{name}</strong>의 예상가치는
                                </p>
                                <p>
                                    <span className="close-value --ani-fade-in">
                                        {predictDayVals.close} 원 (
                                        {variances.close}
                                        %)
                                    </span>{" "}
                                    입니다.
                                </p>
                            </Summary>
                        </div>
                    </div>
                </Header>
                <ReportPredictResult
                    predictDayVals={predictDayVals}
                    varianceVals={variances}
                    predictDate={predictDate}
                    accuracy={accuracy}
                />
                <ChartReport>
                    <TotalChart
                        name={name}
                        predictChartData={predictChartData}
                        predictCloseChartData={predictCloseChartData}
                        pastCloseVals={pastCloseVals}
                    />
                    <PredictChart
                        name={name}
                        data={parseValueOnType(
                            predictVals,
                            startVals,
                            chartType,
                            false
                        )}
                        type={chartType}
                    />
                    <VarianceChart
                        name={name}
                        data={parseValueOnType(
                            predictVals,
                            startVals,
                            chartType,
                            true
                        )}
                        type={chartType}
                    />
                    <ChartType onClick={onChartTypeClick}>
                        <div className="chart-type-body">
                            <ChartTypeItem
                                ref={$actType}
                                className="--act"
                                type="button"
                                value="Close"
                            >
                                종가
                            </ChartTypeItem>
                            <ChartTypeItem type="button" value="Open">
                                시가
                            </ChartTypeItem>
                            <ChartTypeItem type="button" value="Low">
                                저가
                            </ChartTypeItem>
                            <ChartTypeItem type="button" value="High">
                                고가
                            </ChartTypeItem>
                        </div>
                    </ChartType>
                    <VolumeChart
                        name={name}
                        closeData={parseValueOnType(
                            predictVals,
                            startVals,
                            "Close",
                            false
                        )}
                        volumeData={parseValueOnType(
                            predictVals,
                            startVals,
                            "Volume",
                            false
                        )}
                    />
                </ChartReport>
            </PredictBlock>
        </AppTemplate>
    );
}

const ChartType = styled.div`
    width: 100%;
    background-color: var(--bg-white);
    padding-bottom: 40px;

    .chart-type-body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 320px;
        height: 44px;
        background-color: var(--bg-gray);
        border-radius: 10px;
        padding: 0 20px;
        margin: 0 auto;
    }
`;

const ChartTypeItem = styled.button`
    font-size: 13px;
    color: var(--gray);
    border-radius: 20px;
    background-color: #ffffff00;
    padding: 8px 14px;

    &.--act {
        color: var(--white);
        font-weight: 500;
        background-color: var(--main);
    }
`;

const PredictBlock = styled.div`
    width: 100%;
    background-color: var(--bg-gray);
    padding-bottom: 80px;

    .section-title {
        font-size: 16px;
        font-weight: 500;
        color: var(--font);
        margin-bottom: 16px;
    }

    .--ani-fade-in {
        opacity: 0;
        transform: translateY(4px);
        animation: fade-in 0.4s;
        animation-fill-mode: forwards;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(4px);
        }
        to {
            opacity: 100%;
            transform: translateY(0);
        }
    }
`;

const Nav = styled.nav`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: "button title .";
    width: 100%;
    height: 84px;
    flex-shrink: 0;
    background-color: var(--bg-white);
    padding: 0 20px;

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
    background-color: var(--bg-white);
    padding: 0 20px;

    .predict-header-body {
        display: flex;
        width: 100%;
        border-radius: 16px;
        background-color: var(--bg-gray);
        padding: 24px 20px;
    }

    .predict-header__summary {
        display: grid;
        place-content: center;
        width: 100%;
    }
`;

const Indicator = styled.div`
    display: grid;
    place-content: center;
    width: 48px;
    height: 48px;
    border-radius: 28px;

    .indicator-symbol {
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-size: 24px 24px;
        background-position: center;
        animation-delay: 0.1s;
    }

    ${(props) =>
        props.varienceState === "PLUS" &&
        css`
            background-color: var(--red);
            .indicator-symbol {
                background-image: url(${imgGood});
            }
        `}

    ${(props) =>
        props.varienceState === "MINUS" &&
        css`
            background-color: var(--blue);
            .indicator-symbol {
                background-image: url(${imgBad});
            }
        `}
    
    ${(props) =>
        props.varienceState === "ZERO" &&
        css`
            background-color: var(--gray);
            .indicator-symbol {
                background-image: url(${imgSoso});
            }
        `}
`;

const Summary = styled.div`
    width: 200px;
    font-size: 14px;
    white-space: nowrap;
    line-height: 18px;
    color: var(--black);
    margin-left: 8px;

    strong {
        font-weight: 500;
    }

    .close-value {
        display: inline-block;
        font-size: 16px;
        font-weight: 500;
        animation-delay: 0.1s;
        padding-top: 4px;

        ${(props) =>
            props.varienceState === "PLUS" &&
            css`
                color: var(--red);
            `}

        ${(props) =>
            props.varienceState === "MINUS" &&
            css`
                color: var(--blue);
            `}
        
        ${(props) =>
            props.varienceState === "ZERO" &&
            css`
                color: var(--gray);
            `}
    }
`;

const ChartReport = styled.section`
    margin-top: 14px;

    .section-title {
        margin-top: 40px;
        margin-left: 4px;
    }
`;

const testPastData = {
    id: 0,
    predictDate: "6",
    startDate: "2022년 3월 16일",
    startVals: {
        open: 120091.849609375,
        high: 120091.849609375,
        low: 120091.849609375,
        close: 120091.849609375,
        volume: 120091.849609375,
    },
    pastVals: [
        // {
        //     open: 0000,
        //     high: 0000,
        //     low: 0000,
        //     close: 0000,
        // },
    ],
    predictResult: {},
};

const testPredictData = {
    200: "Success",
    data: {
        name: "카카오",
        accuracy: 0.0181183852,
        data: {
            Open: {
                "D+1": 120091.849609375,
                "D+2": 121271.849609375,
                "D+3": 125781.849609375,
                "D+4": 122123.849609375,
                "D+5": 128901.849609375,
                "D+6": 131827.849609375,
            },
            High: {
                "D+1": 121249.166015625,
                "D+2": 126319.166015625,
                "D+3": 123229.166015625,
                "D+4": 129210.166015625,
                "D+5": 131329.166015625,
                "D+6": 128459.166015625,
            },
            Low: {
                "D+1": 120015.6015625,
                "D+2": 129315.6015625,
                "D+3": 125025.6015625,
                "D+4": 127010.6015625,
                "D+5": 124325.6015625,
                "D+6": 129455.6015625,
            },
            Close: {
                "D+1": 124292.80859375,
                "D+2": 127338.80859375,
                "D+3": 118323.80859375,
                "D+4": 123330.80859375,
                "D+5": 129329.80859375,
                "D+6": 130458.80859375,
            },
            Volume: {
                "D+1": 2089179,
                "D+2": 3089379,
                "D+3": 3089129,
                "D+4": 3089170,
                "D+5": 3089329,
                "D+6": 3089459,
            },
        },
        id: 1632410113788,
    },
};

export default Report;
