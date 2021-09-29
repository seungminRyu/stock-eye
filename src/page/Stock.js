import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useAsync from '../hook/useAsync';
import { parseQueryString } from '../lib/util';
import { fetchChartData } from '../lib/api';

import AppTemplate from '../component/AppTemplate';
import Chart from '../component/Chart';

import icoBack from '../static/asset/ico_back.svg';
import PredictSetting from '../component/PredictSetting';

// open, high, low, close
const parseData = data => {
    const { data: values } = data;
    const xValList = Object.keys(values.Open);
    const _data = xValList.map(xVal => {
        return {
            x: xVal,
            y: [parseInt(values.Open[xVal]), parseInt(values.High[xVal]), parseInt(values.Low[xVal]), parseInt(values.Close[xVal])]
        }
    });

    return [{
        name: 'candle',
        data: _data.slice(-30)
    }];
}

const getStockInfo = url => {
    const queryObj = parseQueryString(url);
    const name = decodeURIComponent(queryObj.name);
    const code = decodeURIComponent(queryObj.code);
    return { name, code };
}

function Stock({ location }) {
    const { name, code } = getStockInfo(location.search);
    const [state, refetch] = useAsync({
        callback: fetchChartData,
        params: [name]
    });

    const { loading, data, error } = state;
    const isDataLoaded = data ? true : false;
    let chartData;
    if (isDataLoaded) {
        chartData = parseData(data);
    }

    return (
        <AppTemplate>
            <StockBlock>
                <Header>
                    <Link to="/">
                        <BackBtn/>
                    </Link>
                    <p className="stock-code">{code}</p>
                    <h1 className="stock-name">{name}</h1>
                </Header>
                { isDataLoaded && <Chart name={name} data={chartData} />}
                <PredictSetting name={name} values={state.data}/>
            </StockBlock>
        </AppTemplate>
    );
}

const StockBlock = styled.div`
    padding: 0 20px 200px
`;

const Header = styled.header`
    .stock-code {
        font-size: 16px;
        font-weight: 600;
        color: var(--gray);
        margin-top: 24px;
        margin-left: 16px;
    }

    .stock-name {
        font-size: 22px;
        font-weight: 600;
        color: var(--font);
        margin-top: 8px;
        margin-left: 16px;
    }
`;

const BackBtn = styled.button`
    width: 24px;
    height: 24px;
    background-image: url(${icoBack});
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 30px;
`;

export default Stock;