import React from "react";
import styled from "styled-components";

import icoMenu from "../../static/asset/ico_menu.svg";
import imgHeaderBg from "../../static/asset/img_header_bg.png";

function HomeBanner() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();

    return (
        <HomeBannerBlock>
            <TextContainer>
                <h1>스톡아이</h1>
                <Today>{`${year}년 ${month}월 ${date}일`}</Today>
            </TextContainer>
            <MoreBtn />
        </HomeBannerBlock>
    );
}

const HomeBannerBlock = styled.header`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    max-width: 512px;
    width: 100%;
    height: 400px;
    font-size: 32px;
    font-weight: 500;
    color: var(--font);
    background: url(${imgHeaderBg}) no-repeat;
    background-size: cover;
    background-position: center;
    padding: 20px 20px 0;
`;

const Today = styled.p`
    font-size: 16px;
    font-weight: 300;
    color: var(--font);
    margin-top: 14px;
`;

const TextContainer = styled.div``;

const MoreBtn = styled.button`
    width: 36px;
    height: 36px;
    background-image: url(${icoMenu});
    background-repeat: no-repeat;
    background-postion: center;
    background-size: 36px 36px;
`;

export default HomeBanner;
