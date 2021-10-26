import axios from "axios";
import { getLocalStorageItem } from "./util";
const URL = "https://stock-mlp.com/graduation";

export const requestQueueInStocks = async (stockList) => {
    await axios
        .all(
            stockList.map((stockItem) => {
                const formData = new FormData();
                formData.append("name", stockItem.name);
                return axios.post(`${URL}/stock`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            })
        )
        .then(
            axios.spread((...res) => {
                console.log("Success request queue in stocks");
            })
        );
};

export const fetchChartData = async (stockName) => {
    const res = await axios.get(`${URL}/stock?name=${stockName}`);
    if (res.data.data) {
        const ret = res.data.data;
        return ret;
    } else {
        console.error("[fetchChartData]: ", res.data);
    }
};

export const requestPredict = (stockName, predictDate) => {
    const formData = new FormData();
    formData.append("name", stockName);
    formData.append("date", predictDate);
    return axios.post(`${URL}/predict`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const fetchPredictData = (stockName, id) =>
    axios.get(`${URL}/predict?name=${stockName}&id=${id}`);

export const fetchAllPredictData = async (stockList) => {
    let ret = [];
    await axios
        .all(
            stockList.map((stockItem) =>
                axios.get(
                    `${URL}/predict?name=${stockItem.name}&id=${stockItem.id}`
                )
            )
        )
        .then(
            axios.spread((...resList) => {
                resList.forEach((res) => {
                    console.log("res", res);
                    if (
                        res.data["200"] === "Success" &&
                        res.data.data !== false
                    ) {
                        ret.push(res.data["data"]);
                    } else {
                        console.log("undone or error", res);
                    }
                });
            })
        );
    return ret;
};
