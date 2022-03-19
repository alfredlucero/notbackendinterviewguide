import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const recursionCode = `/**
* @param {number[]} nums
* @param {number} target
* @return {number}
*/
/*
 Recursion Unoptimized Approach:
 Can recursively try to add the current number or subtract the current number and check if at the end it reaches the target sum
 Since we're making 2 choices every time in the recursive step, this involves O(2^n) time plus the call stack space usage
*/
var findTargetSumWays = function(nums, target) {
 function recFindTargetSumWays(currentIndex, currentSum) {
   // Base Cases
   // Once we hit the end of the array, we check if the currentSum matches with the target 
   // If it does, we bump the numResultsReachingTarget
   if (currentIndex >= nums.length && currentSum === target) {
     numResultsReachingTarget += 1;
     return;
   // Otherwise, we return and don't bump anything
   } else if (currentIndex >= nums.length && currentSum !== target) {
     return;
   }
   
   // Recursive Step
   // Figure out if we can reach the target sum by recursively adding the currentNum or subtracting the currentNum 
   const currentNum = nums[currentIndex];
   recFindTargetSumWays(currentIndex+1, currentSum + currentNum);
   recFindTargetSumWays(currentIndex+1, currentSum - currentNum);
 }
 
 let numResultsReachingTarget = 0;
 recFindTargetSumWays(0, 0);
 return numResultsReachingTarget
};`;

const recursion2Code = `/**
* @param {number[]} nums
* @param {number} target
* @return {number}
*/
/*
 Recursion Unoptimized Approach 2:
 Can recursively try to add the current number or subtract the current number and check if at the end it reaches the target sum
 Since we're making 2 choices every time in the recursive step, this involves O(2^n) time plus the call stack space usage
*/
var findTargetSumWays = function(nums, target) {
 function recFindTargetSumWays(currentIndex, currentSum) {
   // Base Cases
   // Once we hit the end of the array, we check if the currentSum matches with the target 
   // If it does, we return 1
   if (currentIndex >= nums.length && currentSum === target) {
     return 1;
   // Otherwise, we return 0
   } else if (currentIndex >= nums.length && currentSum !== target) {
     return 0;
   }
   
   // Recursive Step
   // Figure out if we can reach the target sum by recursively adding the currentNum or subtracting the currentNum 
   const currentNum = nums[currentIndex];
   const addingCurrentNumResult = recFindTargetSumWays(currentIndex + 1, currentSum + currentNum);
   const subtractingCurrentNumResult = recFindTargetSumWays(currentIndex + 1, currentSum - currentNum);
   
   // Return the number of ways from adding vs. subtracting
   return addingCurrentNumResult + subtractingCurrentNumResult;
 }
 
 return recFindTargetSumWays(0, 0);
};`;

const recursionMemoizedCode = `/**
* @param {number[]} nums
* @param {number} target
* @return {number}
*/
/*
 Recursion Memoized Approach:
 Can recursively try to add the current number or subtract the current number and check if at the end it reaches the target sum
 Since we're making 2 choices every time in the recursive step, this involves O(2^n) time
 To prevent computing the same subproblems and avoid stack overflow, we can memoize the result for the "currentIndex, currentSum" i.e. "1,1" and reuse that later to save space
*/
var findTargetSumWays = function(nums, target) {
 function recFindTargetSumWays(currentIndex, currentSum) {
   const memoIndex = \`$\{currentIndex\},$\{currentSum\}\`;
   // Base Cases
   // If it's already computed in the memo, we return that instead
   if (memo.hasOwnProperty(memoIndex)) {
     return memo[memoIndex];
   }
   // Once we hit the end of the array, we check if the currentSum matches with the target 
   // If it does, we return 1
   else if (currentIndex >= nums.length && currentSum === target) {
     return 1;
   // Otherwise, we return 0
   } else if (currentIndex >= nums.length && currentSum !== target) {
     return 0;
   }
   
   // Recursive Step
   // Figure out if we can reach the target sum by recursively adding the currentNum or subtracting the currentNum 
   const currentNum = nums[currentIndex];
   const addingCurrentNumResult = recFindTargetSumWays(currentIndex + 1, currentSum + currentNum);
   const subtractingCurrentNumResult = recFindTargetSumWays(currentIndex + 1, currentSum - currentNum);
   
   // Store it in the memo the result of number of ways from adding vs. subtracting
   memo[memoIndex] = addingCurrentNumResult + subtractingCurrentNumResult;
   
   return memo[memoIndex];
 }
 
 const memo = {};
 return recFindTargetSumWays(0, 0);
};`;

const TargetSum: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/target-sum/</p>

      <Prism.Tabs>
        <Prism.Tab label="targetSumRecursion.js" language="javascript">
          {recursionCode}
        </Prism.Tab>
        <Prism.Tab label="targetSumRecursion2.js" language="javascript">
          {recursion2Code}
        </Prism.Tab>
        <Prism.Tab label="targetSumRecursionMemoized.js" language="javascript">
          {recursionMemoizedCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default TargetSum;
