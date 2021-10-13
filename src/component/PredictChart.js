import React, { useState } from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";

const getInitialOption = (stockName, series, labels) => {
    const ret = {
        series: [
            {
                name: stockName,
                data: series,
            },
        ],
        options: {
            chart: {
                height: 280,
                type: "line",
                toolbar: {
                    show: false,
                },
            },
            // forecastDataPoints: {
            //     count: 7,
            // },
            stroke: {
                width: 5,
                curve: "smooth",
                colors: ["#14D2D9"],
            },
            xaxis: {
                type: "category",
                categories: labels,
                // tickAmount: 5,
                // labels: {
                //     formatter: function (value, timestamp, opts) {
                //         // return opts.dateFormatter(
                //         //     new Date(timestamp),
                //         //     'dd MMM'
                //         // );
                //         return timestamp;
                //     },
                // },
            },
            // title: {
            //     text: 'Forecast',
            //     align: 'left',
            //     style: {
            //         fontSize: '16px',
            //         color: '#666',
            //     },
            // },
            fill: {
                type: "solid",
                // colors: ["#658EFD"],
            },
            // yaxis: {
            //     min: -10,
            //     max: 40,
            // },
        },
    };

    return ret;
};

function Chart(prop) {
    const { name, data, type } = prop;
    const chartData = getInitialOption(name, data.series, data.labels);
    // const [series, setSeries] = useState(data);
    // const [options, setOptions] = useState(initialOption);

    return (
        <ChartBlock>
            <h2 className="section-title">개별 예측값 및 변동률</h2>
            <div className="chart-wrapper">
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    width={
                        window.innerWidth < 512
                            ? window.innerWidth - 20
                            : 512 - 20
                    }
                    height={240}
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
    margin-top: 14px;

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
