# Day 4: Array Methods (map, filter, reduce) (Basic)

Build a data processing pipeline using array methods. Create functions that:

1. **filterAdults**: Filter users who are 18 or older
2. **mapUserInfo**: Transform user objects to include a 'displayName' property
3. **calculateAverageAge**: Use reduce to find the average age
4. **findTopScorer**: Find the user with the highest score
5. **sortByScore**: Sort users by score in descending order

**Bonus**: Chain these methods to process user data in one pipeline.

**Data to work with**:
```javascript
const users = [
    { id: 1, name: 'Alice', age: 17, score: 85 },
    { id: 2, name: 'Bob', age: 22, score: 92 },
    { id: 3, name: 'Charlie', age: 19, score: 78 },
    { id: 4, name: 'Diana', age: 25, score: 95 },
    { id: 5, name: 'Eve', age: 16, score: 88 }
];
```