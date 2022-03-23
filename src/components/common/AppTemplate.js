import React from "react";
import styled from "styled-components";

function AppTemplate({ children }) {
    return <AppTemplateBlock>{children}</AppTemplateBlock>;
}

const AppTemplateBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 512px;
    height: 100%;
    min-height: 560px;
    background: var(--bg-white);
    box-sizing: border-box;
    overflow-y: scroll;
    margin: 0 auto;

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export default AppTemplate;
