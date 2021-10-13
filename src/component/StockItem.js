import React from "react";
import styled from "styled-components";
import icoRight from "../static/asset/ico_right.svg";

function StockItem(props) {
    const {index, name, code, id} = props;

    return (
        <StockItemBlock index={index}>
            <StockLabel>
                <p className="stock-code">{code}</p>
                <p className="stock-name">{name}</p>
            </StockLabel>
        </StockItemBlock>
    );
}

const StockItemBlock = styled.li`
    width: 100%;
    opacity: 0;
    transform: translateY(10px);
    background-image: url(${icoRight});
    background-repeat: no-repeat;
    background-position: 100% center;
    padding: 16px 0;
    animation: fade-in 0.2s ease-in-out forwards;

    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 100%;
            transform: translateY(0);
        }
    }
`;

const StockLabel = styled.div`
    .stock-name {
        font-size: 14px;
        font-weight: 600;
        color: var(--font);
        margin-top: 8px;
    }

    .stock-code {
        font-size: 12px;
        color: var(--gray);
    }
`;

export default StockItem;
