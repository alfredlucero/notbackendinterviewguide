import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const backtrackCode = `/**
* @param {character[][]} board
* @return {void} Do not return anything, modify board in-place instead.
*/
// O(9^MN) time, O(MN) space
var solveSudoku = function(board) {
 const numRows = board.length;
 const numCols = board[0].length;
 // Initialize rows, cols, boxes to keep track of the numbers we've placed so far
 const rows = Array.from({ length: numRows }, () => Array.from({ length: numCols + 1 }, () => 0));
 const cols = Array.from({ length: numRows }, () => Array.from({ length: numCols + 1 }, () => 0));
 const boxes = Array.from({ length: numRows }, () => Array.from({ length: numCols + 1 }, () => 0));

 // Loop through all of the board cells and add the already placed numbers to the rows, cols, and boxes
 for (let row = 0; row < numRows; row++) {
   for (let col = 0; col < numCols; col++) {
     if (board[row][col] !== '.') {
       const currentValue = parseInt(board[row][col], 10);
       rows[row][currentValue]++;
       cols[col][currentValue]++;
       const boxId = Math.floor(row / 3) * 3 + Math.floor(col / 3);
       boxes[boxId][currentValue]++;
     }
   }
 }

 const canPlaceNumber = (row, col, value) => {
   const boxId = Math.floor(row / 3) * 3 + Math.floor(col / 3);
   return rows[row][value] === 0 && cols[col][value] === 0 && boxes[boxId][value] === 0;
 };

 const backtrack = (row, col) => {
   // If we've reached the end of the board, we solved it
   if (row === numRows - 1 && col === numCols) {
     return true;
   }
   // If we've finished going through a row's columns, advance to the next row
   if (col === numCols) {
     row += 1;
     col = 0;
   }

   // If the current board cell is already placed with a number, we'll recursively go onto the next column
   if (board[row][col] !== '.') {
     return backtrack(row, col + 1);
   }

   // Try and fill from values 1 through 9 (loop from 1 to 9)
   for (let value = 1; value <= numRows; value++) {
     if (!canPlaceNumber(row, col, value)) {
       continue;
     }

     // Place the number
     board[row][col] = value.toString();
     rows[row][value]++;
     cols[col][value]++;
     const boxId = Math.floor(row / 3) * 3 + Math.floor(col / 3);
     boxes[boxId][value]++;

     // Try and recursively fill the rest
     if (backtrack(row, col + 1)) {
       return true;
     }

     // Backtrack
     board[row][col] = '.';
     rows[row][value]--;
     cols[col][value]--;
     boxes[boxId][value]--;
   }
   
   return false;
 };

 backtrack(0, 0);
};`;

const SudokuSolver: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/sudoku-solver/</p>
      <p>
        Write a program to solve a Sudoku puzzle by filling the empty cells. A
        sudoku solution must satisfy all of the following rules: Each of the
        digits 1-9 must occur exactly once in each row. Each of the digits 1-9
        must occur exactly once in each column. Each of the digits 1-9 must
        occur exactly once in each of the 9 3x3 sub-boxes of the grid. The .
        character indicates empty cells.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="backtrack.js" language="javascript">
          {backtrackCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default SudokuSolver;
