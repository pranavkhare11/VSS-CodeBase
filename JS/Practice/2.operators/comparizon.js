/**
 * ==
    ===
    !=
    !==
    >
    <
    >=
    <=
 */

let age = 18;
let minimumAgeToVote = 18;
// greater than ">" - The value should be higher
const isAllowedToVote = age > minimumAgeToVote; // False

// greater than equal ">=" The value should be same or higher
const isAllowedToVote2 = age >= minimumAgeToVote; // True

console.log({ isAllowedToVote, isAllowedToVote2 });

// Less than & equals
const maxAgeToDrive = 65;
const employeeAge = 65;
const isAllowedToDrive = employeeAge < maxAgeToDrive; // false
const isAllowedToDrive2 = employeeAge <= maxAgeToDrive; // true