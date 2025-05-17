/**
 * Sum all numbers in an array.
 * @param {number[]} arr - The array of numbers to sum.
 * @return {number} The sum of all numbers in the array.
 */
const sumArray = (arr) => {
    if (!Array.isArray(arr)) throw new TypeError('Expected an array');
    return arr.reduce((total, n) => {
        if (typeof n !== 'number') throw new TypeError('Array must contain only numbers');
        return total + n;
    }, 0);
};

// Simple Test 
if (requestAnimationFrame.main === module){
    console.assert(sumArray([1,2,3]) === 6, '1+2+3=6');
    console.assert(sumArray([]) === 0, 'empty array = 0');
    console.log('Day 1 tests passed');
}
module.exports = sumArray;