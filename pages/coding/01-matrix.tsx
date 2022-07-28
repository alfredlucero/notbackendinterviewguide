import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const bfsCode = `/**
* @param {number[][]} mat
* @return {number[][]}
*/
// BFS Approach
// O(RC) time (ignoring the queue JS array implementation), O(RC) space
var updateMatrix = function(matrix) {
 const numRows = matrix.length;
 const numCols = matrix[0].length;
 const distances = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => Infinity));
 
 const queue = [];

 // Loop through each cell in the matrix and add all the zero cells into the queue
 for (let row = 0; row < numRows; row++) {
   for (let col = 0; col < numCols; col++) {
     if (matrix[row][col] === 0) {
       distances[row][col] = 0;
       queue.push([row,col]);
     }
   }
 }

 // Do BFS from each cell and compute the minimum distances along the way
 while (queue.length > 0) {
   const currentCell = queue.shift();
   const directions = [
     [0,1],
     [0,-1],
     [1,0],
     [-1,0]
   ];
   
   const [currentRow, currentCol] = currentCell;

   for (let i = 0; i < directions.length; i++) {
     const [rowOffset, colOffset] = directions[i];
     const newRow = currentRow + rowOffset;
     const newCol = currentCol + colOffset;

     // Skip if new cell is out of bounds
     if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols) {
       continue;
     }
 
     // If the new distance is smaller, we update it to the smaller distance and push the new cell to the queue
     if (distances[currentRow][currentCol] + 1 < distances[newRow][newCol]) {
       distances[newRow][newCol] = distances[currentRow][currentCol] + 1;
       queue.push([newRow, newCol]);
     } 
   }
 }

 return distances;
};`;

const ZeroOneMatrix: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/01-matrix/</p>
      <p>
        Given an m x n binary matrix mat, return the distance of the nearest 0
        for each cell. The distance between two adjacent cells is 1.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="bfs.js" language="javascript">
          {bfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ZeroOneMatrix;
