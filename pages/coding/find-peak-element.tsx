import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const binarySearchCode = `/**
* @param {number[]} nums
* @return {number}
*/
var findPeakElement = function(nums) {
 let left = 0;
 let right = nums.length - 1;
 
 while (left < right) {
   let mid = left + Math.floor((right - left) / 2);
   // If we're on a rising slope, keep on checking the right half
   if (nums[mid] < nums[mid+1]) {
     left = mid + 1;
   // Otherwise, we could be on a descending slope or at the peak already, so we check the left half
   } else {
     right = mid; 
   }
 }
 
 return left;
};`;

const FindPeakElement: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/find-peak-element/</p>
      <p>{`A peak element is an element that is strictly greater than its neighbors.

Given an integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.

You may imagine that nums[-1] = nums[n] = -∞.

You must write an algorithm that runs in O(log n) time.`}</p>
      <Prism.Tabs>
        <Prism.Tab label="binarySearch.js" language="javascript">
          {binarySearchCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default FindPeakElement;
