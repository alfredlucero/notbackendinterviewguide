import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const recursionCode = `/**
* @param {number[]} nums
* @return {boolean}
*/
// Recursive Approach
// Starting from the first index, can do DFS based on the value of the element
// Assume nums.length >= 1; and nums[i] can be 0 i.e. [0,1,2,3] -> false
// Edge Case: [0] -> true, [2] -> true
// Base Case: if startIndex === lastIndex, we made it and jumped to the end -> return true
// Loop from i = 1 to nums[i]
// Recursively try jumping i steps with new start index and if it's possible through that path, return true
// return false as we tried all possible jumps and failed
// O(n^n) time since at each index can potentially jump n different ways; O(n) function stack space
var canJump = function(nums) {
 const lastIndex = nums.length - 1;
 const canJumpRec = (startIndex) => {
   if (startIndex === lastIndex) {
     return true;
   }
   
   for (let i = 1; i <= nums[startIndex]; i++) {
     if (canJumpRec(startIndex + i)) {
       return true;
     }
   }
   
   return false;
 };
 
 return canJumpRec(0);
};`;

const recursionMemoizedCode = `/**
* @param {number[]} nums
* @return {boolean}
*/
// Recursion Memoized Approach
// Starting from the first index, can do DFS based on the value of the element
// Assume nums.length >= 1; and nums[i] can be 0 i.e. [0,1,2,3] -> false
// Edge Case: [0] -> true, [2] -> true
// Keep track of a memo where memo[startIndex] = true/false depending on whether or not we can reach the end from that point
// Base Case: if startIndex === lastIndex, we made it and jumped to the end -> return true
// Loop from i = 1 to nums[i]
// Recursively try jumping i steps with new start index and if it's possible through that path, return true
// return false as we tried all possible jumps and failed
// O(n^2) time since at each index can potentially jump n different ways; O(n) space for memo
var canJump = function(nums) {
 const lastIndex = nums.length - 1;
 const memo = {};
 const canJumpRec = (startIndex) => {
   if (memo.hasOwnProperty(startIndex)) {
     return memo[startIndex];
   }
   if (startIndex === lastIndex) {
     return true;
   }
   
   for (let i = 1; i <= nums[startIndex]; i++) {
     if (canJumpRec(startIndex + i)) {
       memo[startIndex] = true;
       return true;
     }
   }
   
   memo[startIndex] = false;
   return false;
 };
 
 return canJumpRec(0);
};`;

const greedyCode = `/**
* @param {number[]} nums
* @return {boolean}
*/
// Greedy Approach
// Iterate backwards from the end and check if we can reach the startIndex (0)
// At each iteration, we check if that element can at least reach the following element; if so, we move the currentLastIndex to that index
// return true if we reach the startIndex and false otherwise
// O(n) time, O(1) space
var canJump = function(nums) {
 let currentLastIndex = nums.length - 1;
 
 // Iterate backwards from the end and check if we can reach the startIndex (0)
 for (let i = nums.length - 1; i >= 0; i--) {
   // At each iteration, we will check if the current index can reach the currentLastIndex; if so, we update currentLastIndex with the current index
   if (i + nums[i] >= currentLastIndex) {
     currentLastIndex = i;
   }
 }
 
 // We can jump from end to end if we made it to the beginning
 return currentLastIndex === 0;
};`;

const JumpGame: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/jump-game/</p>
      <p>
        {`You are given an integer array nums. You are initially positioned at the
        array's first index, and each element in the array represents your
        maximum jump length at that position. Return true if you can reach the
        last index, or false otherwise.`}
      </p>
      <Prism.Tabs>
        <Prism.Tab label="recursion.js" language="javascript">
          {recursionCode}
        </Prism.Tab>
        <Prism.Tab label="recursionMemoized.js" language="javascript">
          {recursionMemoizedCode}
        </Prism.Tab>
        <Prism.Tab label="greedy.js" language="javascript">
          {greedyCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default JumpGame;
