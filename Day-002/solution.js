// Day 2: Debounce Function 

/**
 * Debounce a function.
 * @param {Function} fn - The function to debounce.
 * @param {number} wait - The number of milliseconds to wait before calling the function.
 */

const debounce = (fn, wait = 300) => {
    let timer = null;
    return (...args) => {
        clearTimeout(timer); 
        timer = setTimeout(() => fn.apply(this, args), wait);
    };
};


