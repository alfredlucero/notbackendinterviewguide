import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const climbingStairsRecursionCode = `/**
* @param {number} n
* @return {number}
*/
// Approach 1: Similar to fibonacci recursion
// Recursively climb 1 stair or 2 stairs at a time
// Base case
// n === 1 => 1
// n === 2 => 2
// Recursive step
// n > 2 => climbStairs(n-1) going up 1 step at a time + climbStairs(n-2) going up 2 steps at a time
// Time: O(2^n) since at each step we recursively make 2 choices; Space: O(n)
// This will be too slow especially as n grows large - lead to recursion stack overflows potentially
var climbStairs = function(n) {  
 if (n === 1) {
   return 1;
 }
 if (n === 2) {
   return 2;
 }
 
 return climbStairs(n - 1) + climbStairs(n - 2);
}`;

const climbingStairsRecursionMemoizedCode = `/**
* @param {number} n
* @return {number}
*/
// Approach 2: Recursion memoized
// Recursively climb 1 stair or 2 stairs at a time
// Base case
// n === 1 => 1
// n === 2 => 2
// Recursive step
// check if memo[n] already exists and return the already computed value
// n > 2 => result = climbStairs(n-1) + climbStairs(n-2)
// Store the intermediate result in memo map i.e. memo[n] = result
// Time: O(n); Space: O(n) to keep track of memoized results
var climbStairs = function(n, memo = new Map()) {  
 if (n === 1) {
   return 1;
 }
 if (n === 2) {
   return 2;
 }
 
 // Check if we already computed the number of ways to climb to n stairs in the memo map
 if (memo.has(n)) {
   return memo.get(n);
 }
 
 // Compute number of ways to go up by 1 and by 2 stairs at a time to reach n
 const result = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
 
 // Store the result for n stairs in the memo map
 memo.set(n, result);
 
 return result;
}`;

const climbingStairsDPBottomUpExtraSpaceCode = `/**
* @param {number} n
* @return {number}
*/
// Approach 3: Dynamic Programming Bottom Up With Array
// Initialize array dp of size n + 1
// Initialize dp[0] = 0; dp[1] = 1; dp[2] = 2 for the base cases
// Loop from 3 to n and set dp[i] = dp[i-1] + dp[i-2]
// dp[n] has the number of ways to climb to n stairs
// Time: O(n); Space: O(n)
var climbStairs = function(n) {  
 // Initialize an array of length n + 1 to store the intermediate results
 const dp = new Array(n + 1);
 
 // Set the base cases when n = 0,1,2
 dp[0] = 0;
 dp[1] = 1;
 dp[2] = 2;
 
 // Looping from 3 onwards to n, use the intermediate results along the way to compute the final result
 // dp[i] = dp[i-1] + dp[i-2] representing number of ways to reach n going 1 stair + going 2 stairs at a time
 for (let i = 3; i <= n; i++) {
   dp[i] = dp[i-1] + dp[i-2];
 }
 
 // Total number of ways to climb to n stairs will be computed in dp[n]
 return dp[n];
}`;

const climbingStairsDPBottomUpConstantSpaceCode = `/**
* @param {number} n
* @return {number}
*/
// Approach 4: Dynamic Programming Bottom Up; Keeping track of last 2 computed values
// Keep track of last 2 values i.e. dp1 and dp2
// Loop from 3 to n and compute result = dp1 + dp2
// Set dp1 to dp2; set current result to dp2
// Time: O(n); Space: O(1)
var climbStairs = function(n) {  
 // Base cases when n = 1,2
 if (n === 1) {
   return 1;
 }
 if (n === 2) {
   return 2;
 }
 
 // Keep track of last 2 computed values to calculate the next result
 let dp1 = 1;
 let dp2 = 2;
 
 // Compute next result with dp1 + dp2
 // Update the last 2 computed values
 let result = 0;
 for (let i = 3; i <= n; i++) {
   result = dp1 + dp2;
   dp1 = dp2;
   dp2 = result;
 }
   
 return result;
}`;

const ClimbingStairs: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/climbing-stairs/</p>
      <p>
        You are climbing a staircase. It takes n steps to reach the top. Each
        time you can either climb 1 or 2 steps. In how many distinct ways can
        you climb to the top?
      </p>
      <Prism.Tabs>
        <Prism.Tab label="recursionInefficient.js" language="javascript">
          {climbingStairsRecursionCode}
        </Prism.Tab>
        <Prism.Tab label="recursionMemoized.js" language="javascript">
          {climbingStairsRecursionMemoizedCode}
        </Prism.Tab>
        <Prism.Tab label="dpBottomUpExtraSpace.js" language="javascript">
          {climbingStairsDPBottomUpExtraSpaceCode}
        </Prism.Tab>
        <Prism.Tab label="dpBottomUpConstantSpace.js" language="javascript">
          {climbingStairsDPBottomUpConstantSpaceCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ClimbingStairs;
