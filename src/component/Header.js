import React from 'react';
import styled from 'styled-components';

import icoMore from '../static/asset/ico_more.svg';

function Header() {
    const date = new Date();

    return (
        <HeaderBlock>
            <HeaderText>
                <h1>스톡아이</h1>
                <p className="date">{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}</p>
            </HeaderText>
            <MoreBtn/>
        </HeaderBlock>
    )
}

const HeaderBlock = styled.header`
    display: flex;
    justify-content: space-between;
    font-size: 32px;
    font-weight: 600;
    color: var(--white);
    background-color: var(--main);
    padding: 20px 20px 120px;

    .date {
        font-size: 16px;
        font-weight: 600;
        color: var(--white);
        margin-top: 12px;
    }
`;

const HeaderText = styled.div`
`;

const MoreBtn = styled.button`
    width: 36px;
    height: 36px;
    background-image: url(${icoMore});
    background-repeat: no-repeat;
    background-postion: center;
    background-size: 36px 36px;
`;

export default Header;