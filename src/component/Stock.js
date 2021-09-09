import React from 'react';
import AppTemplate from './AppTemplate';
import { parseQueryString } from '../util/util';
import Chart from './Chart';

function Stock({ location }) {
    const queryObj = parseQueryString(location.search);
    const name = decodeURIComponent(queryObj.name);
    return (
        <AppTemplate>
            <h1>{name}</h1>
            <Chart name={name} />
        </AppTemplate>
    );
}

export default Stock;
