import React, { useState } from 'react';
import styled from 'styled-components';
import ReactApexChart from 'react-apexcharts';

const getInitialOption = (stockName, closes, volumes, labels) => {
    const ret = {
        series: [
            {
                name: '종가',
                type: 'column',
                data: closes,
                // data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
            },
            {
                name: '거래량',
                type: 'line',
                data: volumes,
                // data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'line',
                stacked: false,
                toolbar: {
                    show: false,
                },
            },
            stroke: {
                width: [0, 4],
                curve: 'smooth',
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%',
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
            // labels: [
            //     '01/01/2003',
            //     '02/01/2003',
            //     '03/01/2003',
            //     '04/01/2003',
            //     '05/01/2003',
            //     '06/01/2003',
            //     '07/01/2003',
            //     '08/01/2003',
            //     '09/01/2003',
            //     '10/01/2003',
            //     '11/01/2003',
            // ],
            markers: {
                size: 0,
            },
            xaxis: {
                type: 'category',
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
                            if (typeof y !== 'undefined') {
                                return y.toFixed(0) + '원';
                            }
                            return y;
                        },
                    },
                    {
                        formatter: function (y) {
                            if (typeof y !== 'undefined') {
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
            <div className="chart-wrapper">
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    width={
                        window.innerWidth < 512
                            ? window.innerWidth - 60
                            : 512 - 60
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
    border-radius: 16px;
    background-color: var(--bg-gray);
    animation: show 0.3s forwards;
    margin-top: 24px;

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
        padding-top: 20px;
        margin-left: -10px;
    }
`;

export default Chart;
