import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const bfsCode = `/**
* @param {number[][]} grid
* @param {number} k
* @return {number}
*/
// O(mnk) time, O(mnk) space
var shortestPath = function(matrix, k) {
 const numRows = matrix.length;
 const numCols = matrix[0].length;

 // If there is only one empty cell in the matrix, we already reached the end
 if (numRows === 1 && numCols === 1) {
   return 0;
 }
 
 const queue = [];
 const visited = new Set();
 
 // Push the start cell to BFS from and mark it as visited
 
 // key = row-col-kRemaining
 visited.add(\`0-0-\${k}\`);
 // [row, col, kRemaining, numSteps]
 queue.push([0,0,k,0]);	

 // BFS to see if we can make it to the end
 while (queue.length > 0) {
   const currentCell = queue.shift();
   const [currentRow, currentCol, kRemaining, numSteps] = currentCell;

   const directions = [[0,1],[1,0],[0,-1],[-1,0]];
   for (let direction of directions) {
     const [rowOffset, colOffset] = direction;
     const newRow = currentRow + rowOffset;
     const newCol = currentCol + colOffset;
     
     const isInBounds = newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols;
     if (!isInBounds) {
       continue;
     }
     
     // If we've encountered an obstacle and can eliminate it and we haven't visited it before
     if (matrix[newRow][newCol] === 1 && kRemaining > 0 && !visited.has(\`\${newRow}-\${newCol}-\${kRemaining-1}\`)) {
       visited.add(\`\${newRow}-\${newCol}-\${kRemaining-1}\`);
       queue.push([newRow, newCol, kRemaining - 1, numSteps + 1]);
     } else if (matrix[newRow][newCol] === 0 && !visited.has(\`\${newRow}-\${newCol}-\${kRemaining}\`)) {
       // If we've reached the end, return the number of steps it took (should be the minimum for BFS)
       if (newRow === numRows - 1 && newCol === numCols - 1) {
         return numSteps + 1;
       }
       visited.add(\`\${newRow}-\${newCol}-\${kRemaining}\`);
       queue.push([newRow, newCol, kRemaining, numSteps + 1]);
     }
   }
 }

 // Not possible to reach the end
 return -1;
};`;

const ShortestPathInAGridWithObstaclesElimination: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/
      </p>
      <p>
        You are given an m x n integer matrix grid where each cell is either 0
        (empty) or 1 (obstacle). You can move up, down, left, or right from and
        to an empty cell in one step. Return the minimum number of steps to walk
        from the upper left corner (0, 0) to the lower right corner (m - 1, n -
        1) given that you can eliminate at most k obstacles. If it is not
        possible to find such walk return -1.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="bfs.js" language="javascript">
          {bfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ShortestPathInAGridWithObstaclesElimination;
