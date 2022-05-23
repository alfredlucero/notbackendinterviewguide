import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const binarySearchCode = `/**
* @param {number[]} nums
* @return {number}
*/
var findMin = function(nums) {
 let left = 0;
 let right = nums.length - 1;
 let minIndex = -1;
 
 // i.e. [30,40,50,10,20]
 while (left <= right) {
   let mid = left + Math.floor((right - left) / 2);
   // Minimum can be more to the left since middle is less than the end
   if (nums[mid] <= nums[nums.length - 1]) {
     right = mid - 1;
     minIndex = mid;
   // Minimum can be more to the right since middle is greater than the end
   } else {
     left = mid + 1
   }
 }
 
 return nums[minIndex];
};`;

const FindMinimumInRotatedSortedArray: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
      </p>
      <p>{`Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.`}</p>
      <Prism.Tabs>
        <Prism.Tab label="binarySearch.js" language="javascript">
          {binarySearchCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default FindMinimumInRotatedSortedArray;
