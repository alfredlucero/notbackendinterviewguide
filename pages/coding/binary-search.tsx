import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const binarySearchCode = `/**
* @param {number[]} nums
* @param {number} target
* @return {number}
*/
// Binary Search
// O(logn) time, O(1) space
var search = function(nums, target) {
 let left = 0;
 let right = nums.length - 1;
 
 // Keep searching either the left or right half depending on the mid number
 while (left <= right) {
   const mid = left + Math.floor((right - left) / 2);
   
   // We found the number, return the index
   if (nums[mid] === target) {
     return mid;
   }
   
   // Target must be in right half since mid is less than target
   if (nums[mid] < target) {
     left = mid + 1;
   }
   
   // Target must be in left half since mid is greater than target
   if (nums[mid] > target) {
     right = mid - 1;
   }
 }
 
 // Couldn't find it, so we return -1
 return -1;
};`;

const BinarySearch: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/binary-search</p>
      <p>
        Given an array of integers nums which is sorted in ascending order, and
        an integer target, write a function to search target in nums. If target
        exists, then return its index. Otherwise, return -1. You must write an
        algorithm with O(log n) runtime complexity.
      </p>
      <Prism language="javascript">{binarySearchCode}</Prism>
    </div>
  );
};

export default BinarySearch;
