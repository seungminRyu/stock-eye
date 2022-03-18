import { useLocation } from "react-router-dom";
import useAsync from "../../../hook/useAsync";
import { parseQueryString } from "../../../lib/util";
import { fetchChartData } from "../../../lib/api";

// open, high, low, close 순서
const formatData = (data) => {
    const { data: values } = data;
    const xVals = Object.keys(values.Open);
    const _data = xVals.map((xVal) => {
        // yyyymmdd => mm/dd
        const date = xVal.split("").slice(4);
        const formattedDate = date.splice(2, 0, "/").join("");
        return {
            x: formattedDate,
            y: [
                parseInt(values.Open[xVal]),
                parseInt(values.High[xVal]),
                parseInt(values.Low[xVal]),
                parseInt(values.Close[xVal]),
            ],
        };
    });

    return [
        {
            name: "candle",
            data: _data.slice(-60),
        },
    ];
};

// const parseValueOnType = (values, type) => {
//     const labels = Object.keys(values.Open);
//     const series = labels.map((date) => {
//         return parseInt(parseFloat(values[type][date]).toFixed(0));
//     });

//     return { labels, series };
// };

const getStockInfo = (url) => {
    const queryObj = parseQueryString(url);
    const name = decodeURIComponent(queryObj.name);
    const code = decodeURIComponent(queryObj.code);
    return { name, code };
};

function useRegister() {
    const location = useLocation();
    const { name, code } = getStockInfo(location.search);
    const [state, refetch] = useAsync({
        callback: fetchChartData,
        params: [name],
    });
    const { loading, data, error } = state;
    const isDataLoaded = data ? true : false;
    const formattedData = isDataLoaded ? formatData(data) : {};

    return [name, code, isDataLoaded, formattedData, data];
}

export default useRegister;
