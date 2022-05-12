import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const recursionCode = `/**
* @param {string} s
* @return {number}
*/
// Recursion Approach
// A character may be decoded alone if (1-9) or as a pair (1 and 0-9) or (2 and 0-6)
// If current index is equal to s.length, return 1 (we decoded a valid message in reaching the end)
// If the character is 0 we can return 0 as it can't be leading
// Recursively keep track of the result and decode the next character
// Recursively keep track of the result and decode the characters after the valid pair if the current index is less than s.length - 1
// and the current number is 1 or the current number is 2 and followed by 0-6
// O(2^n) time cause we have two choices: either decode 1 character or a pair at a time
var numDecodings = function(s) {
 const messageLength = s.length;
 const rec = (currentIndex) => {
   // Reached the end of a valid decoded message, return 1 to the count
   if (currentIndex === messageLength) {
     return 1;
   }
   // Can't have any leading zeroes, return 0
   if (s[currentIndex] === '0') {
     return 0;
   }
   // Recursively decode the next character
   let count = rec(currentIndex + 1);
   
   // Recursively decode the characters after the valid pair
   if (currentIndex < messageLength - 1 && (s[currentIndex] === '1' || (s[currentIndex] === '2' && s[currentIndex+1] < '7'))) {
     count += rec(currentIndex + 2);    
   }
   
   return count;
 };
 
 return rec(0);
};`;

const recursionMemoizedCode = `
/**
 * @param {string} s
 * @return {number}
 */
// Recursion Memoized Approach
// A character may be decoded alone if (1-9) or as a pair (1 and 0-9) or (2 and 0-6)
// If current index is equal to s.length, return 1 (we decoded a valid message in reaching the end)
// If the character is 0 we can return 0 as it can't be leading
// Recursively keep track of the result and decode the next character
// Recursively keep track of the result and decode the characters after the valid pair if the current index is less than s.length - 1
// and the current number is 1 or the current number is 2 and followed by 0-6
// 
// In order to memoize the solution, we can keep track of an object like memo that will map the current index to the count from that point onward
// We will check the memo before proceeding and set it after we've computed the count
// O(n) time since we're not recomputing the same subtrees and O(n) space for memo
var numDecodings = function(s) {
  const memo = {};
  const messageLength = s.length;
  const rec = (currentIndex) => {
    if (memo.hasOwnProperty(currentIndex)) {
      return memo[currentIndex];
    }
    // Reached the end of a valid decoded message, return 1 to the count
    if (currentIndex === messageLength) {
      memo[currentIndex] = 1;
      return 1;
    }
    // Can't have any leading zeroes, return 0
    if (s[currentIndex] === '0') {
      memo[currentIndex] = 0;
      return 0;
    }
    // Recursively decode the next character
    let count = rec(currentIndex + 1);
    
    // Recursively decode the characters after the valid pair
    if (currentIndex < messageLength - 1 && (s[currentIndex] === '1' || (s[currentIndex] === '2' && s[currentIndex+1] < '7'))) {
      count += rec(currentIndex + 2);    
    }
    
    memo[currentIndex] = count;
    
    return count;
  };
  
  return rec(0);
};`;

const bottomUpDpCode = `/**
* @param {string} s
* @return {number}
*/
// Dynamic Programming Approach (Bottom Up)
// Create dp array of s.length + 1
// dp[s.length] = 1
// dp[i] refers to number of ways to decode from i to s.length
// Loop from i = messageLength - 1 to 0
// if current char doesn't equal to 0, dp[i] = dp[i+1]
// if we can also decode a valid pair, dp[i] += dp[i+2]
// return dp[0] with final result
// O(n) time to go through each character in s and O(n) space for dp array
var numDecodings = function(s) {
 const messageLength = s.length;
 const dp = Array.from({ length: messageLength + 1 }, () => 0);
 dp[messageLength] = 1;
 
 for (let i = messageLength - 1; i >= 0; i--) {
   if (s[i] !== '0') {
     dp[i] = dp[i+1];
     if (i < messageLength - 1 && (s[i] === '1' || s[i] === '2' && s[i+1] < '7')) {
       dp[i] += dp[i+2];
     }
   }
 }
 
 return dp[0];
};`;

const bottomUpDpOptimizedCode = `/**
* @param {string} s
* @return {number}
*/
// Dynamic Programming Approach (Bottom Up Optimized)
// Rather than have a dp array, we can keep track of dp[i+1] aka dp1 and dp[i+2] aka dp2
// dp[i] if we had a dp array refers to number of ways to decode from i to s.length
// dp1 = 1, dp2 = 0
// Loop from i = messageLength - 1 to 0
// if current char equals 0, dp = 0
// if current char doesn't equal to 0, dp = dp1
// if we can also decode a valid pair, dp += dp2
// dp2 = dp1
// dp1 = dp
// return dp1
// O(n) time to go through each character in s and O(1) space for dp variables
var numDecodings = function(s) {
 const messageLength = s.length;
 let dp1 = 1;
 let dp2 = 0;
 for (let i = messageLength - 1; i >= 0; i--) {
   let dp = s[i] === '0' ? 0 : dp1;
   if (i < messageLength - 1 && (s[i] === '1' || s[i] === '2' && s[i+1] < '7')) {
     dp += dp2;
   }
   dp2 = dp1;
   dp1 = dp;
 }
 
 return dp1;
};`;

const DecodeWays: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/decode-ways/</p>
      <p>
        A message containing letters from A-Z can be encoded into numbers using
        the following mapping: A - 1 B - 2 ... Z - 26 To decode an encoded
        message, all the digits must be grouped then mapped back into letters
        using the reverse of the mapping above (there may be multiple ways). For
        example, 11106 can be mapped into: AAJF with the grouping (1 1 10 6) KJF
        with the grouping (11 10 6) Note that the grouping (1 11 06) is invalid
        because 06 cannot be mapped into F since 6 is different from 06. Given a
        string s containing only digits, return the number of ways to decode it.
        The test cases are generated so that the answer fits in a 32-bit integer
      </p>
      <Prism.Tabs>
        <Prism.Tab label="recursion.js" language="javascript">
          {recursionCode}
        </Prism.Tab>
        <Prism.Tab label="recursionMemoized.js" language="javascript">
          {recursionMemoizedCode}
        </Prism.Tab>
        <Prism.Tab label="bottomUpDp.js" language="javascript">
          {bottomUpDpCode}
        </Prism.Tab>
        <Prism.Tab label="bottomUpDpOptimized.js" language="javascript">
          {bottomUpDpOptimizedCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default DecodeWays;
