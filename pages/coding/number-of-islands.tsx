import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsCode = `/**
* @param {character[][]} grid
* @return {number}
*/
// O(MN) time, O(MN) recursive space as it can be filled with all lands
var numIslands = function(grid) {
 const numRows = grid.length;
 const numCols = grid[0].length;
 
 // Whenever we encounter a '1' we will perform DFS on it and mark all 1s along the way with '0'
 const markIsland = (row, col) => {
   grid[row][col] = '0';
   // Go up if there is land
   if (row - 1 >= 0 && grid[row-1][col] === '1') {
     markIsland(row-1, col);
   }
       
   // Go down
   if (row + 1 < numRows && grid[row+1][col] === '1') {
     markIsland(row+1, col);
   }
   
   // Go left
   if (col - 1 >= 0 && grid[row][col-1] === '1') {
     markIsland(row, col-1);
   }
       
   // Go right
   if (col + 1 < numCols && grid[row][col+1] === '1') {
     markIsland(row, col+1)
   }
 }
 
 let islandsCount = 0;
 
 // Go through each spot in the grid
 for (let row = 0; row < numRows; row++) {
   for (let col = 0; col < numCols; col++) {
     // If we encounter land, increment islands count and mark the rest of the island through DFS
     if (grid[row][col] === '1') {
       islandsCount++;
       markIsland(row, col);
     }
   }
 }
 
 return islandsCount;
};`;

const NumberOfIslands: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/number-of-islands/</p>
      <p>
        Given an m x n 2D binary grid grid which represents a map of 1s (land)
        and 0s (water), return the number of islands. An island is surrounded by
        water and is formed by connecting adjacent lands horizontally or
        vertically. You may assume all four edges of the grid are all surrounded
        by water.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default NumberOfIslands;
