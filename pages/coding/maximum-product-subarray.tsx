import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const iterativeCode = `/**
* @param {number[]} nums
* @return {number}
*/
// Cases to consider:
// 0 i.e. [-2, 0, -1] => 0
// Two negatives making a positive i.e. [2,-1,-10] -> 20
// All negatives i.e. [-2,-1,-10] -> 10
// Some positive and negatives [2,3,-2,4] -> 6
// Only one number [1] => 1
//
// Brute force would be like O(N^3) time, O(1) space
// Checking all possible subarrays i.e. from length 1 to n and finding the max from that
// Or O(N^2) if we had nested loops to do the same thing i -> n and j starting at i to n and computing the prefix product along the way
// Can't sort since order matters for contiguous non-empty subarray

// Brainstorm:
// [2,3,-2,4] => can prefixProduct [2,6,-12,-48] and/or suffixProduct [-48,-24,-8,4] help us find the answer?
// It breaks if we have zeroes i.e. [2,0,5,0,4] => [2,0,0,0,0] or [4,0,0,0,0]
// How about slightly modified prefixProduct and suffixProduct to account for zeroes and restarting the multiplier?
// [-2,0,-1] => [-2,0,-1] and [-1,0,-2] => Max is 0
// [4,0,5,2,0] => [4,0,5,10,0] and [0,2,10,0,4] => Max is 10
// [2,-1,-10] => [2,-2,20] and [-10,10,20] => Max is 20
// [-2,-1,-10] => [-2,2,-20] and [-10,10,-20] => Max is 10
// O(N) time to compute modified prefix and suffix products and keep track of max with O(1) space
var maxProduct = function(nums) {
 let max = -Infinity;
 
 // Compute modified prefix product and keep track of max seen so far
 // [4,0,5,2] => [4,0,5,10]
 // [2,-1,-10] => [2,-2,20]
 let currentProduct = 1;
 for (let i = 0; i < nums.length; i++) {
   const currentNum = nums[i];
   currentProduct *= currentNum;
   max = Math.max(max, currentProduct);

   // Whenever we multiply by zero, we reset the currentProduct back to 1 so we can continue to prefix multiply the rest
   if (currentProduct === 0) {
     currentProduct = 1;
   }
 }
 
 // Compute modified suffix product and keep track of max seen so far
 // [4,0,5,2] => [2,10,0,4]
 // [2,-1,-10] => [-10,10,20]
 currentProduct = 1;
 for (let j = nums.length - 1; j > 0; j--) {
   const currentNum = nums[j];
   currentProduct *= currentNum;
   max = Math.max(max, currentProduct);
   
   // Whenever we encounter a zero, we reset the currentProduct back to 1 so we can continue to suffix multiply the rest
   if (currentProduct === 0) {
     currentProduct = 1;
   }
 }
 
 return max;
};`;

const minMaxCode = `/**
* @param {number[]} nums
* @return {number}
*/
// Dynamic Programming
// Keeping track of the currentMin and currentMax seen so far and multiplying it by the currentNum to see if it updates the overall max
// Loop through each num in nums
// Check to see currentMin = minimum of currentNum * currentMin and currentNum * currentMax and currentNum
// Check to see currentMax = maximum of currentNum * currentMin and currentNum * currentMax and currentNum
// Update overallMax if currentMax is greater
// O(N) time, O(1) space
var maxProduct = function(nums) {
 let overallMax = -Infinity;  
 let currentMin = 1;
 let currentMax = 1;
 
 nums.forEach((currentNum) => {
   const tempCurrentMax = currentMax;
   currentMax = Math.max(tempCurrentMax * currentNum, currentNum * currentMin, currentNum);
   currentMin = Math.min(tempCurrentMax * currentNum, currentNum * currentMin, currentNum);
   
   overallMax = Math.max(overallMax, currentMax);
 });
 
 return overallMax;
};`;

const MaximumProductSubarray: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/maximum-product-subarray/</p>
      <p>
        Given an integer array nums, find a contiguous non-empty subarray within
        the array that has the largest product, and return the product. The test
        cases are generated so that the answer will fit in a 32-bit integer. A
        subarray is a contiguous subsequence of the array.
      </p>
      <Prism.Tabs>
        <Prism.Tab language="javascript" label="prefixSuffixProduct.js">
          {iterativeCode}
        </Prism.Tab>
        <Prism.Tab language="javascript" label="minMax.js">
          {minMaxCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};
export default MaximumProductSubarray;
