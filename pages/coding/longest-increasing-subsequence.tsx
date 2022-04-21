import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const bruteForceRecursionCode = `/**
* @param {number[]} nums
* @return {number}
*/
// Brute Force Recursion
// We will keep track of the max of either taking or not taking the current number to be part of the longest increasing subsequence (lis)
// We can only take when the current number is greater than the previous number we took
// O(2^N) time, O(N) space and max recursion stack
var lengthOfLIS = function(nums) {
 function lisRecursive(i, prev) {
   // Base Case: When we can't pick anymore numbers
   if (i >= nums.length) {
     return 0;
   }
   
   // Recursively don't take this current number
   let dontTakeLis = lisRecursive(i + 1, prev);
   
   // Recursively take this current number if it's greater than the previous one
   let takeLis = 0;
   if (nums[i] > prev) {
     takeLis = 1 + lisRecursive(i + 1, nums[i]);
   }
   
   // Return whichever is larger from the recursive paths of taking or not taking the current valid number
   return Math.max(takeLis, dontTakeLis);
 }
 
 return lisRecursive(0, -Infinity);
};`;

const dpBottomUpCode = `/**
* @param {number[]} nums
* @return {number}
*/
// Dynamic Programming: Bottoms Up
// Compute a dp array of size nums.length where dp[i] represents the longest increasing subsequence up to that index i
// Initialize dp array with all 1s since at a minimum the longest increasing subsequence is 1 when we start at each element in the array
// Loop from i = 0 to nums.length
//  Loop from j = 0 to i (check nums[j] leading up to i to keep track of numbers less than the current nums[i])
//    if nums[i] > nums[j]
//      we set dp[i] to the max of dp[i] (without adding the number to the sequence) or dp[j] + 1 (adding the number to the sequence)
//      update overall longest increasing subsequence based on new dp[i]
// O(N^2) time for nested loops, O(N) space for dp array
var lengthOfLIS = function(nums) {
 // Initialize dp array of size nums.length where dp[i] represents the longest increasing subsequence up to that index i
 // We fill it with all 1s since the minimum lis is 1 when we start at each element in nums
 const dp = new Array(nums.length).fill(1);
 
 let lis = 1;
 
 // When we go through each nums[i] and check the nums[j] up to nums[i]
 // if the nums[j] before nums[i] is less, we will update the max of dp[i] based on taking that number i.e. dp[j] + 1 or not taking that number i.e. dp[i] and update the overall lis
 for (let i = 0; i < nums.length; i++) {
   for (let j = 0; j < i; j++) {
     if (nums[i] > nums[j]) {
       dp[i] = Math.max(dp[i], dp[j] + 1);
       lis = Math.max(dp[i], lis);
     }
   }
 }
 
 return lis;
};`;

const LongestIncreasingSubsequence: NextPage = () => {
  return (
    <div>
      <p>
        Source: https://leetcode.com/problems/longest-increasing-subsequence/
      </p>
      <p>
        Given an integer array nums, return the length of the longest strictly
        increasing subsequence. A subsequence is a sequence that can be derived
        from an array by deleting some or no elements without changing the order
        of the remaining elements. For example, [3,6,2,7] is a subsequence of
        the array [0,3,1,6,2,2,7].
      </p>
      <Prism.Tabs>
        <Prism.Tab label="bruteForceRecursion.js" language="javascript">
          {bruteForceRecursionCode}
        </Prism.Tab>
        <Prism.Tab label="dpBottomUp.js" language="javascript">
          {dpBottomUpCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default LongestIncreasingSubsequence;
