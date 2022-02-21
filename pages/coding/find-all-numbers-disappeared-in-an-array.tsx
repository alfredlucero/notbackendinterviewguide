import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const findAllNumbersDisappearedInAnArrayCode = `/**
* @param {number[]} nums
* @return {number[]}
*/
// Approach 1: Using a map/object/hashtable to keep track of numbers we've seen before
// Loop through the nums array and add numbers that exist into the map/object
// Loop from 1..nums.length and if a number doesn't exist in the map, add it to result array
// O(N) time, O(N) space
// Approach 2: Using a set
// Loop through numbers [1..n] and add them to set
// Loop through nums and if number is not in set, add it to result array
// O(N) time, O(N) space
var findDisappearedNumbers = function(nums) {
 // Initialize a map to keep track of numbers that exist in nums
 const numsMap = new Map();
 
 // Loop through the nums array and add numbers that exist into the map
 nums.forEach((num) => { numsMap.set(num, true) });
 
 const result = [];
 // Loop from 1..nums.length and if a number doesn't exist in the map, add it to result array
 for (let i = 1; i < nums.length + 1; i++) {
   if (!numsMap.has(i)) {
     result.push(i);
   }
 }
 
 return result;
};`;

const findAllNumbersDisappearedInAnArrayConstantSpaceCode = `/**
* @param {number[]} nums
* @return {number[]}
*/
// Constant Space Approach:
// Using the existing nums array, we will mark the number as negative in its corresponding i-1 index if it exists
// We will loop through the marked nums array and for the numbers that are positive, we will add number i+1 into the result array
// O(N) time, O(1) space because we are modifying the given nums array
var findDisappearedNumbers = function(nums) {
 // Mark the existing nums array with negatives in its corresponding i-1 index to not overwrite the existing number completely
 for (let i = 0; i < nums.length; i++) {
   const currentNum = Math.abs(nums[i]);
   const currentIndex = currentNum - 1;
   nums[currentIndex] = Math.abs(nums[currentIndex]) * -1;
 }
 
 // Loop through the marked nums array and for the numbers that are positive, we will add the number i+1 into the result
 const result = [];
 for (let j = 0; j < nums.length; j++) {
   if (nums[j] > 0) {
     result.push(j + 1);
   }
 }
 
 return result;
};`;

const FindAllNumbersDisappearedInAnArray: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/
      </p>
      <p>
        Given an array nums of n integers where nums[i] is in the range [1, n],
        return an array of all the integers in the range [1, n] that do not
        appear in nums.
      </p>
      <Prism.Tabs>
        <Prism.Tab language="javascript" label="extraSpaceApproach.js">
          {findAllNumbersDisappearedInAnArrayCode}
        </Prism.Tab>
        <Prism.Tab language="javascript" label="constantSpaceApproach.js">
          {findAllNumbersDisappearedInAnArrayConstantSpaceCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default FindAllNumbersDisappearedInAnArray;
