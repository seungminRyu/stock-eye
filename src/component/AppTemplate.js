import React from 'react';
import styled from 'styled-components';

const AppTemplateBlock = styled.div`
    max-width: 512px;
    height: 100%;
    min-height: 560px;
    position: relative;
    background: white;
    box-sizing: border-box;
    overflow-y: scroll;
    margin: 0 auto;
`;

function AppTemplate({ children }) {
    return <AppTemplateBlock>{ children }</AppTemplateBlock>
}

export default AppTemplate;