import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.header`
    font-weight: bold;
`;

function Header() {
    return (
        <HeaderBlock>
            <h1>현재 내 주식의 예상 가치는</h1>
            <h1>0원</h1>
            <h1>입니다.</h1>
        </HeaderBlock>
    )
}

export default Header;