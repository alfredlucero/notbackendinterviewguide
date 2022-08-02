import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsCode = `/**
* @param {number[][]} matrix
* @return {number}
*/
// O(MN) time, O(MN) space
var longestIncreasingPath = function(matrix) {
 if (matrix.length === 0) {
   return 0;
 }
 
 // Starting from each cell in the matrix, we'll DFS and get the longest increasing path from that cell
 const numRows = matrix.length;
 const numCols = matrix[0].length;
 let longestIncreasingPath = 0;
 const memo = {};
 
 const dfs = (row, col) => {
   const memoKey = \`$\{row}-$\{col}\`;
   if (memo.hasOwnProperty(memoKey)) {
     return memo[memoKey];
   }
   
   memo[memoKey] = 1;

   const directions = [[0,1], [0,-1], [1,0], [-1,0]];
   for (let direction of directions) {
     const [rowOffset, colOffset] = direction;
     const newRow = row + rowOffset;
     const newCol = col + colOffset;

     if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols) {
       continue;
     }
     
     if (matrix[newRow][newCol] <= matrix[row][col]) {
       continue;
     }
     
     if (matrix[newRow][newCol] > matrix[row][col]) {
       memo[memoKey] = Math.max(memo[memoKey], dfs(newRow, newCol) + 1);
     }
   }
   
   return memo[memoKey];
 };
 
 for (let row = 0; row < numRows; row++) {
   for (let col = 0; col < numCols; col++) {
     longestIncreasingPath = Math.max(longestIncreasingPath, dfs(row, col));
   }
 }
 
 return longestIncreasingPath;
};`;

const LongestIncreasingPathInAMatrix: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://leetcode.com/problems/longest-increasing-path-in-a-matrix/
      </p>
      <p>
        Given an m x n integers matrix, return the length of the longest
        increasing path in matrix. From each cell, you can either move in four
        directions: left, right, up, or down. You may not move diagonally or
        move outside the boundary (i.e., wrap-around is not allowed).
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default LongestIncreasingPathInAMatrix;
