import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const bruteForceRecursionCode = `/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
// Brute Force Recursion
// Store all the words in a set for easier lookup and comparison
// If string length is zero, return true
// Loop through from 1 to length of string
// If the substring of 0 to i exists in the set and we recursively check the rest of the string can also be formed, we return true
// Otherwise, if we looped through the whole string
// O(2^N) time because can partition/cut the string in n+1 ways given length n i.e. 2 choices to either break the string at a certain point or continue on
// O(N) space for wordSet and recursion function stack
var wordBreak = function(s, wordDict) {
  const wordSet = new Set(wordDict);
  const wordBreakRec = (str) => {
    if (str.length === 0) {
      return true;
    }
    
    for (let i = 1; i <= str.length; i++) {
      const substring = str.substring(0, i);
      if (wordSet.has(substring) && wordBreakRec(str.substring(i))) {
        return true;
      }
    }
    
    return false;
  };
  
  return wordBreakRec(s);
};`;

const recursionMemoizedCode = `/**
* @param {string} s
* @param {string[]} wordDict
* @return {boolean}
*/
// Recursion with memoization
// Store all the words in a set for easier lookup and comparison
// Keep track of past results in memo object
// If string length is zero, return true
// Loop through from 1 to length of string
// If the substring of 0 to i exists in the set and we recursively check the rest of the string can also be formed, we return true
// Otherwise, if we looped through the whole string
// O(N^2) since memoized results
// O(N) space for wordSet/memo/recursion function stack
var wordBreak = function(s, wordDict) {
 const wordSet = new Set(wordDict);
 let memo = {};
 const wordBreakRec = (str) => {
   if (str.length === 0) {
     return true;
   }
   
   if (memo.hasOwnProperty(str)) {
     return memo[str];
   }
   
   for (let i = 1; i <= str.length; i++) {
     const substring = str.substring(0, i);
     if (wordSet.has(substring) && wordBreakRec(str.substring(i))) {
       memo[str] = true;
       return true;
     }
   }
   
   memo[str] = false;
   return false;
 };
 
 return wordBreakRec(s);
};`;

const dpBottomUpCode = `
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
// Dynamic Programming Bottom Up
// initialize a wordSet to help for easier substring comparison
// dp of size s.length + 1 where dp[i] = true means we can form a word from 0 to i; initialize it to all false
// dp[0] = true since empty string
// outer loop from i = 1 to s.length
// inner loop from j=0 to i
// if we can form up to j i.e. dp[j] and substring from j to i exists in wordSet
//   we set dp[i] to true and break to go onto the next i iteration since we can connect up to i
// return dp[s.length] to see if we can form the entire word
// O(N^3) time since double loop and substring formation, O(N) space for wordSet and dp array
var wordBreak = function(s, wordDict) {
  const wordSet = new Set(wordDict);
  let dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      const substring = s.substring(j, i);
      if (dp[j] && wordSet.has(substring)) {
        dp[i] = true;
        break;
      }
    }
  }
  
  return dp[s.length];
};`;

const WordBreak: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/word-break/</p>
      <p>
        Given a string s and a dictionary of strings wordDict, return true if s
        can be segmented into a space-separated sequence of one or more
        dictionary words. Note that the same word in the dictionary may be
        reused multiple times in the segmentation.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="bruteForceRecursion.js" language="javascript">
          {bruteForceRecursionCode}
        </Prism.Tab>
        <Prism.Tab label="recursionMemoized.js" language="javascript">
          {recursionMemoizedCode}
        </Prism.Tab>
        <Prism.Tab label="dpBottomUp.js" language="javascript">
          {dpBottomUpCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default WordBreak;
