import React from "react";

function PredictItem(props) {
    const { predictInfo: {id, name, predictDate, startDate} } = props;
    return (
        <div>
            <p>{id}</p>
            <p>{name}</p>
            <p>{predictDate}</p>
            <p>{startDate}</p>
        </div>
    )
}

export default PredictItem;