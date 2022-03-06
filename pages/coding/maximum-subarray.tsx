import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const maximumSubarrayCode = `/**
* @param {number[]} nums
* @return {number}
*/
// Approach
// Like a sliding window technique
// Keep track of max = -Infinity and runningSum = -Infinity
// For each num in nums
// Ask is the running sum + num greater than the current number? running sum + num
// If it's less than the current number, the running sum is the current number to ignore the running sums that would make it for sure less than the max
// Update the max number
// O(N) time, O(1) space
var maxSubArray = function(nums) {
 let max = -Infinity;
 let runningSum = -Infinity;
 
 nums.forEach((num) => {
   if (runningSum + num > num) {
     runningSum += num;
   } else {
     runningSum = num;
   }
   max = Math.max(runningSum, max);
 });
 
 return max;
};`;

const MaximumSubarray: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/maximum-subarray/</p>
      <p>
        Given an integer array nums, find the contiguous subarray (containing at
        least one number) which has the largest sum and return its sum. A
        subarray is a contiguous part of an array.
      </p>
      <Prism language="javascript">{maximumSubarrayCode}</Prism>
    </div>
  );
};

export default MaximumSubarray;
