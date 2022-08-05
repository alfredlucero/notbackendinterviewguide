import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsCode = `/**
* @param {character[][]} board
* @return {number}
*/
// O(M*N) time, O(M + N) space
var countBattleships = function(board) {
 const numRows = board.length;
 const numCols = board[0].length;
 
 let battleships = 0;
 
 // DFS to find the rest of a battleship to mark as visited
 const dfs = (row, col) => {
   // Mark current cell of battleship as visited 
   board[row][col] = '.';
   
   const directions = [[0,1],[0,-1],[1,0],[-1,0]];
   for (let direction of directions) {
     const [rowOffset, colOffset] = direction;
     const newRow = row + rowOffset;
     const newCol = col + colOffset;
     
     if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols) {
       continue;
     }
     
     if (board[newRow][newCol] === 'X') {
       dfs(newRow, newCol);
     }
   }
 };
 
 // Loop through the board to find battleships to mark
 for (let row = 0; row < numRows; row++) {
   for (let col = 0; col < numCols; col++) {
     // Whenever we encounter an X, we'll DFS and increment number of battleships by 1
     if (board[row][col] === 'X') {
       battleships += 1;
       dfs(row, col);
     }
   }
 }  
 
 return battleships;
};`;

const BattleshipsInABoard: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/battleships-in-a-board/</p>
      <p>
        Given an m x n matrix board where each cell is a battleship X or empty
        ., return the number of the battleships on board. Battleships can only
        be placed horizontally or vertically on board. In other words, they can
        only be made of the shape 1 x k (1 row, k columns) or k x 1 (k rows, 1
        column), where k can be of any size. At least one horizontal or vertical
        cell separates between two battleships (i.e., there are no adjacent
        battleships).
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default BattleshipsInABoard;
