import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const binarySearchCode = `/**
* @param {number[]} arr
* @return {number}
*/
// Binary Search Approach
// left = 0;
// right = arr.length - 1
// while left <= right
// mid = left + Math.floor(right - left / 2)
// if arr[mid] > arr[mid+1], it's decreasing so we check if the peak can start more in the left half aka right = mid - 1, peakIndex = mid
// else it's still increasing so we check if the peak is in the right half aka left = mid + 1
// O(logN) time, O(1) space
var peakIndexInMountainArray = function(arr) {
 let left = 0;
 let right = arr.length - 1;
 let peakIndex = -1;

 // Binary search to find the peak index based on the arr[mid] > arr[mid+1]
 while (left <= right) {
   const mid = left + Math.floor((right - left) / 2);
   // It's decreasing though the peak can start more on the left half so we check there and set the peakIndex to mid
   if (arr[mid] > arr[mid + 1]) {
     right = mid - 1;
     peakIndex = mid;
   // It's increasing, so we check if the peak is in the right half
   } else {
     left = mid + 1;
   }
 }
 
 return peakIndex;
};`;

const PeakIndexInAMountainArray: NextPage = () => {
  return (
    <div>
      <p>
        Source: https://leetcode.com/problems/peak-index-in-a-mountain-array/
      </p>
      <p>{`Let's call an array arr a mountain if the following properties hold:
      arr.length >= 3
      There exists some i with 0 < i < arr.length - 1 such that:
        arr[0] < arr[1] < ... arr[i-1] < arr[i]
        arr[i] > arr[i+1] > ... > arr[arr.length - 1]
      Given an integer array arr that is guaranteed to be a mountain, return any i such that arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1].`}</p>
      <Prism.Tabs>
        <Prism.Tab label="binarySearch.js" language="javascript">
          {binarySearchCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default PeakIndexInAMountainArray;
