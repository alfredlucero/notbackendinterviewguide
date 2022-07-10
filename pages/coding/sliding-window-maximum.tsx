import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const bruteForceCode = `/**
* @param {number[]} nums
* @param {number} k
* @return {number[]}
*/
// Brute force approach
// O(Nk) time, O(N) space for output
// Keep moving a sliding window of size k and adding to output
var maxSlidingWindow = function(nums, k) {
 const output = Array.from({ length: nums.length - k + 1 }, () => -Infinity);
 
 for (let i = 0; i < nums.length - k + 1; i++) {
   let max = -Infinity;
   for (let j = i; j < i + k; j++) {
     max = Math.max(nums[j], max);
   }
   output[i] = max;
 }
 
 return output;
};`;

const dpCode = `/**
* @param {number[]} nums
* @param {number} k
* @return {number[]}
*/
// Dynamic Programming Approach
// O(N) time, O(N) space
var maxSlidingWindow = function(nums, k) {
 // Form left window block maxes from left to right
 const left = Array.from({ length: nums.length }, () => -Infinity);
 left[0] = nums[0];
 for (let i = 1; i < left.length; i++) {
   if (i % k === 0) {
     left[i] = nums[i];
   } else {
     left[i] = Math.max(left[i-1], nums[i]);
   }
 }
 
 // Form right window block maxes from right to left
 const right = Array.from({ length: nums.length }, () => -Infinity);
 right[nums.length - 1] = nums[nums.length - 1];
 for (let j = nums.length - 2; j >= 0; j--) {
   if (j % k === 0) {
     right[j] = nums[j];
   } else {
     right[j] = Math.max(right[j + 1], nums[j]);
   }
 }
 
 // Build output from left and right window block maxes
 const output = Array.from({ length: nums.length - k + 1 }, () => -Infinity);
 for (let i = 0; i < nums.length - k + 1; i++) {
   output[i] = Math.max(right[i], left[i + k - 1]);
 }
 
 return output;
};`;

const SlidingWindowMaximum: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/sliding-window-maximum/</p>
      <p>
        You are given an array of integers nums, there is a sliding window of
        size k which is moving from the very left of the array to the very
        right. You can only see the k numbers in the window. Each time the
        sliding window moves right by one position. Return the max sliding
        window.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="bruteForce.js" language="javascript">
          {bruteForceCode}
        </Prism.Tab>
        <Prism.Tab label="dp.js" language="javascript">
          {dpCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default SlidingWindowMaximum;
