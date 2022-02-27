import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const findTheDuplicateNumberCode = `/**
* @param {number[]} nums
* @return {number}
*/
// This is a linked list cycle problem related to Floyd's cycle detection algorithm
// Approach: 
// Think of the indices as the nodes in a linked list and the values of the array at an index as a pointer to that node index
// We will have a fast pointer (2 jumps) and slow pointer (1 jump)
// We need to find the first node they intersect at
// We will then have a new slow pointer start from the beginning and the old slow pointer 
// where the intersection is at and shift one node at a time until the the slow pointers instersect
// This new intersection of slow pointers will be the duplicate number
// Intuition: the distance between the intersection of the fast/slow pointer to the start of the cycle
// is the same distance as the new slow pointer at the beginning to the start of the cycle as well
// Shifting both slow pointers by one will eventually intersect at the start of the cycle
// O(N) time, O(1) space
var findDuplicate = function(nums) {
 // Using a fast and slow pointer, we will find the first node they intersect at
 // Thinking of a linked list, the values of the array will be pointers to the proper node index
 let fast = nums[nums[0]];
 let slow = nums[0];
 while (fast !== slow) {
   fast = nums[nums[fast]]
   slow = nums[slow];
 }
 
 // After finding the first intersection of fast and slow pointer, we will have another slow pointer
 // start from the beginning and keep moving both the old and new slow pointer until they intersect
 // to find the duplicate number
 let start = 0;
 while (start !== slow) {
   start = nums[start];
   slow = nums[slow];
 }
 
 return start;
};`;

const FindTheDuplicateNumber: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/find-the-duplicate-number/</p>
      <p>
        Given an array of integers nums containing n + 1 integers where each
        integer is in the range [1, n] inclusive. There is only one repeated
        number in nums, return this repeated number. You must solve the problem
        without modifying the array nums and uses only constant extra space.
      </p>
      <Prism language="javascript">{findTheDuplicateNumberCode}</Prism>
    </div>
  );
};

export default FindTheDuplicateNumber;
