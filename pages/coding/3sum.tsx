import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const twoSumSortCode = `/**
* @param {number[]} nums
* @return {number[][]}
*/
// O(n^2) time, O(n or logn) space
var threeSum = function(nums) {
 // Sort the numbers to help us get rid of duplicates later
 nums.sort((a, b) => a - b);
 
 // Using nums[i] as a pivot, try and see if we can get all valid pairs that sum to  -nums[i] from the rest with two sum approach
 const result = [];
 for (let i = 0; i < nums.length && nums[i] <= 0; i++) {
   if (i === 0 || nums[i - 1] !== nums[i]) {
     twoSum(nums, i, result);
   }
 }
 
 return result;
};

// Compute all the valid two sums from i to the end while skipping duplicates
const twoSum = (nums, i, result) => {
 let left = i + 1; 
 let right = nums.length - 1;
 while (left < right) {
   const sum = nums[i] + nums[left] + nums[right];
   // Sum is less than 
   if (sum < 0) {
     left++;
   } else if (sum > 0) {
     right--;
   } else {
     // We found a triplet so we add to result and shrink the window
     result.push([nums[i], nums[left], nums[right]]);
     left++;
     right--;
     
     // Skip duplicates to avoid adding the same triplet
     while (left < right && nums[left] === nums[left - 1]) {
       left++;
     }
   }
 }
};`;

const Sum3: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/3sum/</p>
      <p>
        Given an integer array nums, return all the triplets [nums[i], nums[j],
        nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] +
        nums[k] == 0. Notice that the solution set must not contain duplicate
        triplets.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="twoSumSort.js" language="javascript">
          {twoSumSortCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default Sum3;
