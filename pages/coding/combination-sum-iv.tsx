import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const recursionCode = `/**
* @param {number[]} nums
* @param {number} target
* @return {number}
*/
/*
 Recursion Approach
 Either we take the current number (and go back to start index) or skip the current number and go to next index
 Base Cases
 If the current sum is > target or the index is >= nums.length -> return 0
 If the current sum === target -> return 1
 Recursive Step
 takeCombinations = rec(0, currentSum + nums[index])
 skipCombinations = rec(index + 1, currentSum)
 return takeCombinations + skipCombinations
*/
var combinationSum4 = function(nums, target) {
 function rec(currentIndex, currentSum) {
   if (currentSum === target) {
     return 1;
   }
   if (currentSum > target || currentIndex >= nums.length) {
     return 0;
   }
   
   const takeCombinations = rec(0, currentSum + nums[currentIndex]);
   const skipCombinations = rec(currentIndex + 1, currentSum);
   
   return takeCombinations + skipCombinations;
 }
 
 return rec(0, 0);
};`;

const recursionMemoizedCode = `/**
* @param {number[]} nums
* @param {number} target
* @return {number}
*/
/*
 Recursion Memoized Approach
 Either we take the current number (and go back to start index) or skip the current number and go to next index
 Base Cases
 If the current sum is > target or the index is >= nums.length -> return 0
 If the current sum === target -> return 1
 Recursive Step
 takeCombinations = rec(0, currentSum + nums[index])
 skipCombinations = rec(index + 1, currentSum)
 return takeCombinations + skipCombinations
 
 Memoize with cache object based on currentIndex and currentSum
*/
var combinationSum4 = function(nums, target) {
 const cache = {};
 function rec(currentIndex, currentSum) {  
   if (currentSum === target) {
     return 1;
   }
   if (currentSum > target || currentIndex >= nums.length) {
     return 0;
   }
   
   const cacheKey = \`\$\{currentIndex\}-\$\{currentSum\}\`;
   if (cache.hasOwnProperty(cacheKey)) {
     return cache[cacheKey];
   }
   
   const takeCombinations = rec(0, currentSum + nums[currentIndex]);
   const skipCombinations = rec(currentIndex + 1, currentSum);
   
   const totalCombinations = takeCombinations + skipCombinations;
   cache[cacheKey] = totalCombinations;
   
   return totalCombinations;
 }
 
 return rec(0, 0);
};`;

const bottomUpDpCode = `/**
* @param {number[]} nums
* @param {number} target
* @return {number}
*/
/*
 Bottom Up DP Approach
 Try and build up to the target sum with a dp array of size target + 1
 dp[target] will have total combinations  
 
 dp[i] = dp[i] + dp[i - currentNum] as long as i >= n
 
 n = nums.length
 t = target
 Time: O(n*t); Space: O(t)
*/
var combinationSum4 = function(nums, target) {
 const dp = Array.from({ length: target + 1 }, () => 0);
 dp[0] = 1;
 
 for (let i = 1; i <= target; i++) {
   for (let j = 0; j < nums.length; j++) {
     const currentNum = nums[j];
     if (i >= currentNum) {
       dp[i] = dp[i] + dp[i - currentNum];
     }
   }
 }
 
 return dp[target];
};`;

const CombinationSumIV: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/combination-sum-iv/</p>
      <p>
        Given an array of distinct integers nums and a target integer target,
        return the number of possible combinations that add up to target. The
        test cases are generated so that the answer can fit in a 32-bit integer.
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
      </Prism.Tabs>
    </div>
  );
};

export default CombinationSumIV;
