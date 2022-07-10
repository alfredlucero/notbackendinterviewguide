import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const bruteForceCode = `/**
* @param {number[]} height
* @return {number}
*/
// Brute force approach
// Loop through each element i starting on the second element up to the second to last element (since we can't capture rain at the edges)
// For each element i, we will find the max element to the left greater than or equal to the the current element and the max element to the right greater than or equal to the current element
// We add onto the result the min(max of the left, max of the right) - current element's height 
// Time: O(n^2); Space: O(1)
var trap = function(height) {
 // We need at least 3 height walls to trap rain
 if (height.length < 3) {
   return 0;
 }
 
 let trappedRain = 0;
 
 for (let i = 1; i < height.length - 1; i++) {
   // Find the max to the left greater than or equal to the current element
   let leftMax = height[i];
   for (let l = 0; l < i; l++) {
     leftMax = Math.max(leftMax, height[l]);
   }
   
   // Find the max to the right greater than or equal to the current element
   let rightMax = height[i];
   for (let r = i + 1; r < height.length; r++) {
     rightMax = Math.max(rightMax, height[r]);
   }
   
   // Add onto the result the minimum of the max of the left and max of the right minus the current height
   trappedRain += Math.min(leftMax, rightMax) - height[i];
 }
 
 return trappedRain;
};`;

const dpCode = `/**
* @param {number[]} height
* @return {number}
*/
// O(N) time, O(N) space
var trap = function(height) {
 // Find max height of bar from left end up to index i
 const leftMax = Array.from({ length: height.length }, () => 0);
 let currentLeftMax = -Infinity;
 for (let left = 0; left < height.length; left++) {
   currentLeftMax = Math.max(height[left], currentLeftMax);
   leftMax[left] = currentLeftMax;
 }
 
 // Find max height of bar from right end up to index i
 const rightMax = Array.from({ length: height.length }, () => 0);
 let currentRightMax = -Infinity;
 for (let right = height.length - 1; right >= 0; right--) {
   currentRightMax = Math.max(height[right], currentRightMax);
   rightMax[right] = currentRightMax;
 }
 
 // Loop from the second element to the second to last element and add the trapped rain water using the max heights of left and right up that index
 let trappedRain = 0;
 for (let i = 1; i < height.length - 1; i++) {
   trappedRain += Math.min(leftMax[i], rightMax[i]) - height[i];
 }
 
 return trappedRain;
};`;

const twoPointersCode = `/**
* @param {number[]} height
* @return {number}
*/
// O(N) time, O(1) space
var trap = function(height) {
 // Two pointer approach
 let left = 0;
 let right = height.length - 1;
 let leftMax = 0;
 let rightMax = 0;
 let trappedRain = 0;
 while (left < right) {
   if (height[left] < height[right]) {
     if (height[left] >= leftMax) {
       leftMax = height[left];
     } else {
       trappedRain += leftMax - height[left];
     }
     left++;
   } else {
     if (height[right] >= rightMax) {
       rightMax = height[right];
     } else {
       trappedRain += rightMax - height[right];
     }
     right--;
   }
 }
 
 return trappedRain;
};`;

const TrappingRainWater: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/trapping-rain-water/</p>
      <p>
        Given n non-negative integers representing an elevation map where the
        width of each bar is 1, compute how much water it can trap after
        raining.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="bruteForceTrap.js" language="javascript">
          {bruteForceCode}
        </Prism.Tab>
        <Prism.Tab label="dp.js" language="javascript">
          {dpCode}
        </Prism.Tab>
        <Prism.Tab label="twoPointers.js" language="javascript">
          {twoPointersCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default TrappingRainWater;
