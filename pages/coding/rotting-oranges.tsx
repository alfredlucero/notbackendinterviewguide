import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const bfsCode = `/**
* @param {number[][]} grid
* @return {number}
*/
// O(MN) time, O(MN) space
var orangesRotting = function(grid) {
 // Initialize queue
 const queue = [];
 
 // Loop through all the cells
 const numRows = grid.length;
 const numCols = grid[0].length;
 let numFreshOranges = 0;
 for (let row = 0; row < numRows; row++) {
   for (let col = 0; col < numCols; col++) {
     // Add all the rotten orange cells to the queue
     if (grid[row][col] === 2) {
       queue.push([row, col]);
     // Keep track of the number of fresh oranges
     } else if (grid[row][col] === 1) {
       numFreshOranges += 1;
     }
   }
 }
 
 // If we already have no fresh oranges, we're done
 if (numFreshOranges === 0) {
   return 0;
 }
 
 // BFS to continue to contaminate the neighbors after each minute
 // Keep track of the number of minutes elapsed
 let minutesElapsed = -1;
 while (queue.length > 0) {
   minutesElapsed += 1;
   let numRottenOranges = queue.length;
   let i = 0;
   
   // Check all the rotten orange's neighbors if we can contaminate any
   while (i < numRottenOranges) {
     const [currentRow, currentCol] = queue.shift();
     
     const directions = [[0,1],[0,-1],[1,0],[-1,0]];
     directions.forEach((direction) => {
       const [rowOffset, colOffset] = direction;
       const newRow = currentRow + rowOffset;
       const newCol = currentCol + colOffset;
       
       // If cell is within bounds
       if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
         // If the neighbor is a fresh orange, we'll contaminate it, decrement number of fresh oranges, andadd the new rotten orange to the queue
         if (grid[newRow][newCol] === 1) {
           grid[newRow][newCol] = 2;
           numFreshOranges -= 1;
           queue.push([newRow, newCol]);
         }
       }
     });
     
     i++;
   }
 }

 // If all the oranges are now rotten, we'll return the minutes it took or -1 if it's impossible
 return numFreshOranges === 0 ? minutesElapsed : -1;
};`;

// https://leetcode.com/problems/rotting-oranges/
const RottingOranges: NextPage = () => {
  return (
    <div>
      <p>Source: </p>
      <p>
        You are given an m x n grid where each cell can have one of three
        values: 0 representing an empty cell, 1 representing a fresh orange, or
        2 representing a rotten orange. Every minute, any fresh orange that is
        4-directionally adjacent to a rotten orange becomes rotten. Return the
        minimum number of minutes that must elapse until no cell has a fresh
        orange. If this is impossible, return -1.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="bfs.js" language="javascript">
          {bfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default RottingOranges;
