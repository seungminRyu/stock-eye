import React from 'react';
import AppTemplate from './AppTemplate';
import { parseQueryString } from '../util/util';

function Stock({ location }) {
    const queryObj = parseQueryString(location.search);
    return (
        <AppTemplate>
            <h1>{queryObj.name}</h1>
        </AppTemplate>
    );
}

export default Stock;