import React, { useState } from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";

const getInitialOption = (stockName) => {
    const ret = {
        chart: {
            type: "candlestick",
            toolbar: {
                show: false,
            },
        },
        annotations: {
            xaxis: [
                {
                    x: "09/03",
                    x2: "09/08",
                    borderColor: "#658EFD",
                    strokeDashArray: 8,
                    fillColor: "#658EFD",
                    opacity: 0.3,
                    offsetX: 0,
                    offsetY: 0,
                    label: {
                        borderColor: "#658EFD",
                        style: {
                            fontSize: "12px",
                            fontFamily: "NanumSquare",
                            color: "#fff",
                            background: "#658EFD",
                        },
                        orientation: "horizontal",
                        offsetY: -20,
                        text: "예측 매도 구간",
                    },
                },
            ],
        },
        colors: ["#00e396", "#FEb016", "FFFFFF00"],
        tooltip: {
            enabled: true,
        },
        stroke: {
            colors: ["#00e396", "#FEb016"],
            width: [2, 2],
            curve: "smooth",
        },
        xaxis: {
            labels: {
                style: {
                    fontFamily: "NanumSquare",
                },
            },
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
            labels: {
                style: {
                    fontFamily: "NanumSquare",
                },
            },
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: "#FD657F",
                    downward: "#658EFD",
                },
            },
            line: {},
        },
    };

    return ret;
};

function TotalChart(prop) {
    const { name, data } = prop;
    const initialOption = getInitialOption(name);
    const [series, setSeries] = useState(data);
    const [options, setOptions] = useState(initialOption);
    console.log(JSON.stringify(series));
    return (
        <ChartBlock>
            <h2 className="section-title">총 예측값 차트</h2>
            <div className="chart-wrapper">
                <ReactApexChart
                    options={options}
                    series={testSeries}
                    // series={series}
                    type="candlestick"
                    width={
                        window.innerWidth < 512
                            ? window.innerWidth - 20
                            : 512 - 20
                    }
                    height={320}
                />
            </div>
        </ChartBlock>
    );
}

const ChartBlock = styled.div`
    display: grid;
    place-content: center;
    width: 100%;
    opacity: 0;
    transform: translateY(10px);
    animation: show 0.3s forwards;
    background-color: var(--bg-white);
    padding: 0 20px 14px;
    margin-top: 12px;

    @keyframes show {
        from {
            opacity: 0;
            transform: translateY(4px);
        }
        to {
            opacity: 100%;
            transform: translateY(0);
        }
    }

    .chart-wrapper {
        width: 100%;
        margin-left: -10px;
    }
`;

const testSeries = [
    {
        name: "5일",
        type: "line",
        data: [
            { x: "08/30", y: 152340 },
            { x: "08/31", y: 154300 },
            { x: "09/01", y: 152300 },
            { x: "09/02", y: 153400 },
            { x: "09/03", y: 153500 },
            { x: "09/06", y: 156030 },
            { x: "09/07", y: 153500 },
            { x: "09/08", y: 151300 },
            { x: "09/09", y: 138000 },
            { x: "09/10", y: 135000 },
            { x: "09/13", y: 132500 },
            { x: "09/14", y: 130530 },
            { x: "09/15", y: 129300 },
            { x: "09/16", y: 129030 },
            { x: "09/17", y: 128800 },
            { x: "09/23", y: 128400 },
            { x: "09/24", y: 128030 },
            { x: "09/27", y: 127800 },
            { x: "09/28", y: 127330 },
            { x: "09/29", y: 126930 },
        ],
    },
    {
        name: "20일",
        type: "line",
        data: [
            { x: "08/30", y: 142340 },
            { x: "08/31", y: 143000 },
            { x: "09/01", y: 143300 },
            { x: "09/02", y: 143400 },
            { x: "09/03", y: 146500 },
            { x: "09/06", y: 147030 },
            { x: "09/07", y: 149500 },
            { x: "09/08", y: 148300 },
            { x: "09/09", y: 147000 },
            { x: "09/10", y: 146000 },
            { x: "09/13", y: 145500 },
            { x: "09/14", y: 144530 },
            { x: "09/15", y: 143300 },
            { x: "09/16", y: 142030 },
            { x: "09/17", y: 141300 },
            { x: "09/23", y: 140500 },
            { x: "09/24", y: 138030 },
            { x: "09/27", y: 137300 },
            { x: "09/28", y: 135530 },
            { x: "09/29", y: 134330 },
        ],
    },
    {
        name: "",
        type: "candlestick",
        data: [
            { x: "08/30", y: [152000, 153000, 150500, 151500] },
            { x: "08/31", y: [152500, 155000, 151000, 155000] },
            { x: "09/01", y: [155000, 156000, 154000, 154000] },
            { x: "09/02", y: [154500, 156000, 153500, 155000] },
            { x: "09/03", y: [155500, 157500, 154500, 156500] },
            { x: "09/06", y: [156000, 156500, 152500, 155500] },
            { x: "09/07", y: [155500, 156000, 153500, 154000] },
            { x: "09/08", y: [151500, 151500, 136500, 138500] },
            { x: "09/09", y: [134000, 134500, 128000, 128500] },
            { x: "09/10", y: [127000, 133500, 126000, 130000] },
            { x: "09/13", y: [126500, 130000, 122500, 124500] },
            { x: "09/14", y: [122500, 126000, 118000, 124000] },
            { x: "09/15", y: [123500, 127500, 122000, 122500] },
            { x: "09/16", y: [123000, 125000, 121000, 121500] },
            { x: "09/17", y: [121500, 121500, 118000, 119500] },
            { x: "09/23", y: [116500, 118000, 114000, 115000] },
            { x: "09/24", y: [116000, 121000, 116000, 119500] },
            { x: "09/27", y: [120000, 122500, 119500, 120000] },
            { x: "09/28", y: [120500, 121500, 117500, 117500] },
            { x: "09/29", y: [115000, 117500, 114500, 116500] },
        ],
    },
];

export default TotalChart;
