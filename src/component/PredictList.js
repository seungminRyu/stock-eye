import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getLocalStorageItem } from "../lib/util";
import PredictItem from "./PredictItem";

function PredictList() {
    const [predictList, setPredictList] = useState(getLocalStorageItem('PREDICT_LIST'));

    return (
        <div>
            <h2>예측 목록</h2>
            {predictList.map((item, i) =>
                <Link to={`/predict?name=${item.name}`} key={i} >
                    <PredictItem predictInfo={item} />
                </Link>
            )}
        </div>
    )
}

export default PredictList;