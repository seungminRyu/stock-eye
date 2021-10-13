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
            // xaxis: [
            //   {
            //     x: 'Oct 06 14:00',
            //     borderColor: '#00E396',
            //     label: {
            //       borderColor: '#00E396',
            //       style: {
            //         fontSize: '12px',
            //         color: '#fff',
            //         background: '#00E396'
            //       },
            //       orientation: 'horizontal',
            //       offsetY: 7,
            //       text: 'Annotation Test'
            //     }
            //   }
            // ]
        },
        tooltip: {
            enabled: true,
        },
        xaxis: {
            type: "category",
        },
        yaxis: {
            tooltip: {
                enabled: true,
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

function Chart(prop) {
    const { name, data } = prop;
    const initialOption = getInitialOption(name);
    const [series, setSeries] = useState(data);
    const [options, setOptions] = useState(initialOption);

    return (
        <ChartBlock>
            <h2 className="section-title">총 예측값 차트</h2>
            <div className="chart-wrapper">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="candlestick"
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
