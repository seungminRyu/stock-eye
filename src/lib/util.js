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
