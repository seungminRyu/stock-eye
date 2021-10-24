import React from "react";
import styled from "styled-components";

function ModalTemplate({ children }) {
    return (
        <ModalTemplateBlock>
            <ModalBody>{children}</ModalBody>
        </ModalTemplateBlock>
    );
}

const ModalTemplateBlock = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    z-index: 100;
`;

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 512px;
    width: 100%;
    height: 100%;
    transform: translateY(100px);
    opacity: 0;
    background-color: var(--bg-white);
    padding: 0 24px;
    margin: 0 auto;
    animation: show-modal 0.3s ease-in-out forwards;

    @keyframes show-modal {
        from {
            opacity: 0;
            transform: translateY(400px);
        }
        to {
            opacity: 100%;
            transform: translateY(0);
        }
    }
`;

export default ModalTemplate;
