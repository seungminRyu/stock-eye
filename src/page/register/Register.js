import React from "react";
import styled from "styled-components";
import AppTemplate from "../../components/common/AppTemplate";
import CandleChart from "../../components/register/CandleChart";
import PredictSetting from "../../components/register/PredictSetting";
import RegisterHeader from "../../components/register/RegisterHeader";
import useRegister from "./hooks/useRegister";

function Register() {
    const [name, code, isDataLoaded, formattedData, data] = useRegister();

    return (
        <AppTemplate>
            <RegisterBlock>
                <RegisterHeader name={"TEST STOCK NAME"} code={"000000"} />
                {/* {isDataLoaded && <TotalChart name={name} data={formattedData} />} */}
                {/* {isDataLoaded && (
                    <CandleChart name={"TEST STOCK NAME"} data={formattedData} />
                )} */}
                <CandleChart name={"TEST STOCK NAME"} data={formattedData} />
                <PredictSetting name={"TEST STOCK NAME"} values={data} />
            </RegisterBlock>
        </AppTemplate>
    );
}

const RegisterBlock = styled.div`
    padding: 0 20px 200px;
`;

export default Register;
