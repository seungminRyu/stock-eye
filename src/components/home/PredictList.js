import React, { useState } from "react";
import styled from "styled-components";
import { getLocalStorageItem } from "../../lib/util";
import PredictItem from "./PredictItem";

function PredictList() {
    const [predictList, setPredictList] = useState(
        getLocalStorageItem("PREDICT_LIST")
    );
    const [inter, setInter] = useState(null);

    if (inter === null) {
        setInterval(() => {
            console.log("Recieve");
            setPredictList(getLocalStorageItem("PREDICT_LIST"));
        }, 5000);
        setInter(true);
    }

    return (
        <PredictListBlock>
            <h2 className="section-title">예측중인 주식 목록</h2>
            {predictList.map((item, i) => (
                <PredictItem key={i} index={i} predictInfo={item} />
            ))}
        </PredictListBlock>
    );
}

const PredictListBlock = styled.section`
    width: 100%;
    padding: 60px 20px 0;
`;

export default PredictList;
