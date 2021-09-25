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

function Stock({ location }) {
    const getStockInfo = () => {
        const queryObj = parseQueryString(location.search);
        const name = decodeURIComponent(queryObj.name);
        const code = decodeURIComponent(queryObj.code);
        return { name, code };
    }

    const { name, code } = getStockInfo();
    const [state, refetch] = useAsync({
        callback: fetchChartData,
        params: [name]
    });
    const [chartData, setChartData] = useState(null);

    // open, high, low, close
    const parseData = (data) => {
        const { data: values } = data;
        const xValList = Object.keys(values.Open);
        const _data = xValList.map(xVal => {
            // console.log(xVal)
            return {
                x: xVal,
                y: [parseInt(values.Open[xVal]), parseInt(values.High[xVal]), parseInt(values.Low[xVal]), parseInt(values.Close[xVal])]
            }
        });

        const ret = [{
            name: 'candle',
            data: _data.slice(-60)
        }];

        return ret;
    }
    
    const { loading, data, error } = state;
    console.log("state: ", state);
    // if (data) {
    //     c = parseData(data);
    //     console.log(c);
    //     // setChartData(chartData);
    // }

    return (
        <AppTemplate>
            <Header>
                <Link to="/">
                    <BackBtn/>
                </Link>
                <p className="stock-code">{code}</p>
                <h1 className="stock-name">{name}</h1>
            </Header>
            {/* {loading ? <p>로딩</p> : <p>로딩 끝</p>} */}
            {/* <Chart name={name} data={c} /> */}
            <PredictSetting name={name} values={state.data}/>
        </AppTemplate>
        
    );
}

const Header = styled.header`
    padding: 0 24px;

    .stock-code {
        font-size: 16px;
        font-weight: 600;
        color: var(--gray);
        margin-top: 24px;
        margin-left: 18px;
    }

    .stock-name {
        font-size: 22px;
        font-weight: 600;
        color: var(--font);
        margin-top: 12px;
        margin-left: 18px;
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