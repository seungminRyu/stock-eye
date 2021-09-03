import React from "react";
import styled from "styled-components";

const ModalTemplateBlock = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
`;

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 512px;
    width: 100%;
    height: calc(100% - 60px);
    background-color: var(--bg-white);
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
    padding: 0 24px;
    margin: 0 auto;
`;

function ModalTemplate({ children }) {
    return (
        <ModalTemplateBlock>
            <ModalBody>{ children }</ModalBody>
        </ModalTemplateBlock>
    )
}

export default ModalTemplate;