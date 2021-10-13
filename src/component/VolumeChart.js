import React, { useState } from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";

const getInitialOption = (stockName, closes, volumes, labels) => {
    const ret = {
        series: [
            {
                name: "종가",
                type: "column",
                data: closes,
            },
            {
                name: "거래량",
                type: "line",
                data: volumes,
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
                stacked: false,
                toolbar: {
                    show: false,
                },
            },
            stroke: {
                width: [0, 4],
                curve: "smooth",
            },
            plotOptions: {
                bar: {
                    columnWidth: "50%",
                },
            },
            fill: {
                opacity: [0.85, 1],
                // gradient: {
                //     inverseColors: false,
                //     shade: 'light',
                //     type: 'vertical',
                //     opacityFrom: 0.85,
                //     opacityTo: 0.55,
                //     stops: [0, 100, 100, 100],
                // },
            },
            labels: labels,
            markers: {
                size: 0,
            },
            xaxis: {
                type: "category",
            },
            // yaxis: {
            //     // title: {
            //     //     text: 'Points',
            //     // },
            //     min: 0,
            // },
            yaxis: [
                {
                    // title: {
                    //     text: '종가',
                    // },
                },
                {
                    opposite: true,
                    // title: {
                    //     text: '거래량',
                    // },
                },
            ],
            tooltip: {
                shared: true,
                intersect: false,
                y: [
                    {
                        formatter: function (y) {
                            if (typeof y !== "undefined") {
                                return y.toFixed(0) + "원";
                            }
                            return y;
                        },
                    },
                    {
                        formatter: function (y) {
                            if (typeof y !== "undefined") {
                                return y.toFixed(0);
                            }
                            return y;
                        },
                    },
                ],
            },
        },
    };

    return ret;
};

function Chart(prop) {
    const { name, closeData, volumeData } = prop;
    const chartData = getInitialOption(
        name,
        closeData.series,
        volumeData.series,
        volumeData.labels
    );
    // const [series, setSeries] = useState(data);
    // const [options, setOptions] = useState(initialOption);

    return (
        <ChartBlock>
            <h2 className="section-title">예측 거래량</h2>
            <div className="chart-wrapper">
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    width={
                        window.innerWidth < 512
                            ? window.innerWidth - 10
                            : 512 - 10
                    }
                    height={260}
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

export default Chart;
