import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const setMatrixZeroesExtraSpaceCode = `/**
* @param {number[][]} matrix
* @return {void} Do not return anything, modify matrix in-place instead.
*/
// Approach: Keep track of rows and cols that have 0s in separate sets
// Loop through the matrix and whenever we encounter a 0, we had the row index to a row set and col index to a col set
// Using the row and col sets representing where we should zero out, we can loop again through the matrix and always check the row/col sets to determine if we should zero out the existing element
// O(mn) time, O(m + n) space
var setZeroes = function(matrix) {
 // Initialize sets for row and column indices that should be zeroed out
 const rowZeroes = new Set();
 const colZeroes = new Set();
 
 // Loop through the matrix and whenever we encounter a zero, we add the row index to the row set and
 // col index to the col set
 for (let row = 0; row < matrix.length; row++) {
   for (let col = 0; col < matrix[0].length; col++) {
     const currentValue = matrix[row][col];
     if (currentValue === 0) {
       rowZeroes.add(row);
       colZeroes.add(col);
     }
   }
 }
 
 // Loop through the matrix again and check the row and col sets to determine if we should zero out the current element
 for (let row = 0; row < matrix.length; row++) {
   for (let col = 0; col < matrix[0].length; col++) {
     if (rowZeroes.has(row) || colZeroes.has(col)) {
       matrix[row][col] = 0;
     }
   }
 }
};`;

const setMatrixZeroesConstantSpaceCode = `/**
* @param {number[][]} matrix
* @return {void} Do not return anything, modify matrix in-place instead.
*/
// Approach: Use the first row and first column to track whether or not to zero out the entire row/column
// Iterate through the matrix and keep track of whether or not the first row (firstRowHasZero) or the first column has a zero (firstColumnHasZero)
// For any element we encounter a zero, we would set the first row matrix[0][col] and first column matrix[row][0] to zero
// Iterate through the matrix again and for the current row/col you are on, if the first row or column has a zero, we zero out that current row/col
// In case there are any zeroes in the actual first row and first column, we zero out the entire first row or first column as necessary
// O(mn) time, O(1) space
var setZeroes = function(matrix) {
 let firstColumnHasZero = false;
 let firstRowHasZero = false;
 
 // Iterate through the matrix and keep track of whether or not the first row or first column has a zero; for any element we encounter that is zero, we set the first row and first column to zero
 for (let row = 0; row < matrix.length; row++) {
   for (let col = 0; col < matrix[0].length; col++) {
     if (matrix[row][col] === 0) {
       if (row === 0) {
         firstRowHasZero = true;
       }
       
       if (col === 0) {
         firstColumnHasZero = true;
       }
       
       matrix[row][0] = 0;
       matrix[0][col] = 0;
     }
   }
 }
 
 // Iterate through matrix starting from the second row/col and for the current row/col you are on, if the first row or column has a zero, we zero out that element
 for (let row = 1; row < matrix.length; row++) {
   for (let col = 1; col < matrix[0].length; col++) {
     if (matrix[row][0] === 0 || matrix[0][col] === 0) {
       matrix[row][col] = 0;
     }
   }
 }
 
 // If the first row has a zero, we zero out the entire first row
 if (firstRowHasZero) {
   for (let col = 0; col < matrix[0].length; col++) {
     matrix[0][col] = 0;
   }
 }
 
 // If the first column has a zero, we zero out the entire first column
 if (firstColumnHasZero) {
   for (let row = 0; row < matrix.length; row++) {
     matrix[row][0] = 0;
   }
 }
};`;

const SetMatrixZeroes: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/set-matrix-zeroes/</p>
      <p>
        Given an m x n integer matrix matrix, if an element is 0, set its entire
        row and column to zeroes. You must do it in place.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="setMatrixZeroesExtraSpace.js" language="javascript">
          {setMatrixZeroesExtraSpaceCode}
        </Prism.Tab>
        <Prism.Tab
          label="setMatrixZeroesConstantSpace.js"
          language="javascript"
        >
          {setMatrixZeroesConstantSpaceCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default SetMatrixZeroes;
