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
// Approach 3:
// Similar concept to approach 2 but can sum up [0..n] and also the nums array and subtract the 2 sums to get the missing number
// Approach 4:
// Can use XORs against the nums array and the numbers from [0..n]; the final result will be the missing number
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

const missingNumberXorCode = `// XOR Approach:
// Can use XORs against the nums array (xor1) and the numbers from [0..n] (xor2); xor1 ^ xor2 will be the missing number
var missingNumber = function(nums) {
  // Handle empty case
  if (nums.length === 0) {
    return 0;
  }
  
  // Xor all the original nums array into xor1
  const xor1 = nums.reduce((acc, current) => { return acc ^ current; }, 0);
  
  // Xor all the numbers from [0..n] into xor2
  let xor2 = 0;
  for (let i = 0; i < nums.length + 1; i++) {
    xor2 ^= i;
  }
  
  // Xor the 2 results to get the missing number
  const missingNumber = xor1 ^ xor2;
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
      <Prism.Tabs>
        <Prism.Tab language="javascript" label="missingNumberSumApproach.js">
          {missingNumberCode}
        </Prism.Tab>
        <Prism.Tab language="javascript" label="missingNumberXorApproach.js">
          {missingNumberXorCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default MissingNumber;
