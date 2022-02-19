import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const containsDuplicateCode = `/**
* @param {number[]} nums
* @return {boolean}
*/
// Brute force approach: Can check each num against the rest of the list to see if there is a duplicate - O(N^2) time, O(1) space
// Sort approach: Can sort first and then check consecutive numbers if there are duplicates - O(NlogN) time, O(1) space if sorting in-place
// Set/map/object approach: Can use set/map/object to check if item already exists in it - O(N) time, O(N) space
// [1,2,3,1] => true
// [1,2,3,4] => false
// [1,1,1,3,3,4,3,2,4,2] => true
var containsDuplicate = function(nums) {
 // Initialize set
 const set = new Set();
   
 // Loop through each number
 for (let i = 0; i < nums.length; i++) {
   const currentNum = nums[i];
   
   // If the current number already exists in the set, return true
   if (set.has(currentNum)) {
     return true;
   }

   // Add number to set
   set.add(currentNum);
 }
     
 // At this point, if we haven't found a duplicate after going through all the numbers, return false
 return false;
};`;

const ContainsDuplicate: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/contains-duplicate/</p>
      <p>
        Given an integer array nums, return true if any value appears at least
        twice in the array, and return false if every element is distinct.
      </p>
      <Prism language="javascript">{containsDuplicateCode}</Prism>
    </div>
  );
};

export default ContainsDuplicate;
