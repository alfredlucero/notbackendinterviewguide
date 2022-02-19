import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const missingNumberCode = `/**
* @param {number[]} nums
* @return {number}
*/
// Approach 1: 
// Can hold an auxilliary structure like a set or object to hold all the current numbers
// Loop through numbers 0 to nums.length - 1 and the first one not in the set/object is the missing number
// O(N) time, O(N) space
// Approach 2:
// Math principles: summation of 1 to n -> n(n+1) / 2 i.e. for n = 3: 3(3+1) / 2 => 3(4) / 2 = 6
// Using this math principle we can do nums.length(nums.length + 1) / 2
// and then we'll go through the nums array and subtract the current number from that sum
// the end result will be the missing number
// O(N) time, O(1) space
// [3,0,1] -> 2
// [0,1] -> 2
// [9,6,4,2,3,5,7,0,1] -> 8
var missingNumber = function(nums) {
 // Compute the expected sum of the nums in advance if all the numbers were there
 const sum = (nums.length * (nums.length + 1)) / 2;
 
 let missingNumber = sum;
 // Go through each num in nums and subtract from the sum
 for (let i = 0; i < nums.length; i++) {
   missingNumber -= nums[i];
 }
 
 // After subtracting all the numbers from the sum, what's left should be the missing number
 return missingNumber;
};`;

const MissingNumber: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/missing-number/</p>
      <p>
        Given an array nums containing n distinct numbers in the range [0, n],
        return the only number in the range that is missing from the array.
      </p>
      <Prism language="javascript">{missingNumberCode}</Prism>
    </div>
  );
};

export default MissingNumber;
