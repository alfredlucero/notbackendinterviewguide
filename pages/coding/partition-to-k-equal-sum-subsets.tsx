import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const recursionBacktrackingCode = `/**
* @param {number[]} nums
* @param {number} k
* @return {boolean}
*/
// For each subset, find numbers to put in it
// Only possible to partition to k subsets if totalSum % k === 0; otherwise false
// Recursion with backtracking approach
// We'll also sort the nums in descending order to help with putting numbers into buckets
// While we have some subsets to find, we will keep track of a visited array
// If the currentSum === subsetSum, we recursively if we can find k - 1 subsets
// For each number starting at the currentIndex to nums.length
// We check if number is not yet visited and currentSum + nums[i] <= subsetSum 
// if so, we mark as visited
// we check to see if we can partition based on adding the number to currentSum and moving currentIndex forward; return true if possible
// otherwise, we unmark the number as visited
// return false if we've gone through all the numbers in that recursive path
// O(k * 2^n) time
var canPartitionKSubsets = function(nums, k) {
 const totalSum = nums.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
 if (totalSum % k !== 0) {
   return false;
 }
 const subsetSum = totalSum / k;
 const sortedNums = nums.sort().reverse();
 const visited = Array.from({ length: nums.length }, () => false);
 
 const canPartition = (restK, currentSum, currentIndex) => {
   if (restK === 1) {
     return true;
   }
   
   if (currentSum === subsetSum) {
     return canPartition(restK - 1, 0, 0);
   }
   
   for (let i = currentIndex; i < nums.length; i++) {
     if (!visited[i] && currentSum + nums[i] <= subsetSum) {
       visited[i] = true;
       if (canPartition(restK, currentSum + nums[i], i + 1)) {
         return true;
       }
       visited[i] = false;
     }
   }
   return false;
 };
 
 return canPartition(k, 0, 0);
};`;

const PartitionToKEqualSumSubsets: NextPage = () => {
  return (
    <div>
      <p>
        Source: https://leetcode.com/problems/partition-to-k-equal-sum-subsets/
      </p>
      <p>
        Given an integer array nums and an integer k, return true if it is
        possible to divide this array into k non-empty subsets whose sums are
        all equal.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="recursionBacktracking.js" language="javascript">
          {recursionBacktrackingCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default PartitionToKEqualSumSubsets;
