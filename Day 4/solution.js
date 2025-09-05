/**
 * Day 4: Array Methods (map, filter, reduce) - Data Processing Pipeline
 */

const users = [
    { id: 1, name: 'Alice', age: 17, score: 85 },
    { id: 2, name: 'Bob', age: 22, score: 92 },
    { id: 3, name: 'Charlie', age: 19, score: 78 },
    { id: 4, name: 'Diana', age: 25, score: 95 },
    { id: 5, name: 'Eve', age: 16, score: 88 }
];

// 1. Filter users who are 18 or older
const filterAdults = (users) => users.filter(user => user.age >= 18);

// 2. Transform user objects to include displayName
const mapUserInfo = (users) => users.map(user => ({
    ...user,
    displayName: `${user.name} (Age: ${user.age})`
}));

// 3. Calculate average age using reduce
const calculateAverageAge = (users) => {
    if (users.length === 0) return 0;
    const totalAge = users.reduce((sum, user) => sum + user.age, 0);
    return Math.round(totalAge / users.length * 100) / 100; // Round to 2 decimal places
};

// 4. Find user with highest score
const findTopScorer = (users) => users.reduce((top, current) => 
    current.score > top.score ? current : top
);

// 5. Sort users by score in descending order
const sortByScore = (users) => [...users].sort((a, b) => b.score - a.score);

// Bonus: Complete data processing pipeline
const processUserData = (users) => {
    const adults = filterAdults(users);
    const enrichedUsers = mapUserInfo(adults);
    const sortedUsers = sortByScore(enrichedUsers);
    const averageAge = calculateAverageAge(adults);
    const topScorer = findTopScorer(adults);
    
    return {
        processedUsers: sortedUsers,
        stats: {
            totalAdults: adults.length,
            averageAge,
            topScorer: topScorer.name,
            topScore: topScorer.score
        }
    };
};

// Tests
console.log('=== Day 4 Tests ===');
console.log('Adults:', filterAdults(users));
console.log('Average age of adults:', calculateAverageAge(filterAdults(users)));
console.log('Top scorer:', findTopScorer(users));
console.log('Complete pipeline result:', processUserData(users));

module.exports = {
    filterAdults,
    mapUserInfo,
    calculateAverageAge,
    findTopScorer,
    sortByScore,
    processUserData
};