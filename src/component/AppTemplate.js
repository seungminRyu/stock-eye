import React from 'react';
import styled from 'styled-components';

const AppTemplateBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 512px;
    height: 100%;
    min-height: 560px;
    background: var(--light-main);
    box-sizing: border-box;
    overflow-y: scroll;
    margin: 0 auto;
`;

function AppTemplate({ children }) {
    return <AppTemplateBlock>{ children }</AppTemplateBlock>
}

export default AppTemplate;