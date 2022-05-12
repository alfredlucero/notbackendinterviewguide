import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const recursionCode = `/**
* @param {number} m
* @param {number} n
* @return {number}
*/
// Within bounds if 0 <= row < m, 0 <= col < n
// Reached goal if row === m-1 and col === n-1
// At each position in the grid you can only make 2 choices: going down or right
// To go down we change row + 1, col
// To go right we change row, col + 1
// Recursive Approach
// Base Cases
// If not within bounds, return 0
// If row === m-1 and col === n - 1, return 1
// Recursively try going down + try going right
// O(2^(m+n)) time; O(m+n) space for recursive stack
var uniquePaths = function(m, n) {
 const withinBounds = (row, col) => {
   return (0 <= row && row < m && 0 <= col && col < n);
 };
 const reachedTarget = (row, col) => {
   return (row === m - 1 && col === n - 1);
 };
 const rec = (row, col) => {
   if (!withinBounds(row, col)) {
     return 0;
   }
   if (reachedTarget(row, col)) {
     return 1;
   }
   
   // Recursively try going down and going right
   const downPaths = rec(row + 1, col);
   const rightPaths = rec(row, col + 1);
   
   return downPaths + rightPaths;
 };
 
 return rec(0, 0);
};`;

const recursionMemoizedCode = `/**
* @param {number} m
* @param {number} n
* @return {number}
*/
// Within bounds if 0 <= row < m, 0 <= col < n
// Reached goal if row === m-1 and col === n-1
// At each position in the grid you can only make 2 choices: going down or right
// To go down we change row + 1, col
// To go right we change row, col + 1
// Recursive Memoized Approach
// Use a memo object to keep track at position [row-col] how many paths are from that point to avoid repeat subtree computation
// Base Cases
// If not within bounds, return 0
// If row === m-1 and col === n - 1, return 1
// Recursively try going down + try going right
// O(mn) time to go through all of m x n grid; O(mn) space for m x n potential keys cached
var uniquePaths = function(m, n) {
 const memo = {};
 const withinBounds = (row, col) => {
   return (0 <= row && row < m && 0 <= col && col < n);
 };
 const reachedTarget = (row, col) => {
   return (row === m - 1 && col === n - 1);
 };
 const rec = (row, col) => {
   const memoKey = \`\$\{row\}-\$\{col\}\`;
   if (memo.hasOwnProperty(memoKey)) {
     return memo[memoKey];
   }
   if (!withinBounds(row, col)) {
     return 0;
   }
   if (reachedTarget(row, col)) {
     return 1;
   }
   
   // Recursively try going down and going right
   const downPaths = rec(row + 1, col);
   const rightPaths = rec(row, col + 1);
   
   const totalPaths = downPaths + rightPaths;
   memo[memoKey] = totalPaths;
   
   return totalPaths;
 };
 
 return rec(0, 0);
};`;

const dpBottomUpCode = `/**
* @param {number} m
* @param {number} n
* @return {number}
*/
// Dynamic Programming Bottom Up Approach
// dp[row][col] = number of paths from 0,0 to row,col
// initialize dp with all 1s since there should be at least 1 way to hit everything cell
// dp[row][col] = can reach from top cell dp[row-1][col] or left cell dp[row][col-1]
// return dp[row-1][col-1]
// O(mn) time O(mn) space
var uniquePaths = function(m, n) {
 // Initialize dp of size m x n with all 1s cause there should be at least one way to hit each cell
 const dp = Array.from({ length: m }, () => Array.from({ length: n }, () => 1));
 
 // Start looping from 1 since dp[row][0] and dp[0][col] should only have 1 way to reach those cells
 for (let row = 1; row < m; row++) {
   for (let col = 1; col < n; col++) {
     // Sum up paths coming from top and left
     dp[row][col] = dp[row-1][col] + dp[row][col-1];
   }
 }
 
 return dp[m-1][n-1];
};`;

const UniquePaths: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/unique-paths/</p>
      <p>
        There is a robot on an m x n grid. The robot is initially located at the
        top-left corner (i.e., grid[0][0]). The robot tries to move to the
        bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move
        either down or right at any point in time. Given the two integers m and
        n, return the number of possible unique paths that the robot can take to
        reach the bottom-right corner. The test cases are generated so that the
        answer will be less than or equal to 2 * 109.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="recursion.js" language="javascript">
          {recursionCode}
        </Prism.Tab>
        <Prism.Tab label="recursionMemoized.js" language="javascript">
          {recursionMemoizedCode}
        </Prism.Tab>
        <Prism.Tab label="dpBottomUp.js" language="javascript">
          {dpBottomUpCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default UniquePaths;
