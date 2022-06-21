import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const bfsCode = `/**
* @param {number[][]} heights
* @return {number[][]}
*/
// BFS Approach
// O(MN) time, O(MN) space
var pacificAtlantic = function(heights) {
 // If input is empty, return empty array
 if (heights.length === 0 || heights[0].length === 0) {
   return [];
 }
 
 const numRows = heights.length;
 const numCols = heights[0].length;
 
 // Setup a queue with cells adjacent to their respective ocean
 const pacificQueue = [];
 const atlanticQueue = [];
 // Add top first row and left first column cells to queue for pacific ocean
 // Add bottom last row and right last column cells to queue for atlantic ocean
 for (let row = 0; row < numRows; row++) {
   pacificQueue.push([row, 0]);
   atlanticQueue.push([row, numCols - 1]);
 }
 for (let col = 0; col < numCols; col++) {
   pacificQueue.push([0, col]);
   atlanticQueue.push([numRows - 1, col]);
 }
 
 // BFS with queue and returns cells that are reachable from the ocean
 const bfs = (queue) => {
   // Initialize reachable matrix with all false
   const reachable = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => false));
   // While the queue is not empty
   while (queue.length > 0) {
     // Dequeue the cell
     const currentCell = queue.shift();
     const [currentRow, currentCol] = currentCell;
     
     // Mark the current cell as reachable
     reachable[currentRow][currentCol] = true;
     
     // Try going in each direction...
     const north = [-1, 0];
     const south = [1, 0];
     const east = [0, 1];
     const west = [0, -1];
     const directions = [north, south, east, west];
     directions.forEach((direction) => {
       const [rowOffset, colOffset] = direction;
       let newRow = currentRow + rowOffset;
       let newCol = currentCol + colOffset;
       
       // If new cell is not in bounds, skip
       if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols) {
         return;
       }
       // If new cell is already visited, skip
       if (reachable[newRow][newCol]) {
         return;
       }
       // If new cell's value is less than the current cell, skip
       if (heights[newRow][newCol] < heights[currentRow][currentCol]) {
         return;
       }
       
       // New cell must be reachable if it passes these conditions, so we add the new cell onto the queue
       queue.push([newRow, newCol]);
     });
   }
     
   // Return the reachable matrix
   return reachable;
 };
 
 // Perform BFS for each ocean to find all cells accessible by each ocean
 const pacificReachable = bfs(pacificQueue);
 const atlanticReachable = bfs(atlanticQueue);
 
 // Find all cells that can reach both oceans (intersection of the two)
 const pacificAtlanticReachable = [];
 for (let row = 0; row < numRows; row++) {
   for (let col = 0; col < numCols; col++) {
     if (pacificReachable[row][col] && atlanticReachable[row][col]) {
       pacificAtlanticReachable.push([row,col]);
     }
   }
 }
 
 return pacificAtlanticReachable;
};`;

const PacificAtlanticWaterFlow: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/pacific-atlantic-water-flow/</p>
      <p>
        There is an m x n rectangular island that borders both the Pacific Ocean
        and Atlantic Ocean. The Pacific Ocean touches the islands left and top
        edges, and the Atlantic Ocean touches the islands right and bottom
        edges. The island is partitioned into a grid of square cells. You are
        given an m x n integer matrix heights where heights[r][c] represents the
        height above sea level of the cell at coordinate (r, c). The island
        receives a lot of rain, and the rain water can flow to neighboring cells
        directly north, south, east, and west if the neighboring cells height is
        less than or equal to the current cells height. Water can flow from any
        cell adjacent to an ocean into the ocean. Return a 2D list of grid
        coordinates result where result[i] = [ri, ci] denotes that rain water
        can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="bfs.js" language="javascript">
          {bfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default PacificAtlanticWaterFlow;
