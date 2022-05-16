import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const recursionCode = `/**
* @param {number[]} nums
* @return {boolean}
*/
// Recursion Approach
// Only possible to find two equal subsets if sum(nums) is even
// If it's odd we return false right away
// Need to find a subset that adds up to target where it is sum(nums) / 2
// Can use a recursive helper with currentIndex passed through and currentTarget
// Base Cases
// if currentIndex is outside of bounds i.e. >= nums.length or currentTarget < 0 (overshot it), return false
// if currentIndex is within bounds and currentTarget is 0, return true
// Recursive Step
// Can make 2 choices at each currentIndex element: either we can add the current element to the subset or skip it
// We can check recursively if we can partition by adding the current element 
// i.e. rec(currentIndex + 1, currentTarget - nums[currentIndex]) or 
// skipping the current element i.e. rec(currentIndex + 1, currentTarget)
// O(2^n) time and O(n) function stack space
var canPartition = function(nums) {
 const totalSum = nums.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
 
 // Not possible to find 2 equal subsets if total sum is odd, so we return false
 if (totalSum % 2 === 1) {
   return false;
 }
 
 // It's possible to find 2 equal subsets if total sum is even, so we divide it by 2 and that is our target to find a subset that adds up to this
 const target = totalSum / 2;
 
 const rec = (currentIndex, currentTarget) => {
   // If currentIndex is out of bounds or we overshot the target, we can't partition
   if (currentIndex >= nums.length || currentTarget < 0) {
     return false;
   }
   // If currentTarget is within bounds and currentTarget is 0, we have 2 equal subsets to partition
   if (currentTarget === 0) {
     return true;
   }
   
   // Recursively check if we can add the current element to the subset or skip it
   const canPartitionWithNum = rec(currentIndex + 1, currentTarget - nums[currentIndex]);
   const canPartitionWithoutNum = rec(currentIndex + 1, currentTarget);
   
   return canPartitionWithNum || canPartitionWithoutNum;
 };
 
 return rec(0, target);
};`;

const recursionMemoizedCode = `/**
* @param {number[]} nums
* @return {boolean}
*/
// Recursion Memoized Approach
// Only possible to find two equal subsets if sum(nums) is even
// If it's odd we return false right away
// Need to find a subset that adds up to target where it is sum(nums) / 2
// Can use a recursive helper with currentIndex passed through and currentTarget
// Keep track of a memo object that will cache like memo[currentIndex-currentTarget] = true/false to avoid recomputing subproblems
// Base Cases
// if currentIndex is outside of bounds i.e. >= nums.length or currentTarget < 0 (overshot it), return false
// if currentIndex is within bounds and currentTarget is 0, return true
// Recursive Step
// Can make 2 choices at each currentIndex element: either we can add the current element to the subset or skip it
// We can check recursively if we can partition by adding the current element 
// i.e. rec(currentIndex + 1, currentTarget - nums[currentIndex]) or 
// skipping the current element i.e. rec(currentIndex + 1, currentTarget)
// O(n * sum(nums)) time/space; go through all nums and we are iterating at most sum of nums (target = sum(nums) / 2) time for each number
var canPartition = function(nums) {
 const totalSum = nums.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
 
 // Not possible to find 2 equal subsets if total sum is odd, so we return false
 if (totalSum % 2 === 1) {
   return false;
 }
 
 // It's possible to find 2 equal subsets if total sum is even, so we divide it by 2 and that is our target to find a subset that adds up to this
 const target = totalSum / 2;
 
 // Keep track of computed partition results i.e. memo[currentIndex-currentTarget] = true/false
 const memo = {};
 
 const rec = (currentIndex, currentTarget) => {
   const memoKey = \`$\{currentIndex\}-$\{currentTarget\}\`;
   if (memo.hasOwnProperty(memoKey)) {
     return memo[memoKey];
   }
   
   // If currentIndex is out of bounds or we overshot the target, we can't partition
   if (currentIndex >= nums.length || currentTarget < 0) {
     memo[memoKey] = false;
     return false;
   }
   // If currentTarget is within bounds and currentTarget is 0, we have 2 equal subsets to partition
   if (currentTarget === 0) {
     return true;
   }
   
   // Recursively check if we can add the current element to the subset or skip it
   const canPartitionWithNum = rec(currentIndex + 1, currentTarget - nums[currentIndex]);
   const canPartitionWithoutNum = rec(currentIndex + 1, currentTarget);
   
   const canPartitionResult = canPartitionWithNum || canPartitionWithoutNum;
   memo[memoKey] = canPartitionResult;
   
   return canPartitionResult;
 };
 
 return rec(0, target);
};`;

const dpBottomUpCode = `/**
* @param {number[]} nums
* @return {boolean}
*/
// Dynamic Programming Bottom Up Approach
// Can't partition into equal subset sums if sum(nums) is odd; only possible if even
// Goal is to see if we can find a subset that sums up to target aka sum(nums) / 2
// Initialize a dp set to keep track of the subset sums
// Loop backwards from the end of nums
//   initialize a current dp set
//   loop through each currentSetNum in dp set
//     currentNum will be added to the set by adding currentNum to each number already in the set
//     i.e. dp.add(currentNum + currentSetNum)
//      add currentNum to the set as well i.e. dp.add(currentNum)
//     if currentNum + currentSetNum === target, return true
// return false at the end as we couldn't find any subset sum equal to the target
// O(n * sum(nums)) time, O(sum(nums)) space with dp set
var canPartition = function(nums) {
 const totalSum = nums.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
 
 // Not possible to find 2 equal subsets if total sum is odd, so we return false
 if (totalSum % 2 === 1) {
   return false;
 }
 
 // It's possible to find 2 equal subsets if total sum is even, so we divide it by 2 and that is our target to find a subset that adds up to this
 const target = totalSum / 2;
 
 // Initialize dp set to keep track of subset sums
 // Add 0 to it to start off
 let dp = new Set();
 dp.add(0);
 
 for (let i = nums.length - 1; i >= 0; i--) {
   const currentNum = nums[i];
   const currentDp = new Set();
   for (const currentSetNum of dp) {
     if (currentSetNum + currentNum === target) {
       return true;
     }
     currentDp.add(currentSetNum + currentNum);
     currentDp.add(currentSetNum);
   }
   dp = currentDp;
 }
 
 return false;
};`;

const PartitionEqualSubsetSum: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/partition-equal-subset-sum/</p>
      <p>
        Given a non-empty array nums containing only positive integers, find if
        the array can be partitioned into two subsets such that the sum of
        elements in both subsets is equal.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="recursion.js" language="javascript">
          {recursionCode}
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

export default PartitionEqualSubsetSum;
