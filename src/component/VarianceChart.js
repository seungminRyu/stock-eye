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
                type: "bar",
                height: 350,
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    colors: {
                        ranges: [
                            {
                                from: -100,
                                to: -46,
                                color: "#F15B46",
                            },
                            {
                                from: -45,
                                to: 0,
                                color: "#FEB019",
                            },
                        ],
                    },
                    columnWidth: "40%",
                },
            },
            fill: {
                type: "solid",
                colors: ["#658EFD"],
            },
            dataLabels: {
                enabled: false,
            },
            yaxis: {
                labels: {
                    formatter: function (y) {
                        return (y >= 0 ? "+" + y : y) + "%";
                    },
                },
            },
            xaxis: {
                type: "category",
                categories: labels,
                // labels: {
                //     rotate: -90,
                // },
            },
        },
    };

    return ret;
};

function Chart(prop) {
    const { name, data, type } = prop;
    const chartData = getInitialOption(name, data.series, data.labels);
    // const [series, setSeries] = useState(data);
    // const [options, setOptions] = useState(initialOption);

    console.log(data.series);
    return (
        <ChartBlock>
            <div className="chart-wrapper">
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
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
    padding: 0 20px 6px;
    margin-top: -14px;

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
