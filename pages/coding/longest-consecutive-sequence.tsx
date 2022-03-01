import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const longestConsecutiveSequenceCode = `/**
* @param {number[]} nums
* @return {number}
*/
// Approach:
// Use a set to keep track of nums
// Keep track of maxLength
// For each number in nums
// Keep track of currentLength
// If the currentNumber - 1 doesn't exist (not part of an existing sequence)
// Remove the current Number from the set
// While the currentNumber has currentNumber + 1 in the set
// Remove that next number in the sequence from the set and increment currentLength
// Update the maxLength if currentLength is greater
// O(N) time, O(N) space
var longestConsecutive = function(nums) {
 const numSet = new Set(nums);
 let maxLength = 0;
 
 for (let i = 0; i < nums.length; i++) {
   let currentNum = nums[i];
   let currentLength = 0;
   // If the current number is the beginning of a sequence
   if (!numSet.has(currentNum-1)) {
     // Keep checking for currentNum + 1 and remove from set while incrementing
     // the current length of the sequence
     while (numSet.delete(currentNum++)) {
       currentLength++;
     }
   }
   maxLength = Math.max(maxLength, currentLength);
 }
 
 return maxLength;
};`;

const LongestConsecutiveSequence: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/longest-consecutive-sequence/</p>
      <p>
        Given an unsorted array of integers nums, return the length of the
        longest consecutive elements sequence. You must write an algorithm that
        runs in O(n) time.
      </p>
      <Prism language="javascript">{longestConsecutiveSequenceCode}</Prism>
    </div>
  );
};

export default LongestConsecutiveSequence;
