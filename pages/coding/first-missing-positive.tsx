import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const firstMissingPositiveCode = `/**
* @param {number[]} nums
* @return {number}
*/
// Intuition: 
// All negative numbers/0 can be ignored; if all negative, the smallest positive integer is 1 i.e. [-1,-2] => 1
// If all numbers in array of n elements are consecutive i.e. [1,2,3,4,5] and from the range 1-n; the next smallest positive integer is n + 1 i.e. 6
// All numbers outside the range 1-n like 0,-1, n+2 can be replaced with a number like n+1
// First missing positive number is in range 1-n i.e. [-1,1,3,4] => 2 or [1,2,10,11,100] => 3 
// Or first missing positive number is n+1 if all numbers 1-n exist i.e. [1,2] => 3
// Approach: 
// Replace all negative numbers, 0, and those greater than nums.length with nums.length + 1 to safely ignore
// Loop through the numbers and mark numbers in their proper index (number - 1) as negative to note a positive number that exists already from 1-nums.length
// Loop through the marked numbers and once we see a number is positive, the index + 1 is the first missing positive number
// Otherwise, we know we saw consecutive positive numbers from 1-nums.length so we return nums.length+1
var firstMissingPositive = function(nums) {
 // Replace all numbers (negative, zero, > nums.length) that we can ignore with nums.length + 1
 for (let i = 0; i < nums.length; i++) {
   const currentNum = nums[i];
   if (currentNum <= 0 || currentNum > nums.length) {
     nums[i] = nums.length + 1;
   }
 }
 
 // Loop through the numbers and mark numbers in their proper index (currentNum - 1) as negative to denote the associated positive number already exists
 for (let i = 0; i < nums.length; i++) {
   const currentNum = Math.abs(nums[i]) - 1;
   if (nums[currentNum] > 0 && currentNum <= nums.length) {
     nums[currentNum] *= -1;
   }
 }
 
 // Loop through the marked numbers and once we see a number is positive (doesn't exist), we found the smallest missing positive number (i + 1)
 for (let i = 0; i < nums.length; i++) {
   if (nums[i] > 0) {
     return i + 1;
   }
 }
 // Otherwise, the numbers must all be consecutive positive numbers from 1-nums.length, so we return nums.length + 1
 return nums.length + 1;
};`;

const FirstMissingPositive: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/first-missing-positive/</p>
      <p>
        Given an unsorted integer array nums, return the smallest missing
        positive integer. You must implement an algorithm that runs in O(n) time
        and uses constant extra space.
      </p>

      <Prism language="javascript">{firstMissingPositiveCode}</Prism>
    </div>
  );
};

export default FirstMissingPositive;
