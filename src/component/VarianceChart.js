import React, { useState } from 'react';
import styled from 'styled-components';
import ReactApexChart from 'react-apexcharts';

const getInitialOption = (stockName, series, labels) => {
    const ret = {
        series: [
            {
                name: stockName,
                data: series,
                // data: [
                //     1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1,
                //     -6.09, 0.34, 3.88, 13.07, 5.8, 2, 7.37, 8.1, 13.57, 15.75,
                //     17.1, 19.8, -27.03, -54.4, -47.2, -43.3, -18.6, -48.6,
                //     -41.1, -39.6, -37.6, -29.4, -21.4, -2.4,
                // ],
            },
        ],
        options: {
            chart: {
                type: 'bar',
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
                                color: '#F15B46',
                            },
                            {
                                from: -45,
                                to: 0,
                                color: '#FEB019',
                            },
                        ],
                    },
                    columnWidth: '80%',
                },
            },
            dataLabels: {
                enabled: false,
            },
            yaxis: {
                labels: {
                    formatter: function (y) {
                        return (y >= 0 ? '+' + y : y) + '%';
                    },
                },
            },
            xaxis: {
                type: 'category',
                categories: labels,
                // categories: [
                //     '2011-01-01',
                //     '2011-02-01',
                //     '2011-03-01',
                //     '2011-04-01',
                //     '2011-05-01',
                //     '2011-06-01',
                //     '2011-07-01',
                //     '2011-08-01',
                //     '2011-09-01',
                //     '2011-10-01',
                //     '2011-11-01',
                //     '2011-12-01',
                //     '2012-01-01',
                //     '2012-02-01',
                //     '2012-03-01',
                //     '2012-04-01',
                //     '2012-05-01',
                //     '2012-06-01',
                //     '2012-07-01',
                //     '2012-08-01',
                //     '2012-09-01',
                //     '2012-10-01',
                //     '2012-11-01',
                //     '2012-12-01',
                //     '2013-01-01',
                //     '2013-02-01',
                //     '2013-03-01',
                //     '2013-04-01',
                //     '2013-05-01',
                //     '2013-06-01',
                //     '2013-07-01',
                //     '2013-08-01',
                //     '2013-09-01',
                // ],
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
            <span>{type}</span>
            <div className="chart-wrapper">
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
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
