import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import icoBack from "../../static/asset/ico_back.svg";

function RegisterHeader(props) {
    const { name, code } = props;

    return (
        <Header>
            <Link to="/">
                <BackBtn />
            </Link>
            <p>{code}</p>
            <h1>{name}</h1>
        </Header>
    );
}

const Header = styled.header`
    p {
        font-size: 16px;
        font-weight: 600;
        color: var(--gray);
        margin-top: 24px;
        margin-left: 12px;
    }

    h1 {
        font-size: 22px;
        font-weight: 600;
        color: var(--font);
        margin-top: 8px;
        margin-left: 12px;
    }
`;

const BackBtn = styled.button`
    width: 24px;
    height: 24px;
    background-image: url(${icoBack});
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 30px;
`;

export default RegisterHeader;
