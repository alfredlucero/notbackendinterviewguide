import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const linearCode = `/**
* @param {number[]} nums1
* @param {number[]} nums2
* @return {number}
*/
// Linear mergesortish approach
// O(N + M) time, O(1) space
var findMedianSortedArrays = function(nums1, nums2) {
 let median1 = 0;
 let median2 = 0;
 let index1 = 0;
 let index2 = 0;
 let i = 0;
 
 // For the combined array, we go up to the halfway point
 while (i <= Math.floor((nums1.length + nums2.length) / 2)) {
   median1 = median2;
   // We've exhaused all of nums1, so move nums2 pointer
   if (index1 === nums1.length) {
     median2 = nums2[index2];
     index2++;
   // We've exhausted all of nums2, so move nums1 pointer
   } else if (index2 === nums2.length) {
     median2 = nums1[index1];
     index1++;
   // If the smaller number is from nums1, we move nums1 pointer
   } else if (nums1[index1] <= nums2[index2]) {
     median2 = nums1[index1];
     index1++;
   // If the smaller number is from nums2, we move nums2 pointer
   } else {
     median2 = nums2[index2];
     index2++;
   }
   
   i++;
 }
 
 // If the combined array has an even length, we do median1 + median2 / 2
 if ((nums1.length + nums2.length) % 2 === 0) {
   return (median1 + median2) / 2
 }
 
 // If the combined array has an odd length, we get the exact middle
 return median2;
};`;

const binarySearchCode = `/**
* @param {number[]} nums1
* @param {number[]} nums2
* @return {number}
*/
// Binary Search Approach
// O(log(m + n)) time
var findMedianSortedArrays = function(nums1, nums2) {
 if (nums1.length === 0 && nums2.length === 0) {
   return 0;
 }
 
 // Get the left and right halves of combined median
 const leftHalf = Math.floor((nums1.length + nums2.length + 1) / 2);
 const rightHalf = Math.floor((nums1.length + nums2.length + 2) / 2);
 
 // If nums1.length + nums2.length is odd, both functions will return the same number
 // If nums2.length + nums2.length is even, they will return the left number and the right number that makes up the median
 return (getKth(nums1, 0, nums2, 0, leftHalf) + getKth(nums1, 0, nums2, 0, rightHalf)) / 2;
};

const getKth = (nums1, start1, nums2, start2, k) => {
 // If we've exhausted all of nums1, we return the kth number from nums2
 if (start1 >= nums1.length) {
   return nums2[start2 + k - 1];
 }
 // If we've exhausted all of nums2, we return the kth number from nums1
 if (start2 >= nums2.length) {
   return nums1[start1 + k - 1];
 }
 // if k === 1, return the first number aka the minimum between nums1 and nums2
 if (k === 1) {
   return Math.min(nums1[start1], nums2[start2]);
 }
 
 // Get the middle of the two arrays
 let mid1 = Infinity;
 let mid2 = Infinity;
 if (start1 + Math.floor(k / 2) - 1 < nums1.length) {
   mid1 = nums1[start1 + Math.floor(k / 2) - 1];
 }
 if (start2 + Math.floor(k / 2) - 1 < nums2.length) {
   mid2 = nums2[start2 + Math.floor(k / 2) - 1];
 }
 
 // If mid1 < mid2, we can throw away nums1.left and keep nums1.right, nums2.left and cut k in half
 if (mid1 < mid2) {
   return getKth(nums1, start1 + Math.floor(k / 2), nums2, start2, k - Math.floor(k / 2));
 // Otherwise, mid1 >= mid2 so we can throw away nums2.left and keep nums2.right and nums2.left and cut k in half
 } else {
   return getKth(nums1, start1, nums2, start2 + Math.floor(k / 2), k - Math.floor(k / 2));
 }
};`;

const MedianOfTwoSortedArrays: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/median-of-two-sorted-arrays/</p>
      <p>
        Given two sorted arrays nums1 and nums2 of size m and n respectively,
        return the median of the two sorted arrays. The overall run time
        complexity should be O(log (m+n)).
      </p>
      <Prism.Tabs>
        <Prism.Tab label="linear.js" language="javascript">
          {linearCode}
        </Prism.Tab>
        <Prism.Tab label="binarySearch.js" language="javascript">
          {binarySearchCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default MedianOfTwoSortedArrays;
