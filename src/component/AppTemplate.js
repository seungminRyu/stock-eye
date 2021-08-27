import React from 'react';
import styled from 'styled-components';

const AppTemplateBlock = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 512px;
    position: relative;
    background: white;
    box-sizing: border-box;
    overflow: hidden;
    padding-bottom: 100px;
    margin: 0 auto;
`;

function AppTemplate({ children }) {
    return <AppTemplateBlock>{ children }</AppTemplateBlock>
}

export default AppTemplate;