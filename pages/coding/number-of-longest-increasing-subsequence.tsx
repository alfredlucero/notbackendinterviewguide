import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dpBottomUpCode = `/**
* @param {number[]} nums
* @return {number}
*/
// Dynamic Programming Approach 
// Use dp of length nums, initialize each entry with maxLength = 1 and maxCount = 1
// dp[i] = includes max length and max count from index i to the end
// O(n^2) time, O(n) space
var findNumberOfLIS = function(nums) {
 const dp = Array.from({ length: nums.length }, () => ({ maxLength: 1, maxCount: 1 }));
 let lenLIS = 0;
 let numLIS = 0;
 
 for (let i = nums.length - 1; i >= 0; i--) {
   let currentMaxLength = 1;
   let currentMaxCount = 1;
   
   for (let j = i + 1; j < nums.length; j++) {
     if (nums[i] < nums[j]) {
       // dp[j] represents maxLength and maxCount from j to end of array
       const { maxLength, maxCount } = dp[j];
       // If there is a new max length, update both max length and count
       if (maxLength + 1 > currentMaxLength) {
         currentMaxLength = maxLength + 1;
         currentMaxCount = maxCount;
       // If same max length, add to the current count
       } else if (maxLength + 1 === currentMaxLength) {
         currentMaxCount += maxCount
       }
     }
   }
   
   // Update the global lenLIS and numLIS if applicable
   if (currentMaxLength > lenLIS) {
     lenLIS = currentMaxLength;
     numLIS = currentMaxCount;
   } else if (currentMaxLength === lenLIS) {
     numLIS += currentMaxCount;
   }
     
   // Update the maxCount/Length of dp[i]
   dp[i].maxLength = currentMaxLength;
   dp[i].maxCount = currentMaxCount;
 }
 
 
 return numLIS;
};`;

const NumberOfLongestIncreasingSubsequence: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://leetcode.com/problems/number-of-longest-increasing-subsequence/
      </p>
      <p>
        Given an integer array nums, return the number of longest increasing
        subsequences. Notice that the sequence has to be strictly increasing.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dpBottomUp.js" language="javascript">
          {dpBottomUpCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default NumberOfLongestIncreasingSubsequence;
