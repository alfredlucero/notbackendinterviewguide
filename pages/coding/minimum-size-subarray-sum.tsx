import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const bruteForceCode = `/**
* @param {number} target
* @param {number[]} nums
* @return {number}
*/
// Brute force approach
// O(N^2) time, O(1) space
var minSubArrayLen = function(target, nums) {
 let minLength = Infinity;
 
 for (let i = 0; i < nums.length; i++) {
   let sum = 0;
   for (let j = i; j < nums.length; j++) {
     sum += nums[j];
     if (sum >= target) {
       minLength = Math.min(minLength, j - i + 1);
       break;
     }
   }
 }
 
 return minLength !== Infinity ? minLength : 0;
};`;

const slidingWindowCode = `/**
* @param {number} target
* @param {number[]} nums
* @return {number}
*/
// Sliding Window Approach
// O(N) time, O(1) space
var minSubArrayLen = function(target, nums) {
 let left = 0;
 let right = 0;
 let currentSum = 0;
 let minLength = Infinity;
 
 // Keep moving the right pointer and adding to sum until we have a sum greater than target
 while (right < nums.length) {
   currentSum += nums[right];
   
   // Shrink the window (move left pointer) as much as possible and update the min length while the sum is greater than target
   while (currentSum >= target) {
     minLength = Math.min(minLength, right - left + 1);
     
     // Make sure to remove the left side number and shrink the window
     currentSum -= nums[left];
     left++;
   }
   
   right++;
 }
 
 return minLength !== Infinity ? minLength : 0;
};`;

const MinimumSizeSubarraySum: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/minimum-size-subarray-sum/</p>
      <p>
        Given an array of positive integers nums and a positive integer target,
        return the minimal length of a contiguous subarray [numsl, numsl+1, ...,
        numsr-1, numsr] of which the sum is greater than or equal to target. If
        there is no such subarray, return 0 instead.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="bruteForce.js" language="javascript">
          {bruteForceCode}
        </Prism.Tab>
        <Prism.Tab label="slidingWindow.js" language="javascript">
          {slidingWindowCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default MinimumSizeSubarraySum;
