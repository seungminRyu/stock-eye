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
        // annotations: {
        //     xaxis: [
        //       {
        //         x: 'Oct 06 14:00',
        //         borderColor: '#00E396',
        //         label: {
        //           borderColor: '#00E396',
        //           style: {
        //             fontSize: '12px',
        //             color: '#fff',
        //             background: '#00E396'
        //           },
        //           orientation: 'horizontal',
        //           offsetY: 7,
        //           text: 'Annotation Test'
        //         }
        //       }
        //     ]
        // },
        tooltip: {
            enabled: true,
        },
        xaxis: {
            type: "category",
            tickAmount: 0,
            labels: {
                rotate: -45,
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
        },
    };

    return ret;
};

const test = {
    series: [
        {
            name: "Session Duration",
            data: [24, 33, 26, 21, 20, 6, 8, 15, 10],
            // data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
        },
        {
            name: "Page Views",
            data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
        },
        {
            name: "Total Visits",
            data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
        },
    ],
    options: {
        chart: {
            height: 350,
            type: "line",
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: [2, 2, 2],
            curve: "smooth",
        },
        title: {
            text: "Page Statistics",
            align: "left",
        },
        legend: {
            tooltipHoverFormatter: function (val, opts) {
                return (
                    val +
                    " - " +
                    opts.w.globals.series[opts.seriesIndex][
                        opts.dataPointIndex
                    ] +
                    ""
                );
            },
        },
        markers: {
            size: 0,
            hover: {
                sizeOffset: 6,
            },
        },
        xaxis: {
            categories: [
                "01 Jan",
                "02 Jan",
                "03 Jan",
                "04 Jan",
                "05 Jan",
                "06 Jan",
                "07 Jan",
                "08 Jan",
                "09 Jan",
                "10 Jan",
                "11 Jan",
                "12 Jan",
            ],
        },
        tooltip: {
            y: [
                {
                    title: {
                        formatter: function (val) {
                            return val + " (mins)";
                        },
                    },
                },
                {
                    title: {
                        formatter: function (val) {
                            return val + " per session";
                        },
                    },
                },
                {
                    title: {
                        formatter: function (val) {
                            return val;
                        },
                    },
                },
            ],
        },
        grid: {
            borderColor: "#f1f1f1",
        },
    },
};

function Chart(prop) {
    const { name, data } = prop;
    const initialOption = getInitialOption(name);
    const [series, setSeries] = useState(data);
    const [options, setOptions] = useState(initialOption);

    return (
        <ChartBlock>
            <div className="chart-wrapper">
                <ReactApexChart
                    // options={options}
                    // series={series}
                    // type="candlestick"
                    options={test.options}
                    series={test.series}
                    type="line"
                    width={
                        window.innerWidth < 512
                            ? window.innerWidth - 20
                            : 512 - 20
                    }
                    height={280}
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
