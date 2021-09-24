import React from 'react';
import styled from 'styled-components';
import icoRight from '../static/asset/ico_right.svg';

function StockItem(props) {
    const { index, name, code, id } = props;

    return (
        <StockItemBlock index={index}>
            <StockInfo>
                <p className="stock-name">{name}</p>
                <p className="stock-code">{code}</p>
            </StockInfo>
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
    animation: stock-fadein 0.3s ease-in-out 0.${props => props.index}s forwards;

    @keyframes stock-fadein {
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

const StockInfo = styled.div`
    .stock-name {
        font-size: 14px;
        font-weight: 600;
        color: var(--font);
    }

    .stock-code {
        font-size: 12px;
        color: var(--gray);
        margin-top: 12px;
    }
`;

export default StockItem;