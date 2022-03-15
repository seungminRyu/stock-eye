let timer = null;

export const debouncer = (time, callback) => {
    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(callback, time);
};

export const parseQueryString = (queryString) => {
    const queryList =
        queryString[0] === "?"
            ? queryString.slice(1).split("&")
            : queryString.split("&");
    let ret = {};
    queryList.forEach((query) => {
        const [key, value] = query.split("=");
        ret[key] = value;
    });

    return ret;
};

export const getLocalStorageItem = (key) =>
    JSON.parse(localStorage.getItem(key));

export const setLocalStorageItem = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data));

export const getChartOption = () => {
    return {
        chart: {
            type: "candlestick",
            toolbar: {
                show: false,
            },
        },
        colors: ["#00e396", "#FEb016", "FFFFFF00"],
        tooltip: {
            enabled: true,
        },
        stroke: {
            colors: ["#00e396", "#FEb016"],
            width: [3, 3],
            curve: "smooth",
        },
        xaxis: {
            labels: {
                show: false,
                style: {
                    fontFamily: "NanumSquare",
                },
            },
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
            labels: {
                style: {
                    fontFamily: "NanumSquare",
                },
            },
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: "#FD657F",
                    downward: "#658EFD",
                },
            },
            line: {},
        },
    };
};
