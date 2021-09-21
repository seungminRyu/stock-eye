import axios from "axios";
const URL = "https://stock-mlp.com/graduation";

export const requestQueueInStocks = async (stockList) => {
    await axios
        .all(
            stockList.map(stockItem => {
                const formData = new FormData();
                formData.append("name", stockItem.name);
                return axios.post(`${URL}/stock`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            })
        )
        .then(
            axios.spread((...res) => {
                console.log(res);
            })
        )
}

export const fetchChartData = async (stockName) => {
    console.log("fetching");
    const res = await axios.get(`${URL}/stock?name=${stockName}`);
    if (res.data.data) {
        const ret = res.data.data;
        return ret;
    } else {
        console.error('[fetchChartData]: ', res.data);
    }
}