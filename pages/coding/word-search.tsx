import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsBacktrackCode = `/**
* @param {character[][]} board
* @param {string} word
* @return {boolean}
*/
// DFS Backtracking Approach
// O(NM*3^W) time, 3^W time for going three directions for exploring neighbors in DFS way for each letter in word, N*M for going through each cell
// O(W) recursive call stack space as it will only go to at most W, the length of the word
var exist = function(board, word) {
 const numRows = board.length;
 const numCols = board[0].length;
 
 const dfsWordSearch = (row, col, wordIndex) => {
   // If the current word index is greater than or equal to the word length, we've found the word
   if (wordIndex >= word.length) {
     return true;
   }
   
   // If we are not within bounds or the current board letter does not equal the current word index letter, we can't find the word
   const withinBounds = row >= 0 && row < numRows && col >= 0 && col < numCols;
   if (!withinBounds || board[row][col] !== word[wordIndex]) {
     return false;
   }
   
   // Mark the board letter as visited
   board[row][col] = "#";
   
   const directions = [[1,0], [-1,0], [0,1], [0,-1]];
   let foundWord;
   // Try exploring the neighbors in DFS
   for (let direction of directions) {
     const [rowOffset, colOffset] = direction;
     const newRow = row + rowOffset;
     const newCol = col + colOffset;
     
     // Get the result of exploring the neighbor
     foundWord = dfsWordSearch(newRow, newCol, wordIndex + 1);
     // If we found it, break out
     if (foundWord) {
       break;
     }
   }

   // Backtrack by cleaning up the board back to its original letter and return the result
   board[row][col] = word[wordIndex];
   return foundWord;
 };
 
 // Loop through each letter in the board
 for (let row = 0; row < numRows; row++) {
   for (let col = 0; col < numCols; col++) {
     // If we can find the word from the current board spot, return true
     if (dfsWordSearch(row, col, 0)) {
       return true;
     }
   }
 }
 
 // Return false as we cannot find the word from any board spot
 return false;
};`;

const WordSearch: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/word-search/</p>
      <p>
        Given an m x n grid of characters board and a string word, return true
        if word exists in the grid. The word can be constructed from letters of
        sequentially adjacent cells, where adjacent cells are horizontally or
        vertically neighboring. The same letter cell may not be used more than
        once.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="dfsBacktrack.js" language="javascript">
          {dfsBacktrackCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default WordSearch;
