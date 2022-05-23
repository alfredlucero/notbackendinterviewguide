import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const twoPointersCode = `/**
* @param {number[]} arr
* @param {number} k
* @param {number} x
* @return {number[]}
*/
// Two Pointers Approach
// O(n - k) time, O(1) space
var findClosestElements = function(arr, k, x) {
 let left = 0;
 let right = arr.length - 1;
 
 // Reduce the window until we have k closest elements
 while (right - left >= k) {
   if (x - arr[left] <= arr[right] - x) {
     right--;
   } else {
     left++;
   }
 }
 
 return arr.slice(left, right + 1);
};`;

const twoPointersBinarySearchCode = `/**
* @param {number[]} arr
* @param {number} k
* @param {number} x
* @return {number[]}
*/
// Two Pointers + Binary Search Approach
// O(log(N) + k) time, O(1) space
var findClosestElements = function(arr, k, x) {
 // Use binary search to find the right index that is the smallest element greater than or equal to x
 let left = 0;
 let right = arr.length - 1;
 while (left < right) {
   let mid = left + Math.floor((right - left) / 2);
   if (arr[mid] >= x) {
     right = mid;
   } else {
     left = mid + 1;
   }
 }
 
 // Start left one less than the right to expand out from
 left = right - 1;
 // Expand the window until we have k closest elements
 let currentK = k;
 while (currentK--) {
   if (right >= arr.length || left >= 0 && x - arr[left] <= arr[right] - x) {
     left--;
   } else {
     right++;
   }
 }
 
 return arr.slice(left + 1, right);
};`;

const FindKClosestElements: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/find-k-closest-elements/</p>
      <p>{`Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.

An integer a is closer to x than an integer b if:

|a - x| < |b - x|, or
|a - x| == |b - x| and a < b`}</p>
      <Prism.Tabs>
        <Prism.Tab label="twoPointers.js" language="javascript">
          {twoPointersCode}
        </Prism.Tab>
        <Prism.Tab label="twoPointersBinarySearch.js" language="javascript">
          {twoPointersBinarySearchCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default FindKClosestElements;
