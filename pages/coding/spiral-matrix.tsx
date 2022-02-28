import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const spiralMatrixCode = `/**
* @param {number[][]} matrix
* @return {number[]}
*/
// Approach: Go clockwise while making sure to close the bounds
// While we are still in bounds we will go through elements in a clockwise fashion and add to result along the way
// We will iterate right from the left bound (left bound to right bound); increment upper bound
// We will iterate down from the right bound (upper bound to bottom bound); decrement right bound
// Check the left/right bound and upper/bottom bounds are still valid to go left and up
// We will iterate left from right bound (right bound to left bound); decrement bottom bound
// We will iterate up from bottom bound (bottom bound to upper bound); increment left bound
// O(mn) time
var spiralOrder = function(matrix) {
 const spiralResult = [];
 let leftBound = 0;
 let rightBound = matrix[0].length - 1;
 let upperBound = 0;
 let bottomBound = matrix.length - 1;
 
 // While we are in bounds, we will go through elements in a clockwise fashion and add to result along the way
 while (leftBound <= rightBound && upperBound <= bottomBound) {
   // Go right from the upper left bound
   for (let col = leftBound; col <= rightBound; col++) {
     spiralResult.push(matrix[upperBound][col]);
   }
   // Move upper bound inwards
   upperBound++;
   
   // Go down from the upper right bound
   for (let row = upperBound; row <= bottomBound; row++) {
     spiralResult.push(matrix[row][rightBound]);
   }
   // Move right bound inwards
   rightBound--;
   
   // Check if left/right bound and upper/bottom bound are valid to go to avoid duplicate traversal
   if (leftBound > rightBound || upperBound > bottomBound) {
     break;
   }
   
   // Go left from bottom right bound
   for (let col = rightBound; col >= leftBound; col--) {
     spiralResult.push(matrix[bottomBound][col]);
   }
   // Move bottom bound inwards
   bottomBound--;
   
   // Go up from bottom left bound
   for (let row = bottomBound; row >= upperBound; row--) {
     spiralResult.push(matrix[row][leftBound]);
   }
   // Move left bound inwards
   leftBound++;
 }
 
 return spiralResult;
};`;

const SpiralMatrix: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/spiral-matrix/</p>
      <p>
        Given an m x n matrix, return all elements of the matrix in spiral
        order.
      </p>
      <Prism language="javascript">{spiralMatrixCode}</Prism>
    </div>
  );
};

export default SpiralMatrix;
