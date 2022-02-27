import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const findAllDuplicatesInAnArrayCode = `/**
* @param {number[]} nums
* @return {number[]}
*/
// Approach: Modifying the original nums array and marking numbers at indices as negative
// Loop through the nums array and use nums[i]-1 as the index of the array we will be multiplying to be negative to mark as appearing once before
// Each index i in the array represents whether or not the number i+1 has been seen before depending on whether it's negative or positive
// When we encounter another number with the same value and the value at its corresponding index is already negative, we will add the index + 1 to the duplicates result
// O(N) time, O(1) space (excludes the result array)
var findDuplicates = function(nums) {
 const duplicates = [];
 for (let i = 0; i < nums.length; i++) {
   const currentIdx = Math.abs(nums[i]) - 1;
   if (nums[currentIdx] < 0) {
     const duplicate = currentIdx + 1;
     duplicates.push(duplicate);
   }
   nums[currentIdx] *= -1;
 }
 
 return duplicates;
};`;

const FindAllDuplicatesInAnArray: NextPage = () => {
  return (
    <div>
      <p>
        Source: https://leetcode.com/problems/find-all-duplicates-in-an-array/
      </p>
      <p>
        Given an integer array nums of length n where all the integers of nums
        are in the range [1, n] and each integer appears once or twice, return
        an array of all the integers that appears twice. You must write an
        algorithm that runs in O(n) time and uses only constant extra space.
      </p>

      <Prism language="javascript">{findAllDuplicatesInAnArrayCode}</Prism>
    </div>
  );
};

export default FindAllDuplicatesInAnArray;
