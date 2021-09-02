let timer = null;

export const debouncer = (time, callback) => {
    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(callback, time);
}