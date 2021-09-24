import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getLocalStorageItem } from "../lib/util";
import PredictItem from "./PredictItem";

function PredictList() {
    const [predictList, setPredictList] = useState(getLocalStorageItem('PREDICT_LIST'));

    return (
        <PredictListBlock>
            <h2 className="section-title">예측 목록</h2>
            {predictList.map((item, i) =>
                <Link to={`/predict?name=${item.name}`} key={i} >
                    <PredictItem predictInfo={item} />
                </Link>
            )}
        </PredictListBlock>
    )
}

const PredictListBlock = styled.section`
    width: 100%;
    padding: 40px 24px 0;
`;


export default PredictList;