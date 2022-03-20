import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const recursionMemoizedCode = `/**
* @param {number[]} nums
* @return {number}
*/
/*
 Categorize: Knapsack 0/1, Recursion/Backtracking
 States: Keep track of the currentIndex (starting at 0) for the house and currentSum (starting at 0)
 Decisions: Whether to rob the current house or skip the current house and rob the next house
 Base Case: After going through all the houses (currentIndex >= nums.length) return the currentSum; otherwise keep adding to currentSum with the current house or the next house
 Implement: Recursion
 Optimize: Memoize max value given currentIndex and currentSum
 We make 2 choices at each step so it's O(2^n) time complexity without optimizations; may stack overflow due to recursion unless we optimize with memoization to bring it down to O(n) time and O(n) function space
*/
var rob = function(nums) {
 function recRob(currentIndex, currentSum) {
   const memoIndex = \`$\{currentIndex\},$\{currentSum\}\`;
   // If we've already computed this subproblem before, we will use that memoized value
   if (memo.hasOwnProperty(memoIndex)) {
     return memo[memoIndex];
   }
   // If we've gone through all the houses, return the currentSum (total amount robbed)
   if (currentIndex >= nums.length) {
     return currentSum;
   }
   
   // Assuming we haven't gone through all the houses, recursively go through these steps
   // Compute robbing the current house
   const currentNum = nums[currentIndex];
   const robCurrentHouse = recRob(currentIndex + 2, currentSum + currentNum);
   // Compute robbing the next house and skip the current house instead
   const robNextHouse = recRob(currentIndex + 1, currentSum);
   
   // Compute max from the 2 choices 
   const max = Math.max(robCurrentHouse, robNextHouse);
   
   // Store max in memo to avoid re-computing the same problem
   memo[memoIndex] = max;
 
   return max;
 }
 
 const memo = {};
 const maxRobbed = recRob(0, 0);
 return maxRobbed;
};`;

const iterativeBottomUpCode = `/**
* @param {number[]} nums
* @return {number}
*/
/*
 Iterative Bottoms-up Memo Approach:
 If no houses to rob, return 0
 If only 1 house to rob, return value of first house
 Initialize a memo array of size nums.length elements
 Initialize memo[0] = nums[0] (after going through 1 house, the max is the value of the first house)
 Initiialize memo[1] = Math.max(nums[0], nums[1]) (after going through 2 houses, the max is the max of either the first or second house)
 Loop starting from 2 to the number of houses
 Compute memo[i] = max of robbing the currentHouse and the previous valid house (memo[i-2]) or skipping the current house and robbing the previous house (memo[i-1])
 Return memo[nums.length - 1] which should have the final max answer
 O(n) time and space
 Further optimization similar to Fibonacci where you can also maintain only memo[i-1] and memo[i-2] to keep on computing memo[i] to cut it down to O(1) space
*/
var rob = function(nums) {
 // If no houses to rob, return 0
 if (nums.length === 0) {
   return 0;
 }
 // If only 1 house to rob, return value of first house
 if (nums.length === 1) {
   return nums[0];
 }
 
 // Memoized array will hold the max robbed so far after going through i houses i.e. memo[4] = max robbed after going through 5 houses
 const memo = new Array(nums.length);
 memo[0] = nums[0]; // After going through 1 house, the max is the value of the first house
 memo[1] = Math.max(nums[0], nums[1]); // Max after going through 2 houses is the max of the first or second house value

 for (let i = 2; i < nums.length; i++) {
   const currentHouse = nums[i];
   // Take the max of robbing the current house and the previous valid house (memo[i-2]) or skipping the current house and robbing the previous house (memo[i-1])
   memo[i] = Math.max(
     memo[i - 2] + currentHouse,
     memo[i - 1]
   );
 }
 
 return memo[nums.length - 1];
};`;

const HouseRobber: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/house-robber/</p>
      <p>
        You are a professional robber planning to rob houses along a street.
        Each house has a certain amount of money stashed, the only constraint
        stopping you from robbing each of them is that adjacent houses have
        security systems connected and it will automatically contact the police
        if two adjacent houses were broken into on the same night. Given an
        integer array nums representing the amount of money of each house,
        return the maximum amount of money you can rob tonight without alerting
        the police.
      </p>
      <Prism.Tabs>
        <Prism.Tab
          label="houseRobberRecursionMemoized.js"
          language="javascript"
        >
          {recursionMemoizedCode}
        </Prism.Tab>
        <Prism.Tab
          label="houseRobberIterativeBottomUp.js"
          language="javascript"
        >
          {iterativeBottomUpCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default HouseRobber;
