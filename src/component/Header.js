import React from "react";
import styled from "styled-components";

import icoMenu from "../static/asset/ico_menu.svg";
import imgHeaderBg from "../static/asset/img_header_bg.png";

function Header() {
    const date = new Date();

    return (
        <HeaderBlock>
            <HeaderText>
                <h1>스톡아이</h1>
                <p className="date">{`${date.getFullYear()}년 ${
                    date.getMonth() + 1
                }월 ${date.getDate()}일`}</p>
            </HeaderText>
            <MoreBtn />
        </HeaderBlock>
    );
}

const HeaderBlock = styled.header`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    max-width: 512px;
    width: 100%;
    font-size: 32px;
    font-weight: 600;
    color: var(--font);
    background: url(${imgHeaderBg}) no-repeat;
    background-size: cover;
    background-position: center;
    padding: 20px 20px 120px;

    .date {
        font-size: 16px;
        font-weight: 300;
        color: var(--font);
        margin-top: 14px;
    }
`;

const HeaderText = styled.div``;

const MoreBtn = styled.button`
    width: 36px;
    height: 36px;
    background-image: url(${icoMenu});
    background-repeat: no-repeat;
    background-postion: center;
    background-size: 36px 36px;
`;

export default Header;
