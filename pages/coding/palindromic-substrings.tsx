import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const bruteForceCode = `/**
* @param {string} s
* @return {number}
*/
// Brute Force Approach
// Add up s.length to count since all substrings of length 1 are palindromes
// Check every start and end position for a substring and verify it is a palindrome
// loop from i to end
//   loop from j starting from i + 1 to end
//     if substring from i to j is a palindrome, 
//       increment the count by 1
// O(n^2) for finding all substring, O(n) to check palindrome
// O(n^3) overall time, O(1) space
var countSubstrings = function(s) {
 const isPalindrome = (start, end) => {
   let left = start;
   let right = end;
   
   while (left < right) {
     if (s[left] !== s[right]) {
       return false;
     }
     left++;
     right--;
   }
   
   return true;
 };
 
 // All substrings of length 1 are a palindrome, so we add it to the count
 let count = s.length; 
 
 // Check every start and end position for a substring
 for (let i = 0; i < s.length; i++) {
   for (let j = i + 1; j < s.length; j++) {
     // If substring from i to j is a palindrome, add to the count
     if (isPalindrome(i, j)) {
       count++;
     }
   }
 }
 
 return count;
};`;

const optimizedCode = `/**
* @param {string} s
* @return {number}
*/
// Optimized Approach
// Try to expand the palindrome starting from each character in the string
// Increment count for each time we're able to extend the palindrome
// Initialize count to 0
// Loop from i to end
//   Extend palindrome to check those with odd length (i, i); each time we extend we increment count
//   Extend palindrome to check those with even length (i, i+1); each time we extend we increment count
// O(n^2) for attempting to extend palindrome from each starting point, O(1) space
var countSubstrings = function(s) {
 let count = 0;
 
 const extendPalindrome = (start, end) => {
   let left = start;
   let right = end;
   
   // As long as we can extend the palindrome, keep on incrementing the count as that represents a new palindromic substring
   while (left >= 0 && right < s.length && s[left] === s[right]) {
     count++;
     left--;
     right++;
   }
 };
 
 // Starting from each character in s, we will attempt to extend the palindrome and increment the count
 for (let i = 0; i < s.length; i++) {
   // Try extending palindromes of odd length and increment count for each valid extension
   extendPalindrome(i, i);
   // Try extending palindromes of even length and increment count for each valid extension
   extendPalindrome(i, i+1);
 }
 
 return count;
};`;

const PalindromicSubstrings: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/palindromic-substrings/</p>
      <p>
        Given a string s, return the number of palindromic substrings in it. A
        string is a palindrome when it reads the same backward as forward. A
        substring is a contiguous sequence of characters within the string.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="bruteForce.js" language="javascript">
          {bruteForceCode}
        </Prism.Tab>
        <Prism.Tab label="optimized.js" language="javascript">
          {optimizedCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default PalindromicSubstrings;
