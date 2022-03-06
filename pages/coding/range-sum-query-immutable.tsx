import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const rangeSumQueryImmutableCode = `/**
* @param {number[]} nums
*/
// O(N) time and space to build prefixSums and keep track of originalNums/prefixSums
// To avoid having to compute the sums over a range, we'll compute a prefixSums array once
var NumArray = function(nums) {
 // Keep track of prefixSums of nums
 // For example, [-2, 0, 3, -5, 2, -1] => [-2, -2, 1, -4, -2, -3]
 let currentSum = 0;
 this.prefixSums = [];
 for (let i = 0; i < nums.length; i++) {
   currentSum += nums[i];
   this.prefixSums.push(currentSum);
 }
};

/** 
* @param {number} left 
* @param {number} right
* @return {number}
*/
// Given originalNums and prefixSums, we can use those to help compute the sum over the range
// For example, given originalNums = [-2,0,3,-5,2,-1] and prefixSums = [-2,-2,1,-4,-2,-3]
// numArray.sumRange(0,2) => -2 + 0 + 3 = 1 which is prefixSum[2]
// numArray.sumRange(2,5) => 3 + -5 + 2 + -1 = -1 which is prefixSum[5] - prefixSum[1] = -3 - (-2) = 2
// numArray.sumRange(0,5) => -2 + 0 + 3 + -5 + 2 + -1 which is prefixSum[5] = -3
// numArray.sumRange(1,3) => 0 + 3 + -5 = -2 which is prefixSum[3] - prefixSum[0] = -4 - (-2) = -2
// numArray.sumRange(3,3) => -5 which is prefixSum[3] - prefixSum[2] = -4 - 1 = 5
// numArray.sumRange(0,0) = -2 => cannot do prefixSum[right] - prefixSum[left - 1] but we can get prefixSum[0]
// If left starts with zero, then we can get prefixSum[right] for the sumRange
// If left > 0, then we can do prefixSum[right] - prefixSum[left-1]
// Using the prefixSums, we can compute the sumRange in O(1) time
NumArray.prototype.sumRange = function(left, right) {
 // If left === 0, we can use the prefix sum directly at the right index i.e. (0,0), (0,5)
 if (left === 0) {
   return this.prefixSums[right];
 }
 
 // Otherwise, we can do prefixSum[right] - prefixSum[left-1] to compute the other sum ranges i.e. (3,3), (2,5), (1,3)
 return this.prefixSums[right] - this.prefixSums[left-1];
};

/** 
* Your NumArray object will be instantiated and called as such:
* var obj = new NumArray(nums)
* var param_1 = obj.sumRange(left,right)
*/`;

const RangeSumQueryImmutable: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/range-sum-query-immutable/</p>
      <p>
        Given an integer array nums, handle multiple queries of the following
        type: Calculate the sum of the elements of nums between indices left and
        right inclusive where left {"<="} right. Implement the NumArray class:
        NumArray(int[] nums) Initializes the object with the integer array nums.
        int sumRange(int left, int right) Returns the sum of the elements of
        nums between indices left and right inclusive (i.e. nums[left] +
        nums[left + 1] + ... + nums[right]).
      </p>
      <Prism language="javascript">{rangeSumQueryImmutableCode}</Prism>
    </div>
  );
};

export default RangeSumQueryImmutable;
