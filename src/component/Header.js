import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.header`
    font-size: 24px;
    font-weight: 300;
    line-height: 36px;
    color: var(--font);
    padding: 80px 24px 52px;

    .current-value {
        display: inline-block;
        font-size: 56px;
        font-weight: 600;
        margin-left: -10px;
        margin-right: 12px;
        margin-top: 12px;
    }
`;

function Header() {
    return (
        <HeaderBlock>
            <h1>
                현재 내 주식의 예상 가치는<br/>
                <span className="current-value">12,321,300</span>원<br/>
                입니다.
            </h1>
        </HeaderBlock>
    )
}

export default Header;