import React from 'react';
import styled from 'styled-components';

const AppTemplateBlock = styled.div`
    display: flex;
    flex-direction: column;
    width: 512px;
    height: 768px;
    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px #33333333;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 96px;
    margin-bottom: 32px;
`;

function AppTemplate({ children }) {
    return <AppTemplateBlock>{ children }</AppTemplateBlock>
}

export default AppTemplate;