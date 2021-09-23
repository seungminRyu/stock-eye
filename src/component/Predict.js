import React, { useState } from "react";
import { getLocalStorageItem } from "../lib/util";
import PredictItem from "./PredictItem";

function Predict() {
    const [predictList, setPredictList] = useState(getLocalStorageItem('PREDICT_LIST'));

    return (
        <div>
            <h2>예측 목록</h2>
            {predictList.map((item, i) => <PredictItem predictInfo={item} key={i} />)}
        </div>
    )
}

export default Predict;