import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const romanNumeralsToIntegerCode = `// Roman Numerals to Number Conversions
// I -> 1
// V -> 5
// X -> 10
// L -> 50
// C -> 100
// D -> 500
// M -> 1000
// Test Cases:
// Given CXXIII -> 123
// D -> 500
// XXIX -> 29
// XXIV -> 24
// MCMXCIX -> 1999
// MMMCDXX -> 3420
// Assume valid roman numerals are passed through and all uppercase
// Approach 1:
// Initialize map of roman numerals to number value
// Loop through roman numeral string from left to right
// Keep track of the currentNumeral vs. nextNumeral
// if currentNumeral I is less than the nextNumeral X in XXIX, subtract I value from result
// else add currentNumeral value to the result
// Approach 2:
// Initialize map of roman numerals to number value
// Loop through roman numeral string from right to left
// Keep track of lastNumeral vs. currentNumeral
// if currentNumeral I is less than lastNumeral X in XXIX, subtract I value from result
// else add the currentNumeral value to the result
function romanToInteger(str) {
  // Initialize map of roman numerals to number value
  const romanToNumberMap = new Map([
    ['I', 1],
    ['V', 5],
    ['X', 10],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000]
  ]);

  let result = 0;
  // Loop through roman numeral string from left to right
  for (let i = 0; i < str.length; i++) {
    // Keep track of the currentNumeral vs. nextNumeral
    const currentNumeralValue = romanToNumberMap.get(str[i]);
    const nextNumeralValue = i + 1 < str.length ? romanToNumberMap.get(str[i+1]) : 0;

    // if currentNumeralValue such as I is less than the nextNumeralValue such as X in XXIX, subtract I value from result
    if (currentNumeralValue < nextNumeralValue) {
      result -= currentNumeralValue;
    } else {
      // Otherwise, we can add the currentNumberalValue to the result
      result += currentNumeralValue;
    }
  }
 
  return result;
}

console.log("CXXIII", romanToInteger("CXXIII"));
console.log("XXIX", romanToInteger("XXIX"));
console.log("XXIV", romanToInteger("XXIV"));
console.log("MCMXCIX", romanToInteger("MCMXCIX"));
console.log("MMMCDXX", romanToInteger("MMMCDXX"));
console.log("D", romanToInteger("D"));`;

const integerToRomanNumeralsCode = `// Test Cases:
// 500 -> D
// 9 -> IX
// 123 -> CXXIII
// 1999 -> MCMXCIX
// 3420 -> MMMCDXX
// Approach:
// Initialize a map of roman numeral to number value from greatest to smallest i.e. { M: 1000, CM: 900, D: 500, CD: 400, ... }
// Initialize remainingNumber with num to start off with i.e. 123
// Initialize result string
// Loop through each roman numeral in the map
//  while the currentNumeralValue is < remainingNumber
//    we subtract the currentNumeralValue and append the roman numeral to the string
function integerToRoman(num) {
  // Initialize a map of roman numeral to number value from greatest to smallest i.e. { M: 1000, CM: 900, D: 500, CD: 400, ... }
  const romanToNumberMap = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  // Initialize remainingNumber with num to start off with i.e. 123
  let remainingNumber = num;
  // Initialize result string
  let result = '';
  // Loop through each roman numeral in the map
  for (const [romanNumeral, value] of Object.entries(romanToNumberMap)) {
    // Keep on subtracting the value from remainingNumber and appending the romanNumeral to the result as long as it's >= remainingNumber
    while (value <= remainingNumber) {
      remainingNumber -= value;
      result += romanNumeral;
    }
  }
  
  return result;
}

console.log("500", integerToRoman(500));
console.log("9", integerToRoman(9));
console.log("123", integerToRoman(123));
console.log("1999", integerToRoman(1999));
console.log("3420", integerToRoman(3420));`;

const RomanNumeralsToInteger: NextPage = () => {
  return (
    <div>
      <h2>Roman Numerals To Integer</h2>
      <p>Source: https://bigfrontend.dev/problem/roman-numerals-to-integer</p>

      <Prism language="javascript">{romanNumeralsToIntegerCode}</Prism>

      <h2>Integer to Roman Numerals</h2>
      <p>Source: https://bigfrontend.dev/problem/integer-to-roman</p>
      <Prism language="javascript">{integerToRomanNumeralsCode}</Prism>
    </div>
  );
};

export default RomanNumeralsToInteger;
