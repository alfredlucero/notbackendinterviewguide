import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const trieDfsCode = `/**
* @param {character[][]} board
* @param {string[]} words
* @return {string[]}
*/
// O(M(4*3^L-1)) time where M is number of cells on board, L is max length of words
// O(N) space where N is the total number of letters in the dictionary to form trie
var findWords = function(board, words) {
 // Build a trie from the dictionary of words
 const root = { children: {}, word: null };
 words.forEach((word) => {
   let currentNode = root;
   for (let char of word) {
     // If the character doesn't exist in the trie, we will add a new character node in children
     if (!currentNode.children.hasOwnProperty(char)) {
       currentNode.children[char] = { children: {}, word: null };
     }
       
     // Move to the character node
     currentNode = currentNode.children[char];
   }
   
   // After looping through all the characters in the word, we will add the word to mark it as the end
   currentNode.word = word;
 });
 
 
 const result = [];
 // Loop through each cell letter in the board and try and find all words from dictionary we can form
 for (let row = 0; row < board.length; row++) {
   for (let col = 0; col < board[0].length; col++) {
     // If the trie contains a word that starts with the current cell letter, try DFS from that cell to find all possible words
     if (root.children.hasOwnProperty(board[row][col])) {
       dfs(row, col, board, result, root);
     }
   }
 }
 
 return result;
};

const dfs = (row, col, board, result, root) => {
 // Get the current letter and corresponding trie node
 const letter = board[row][col];
 const currentNode = root.children[letter];
 
 // If we're already at a word, we add it to result and unmark the end of word to avoid double adding it
 if (currentNode.word !== null) {
   result.push(currentNode.word);
   currentNode.word = null;
 }
 
 // Mark the current letter as visited
 board[row][col] = '#';
 
 // Explore neighbor cells in all directions as long as we're inbounds and the next character exists in the trie
 const directions = [[-1,0],[1,0],[0,1],[0,-1]];
 directions.forEach((direction) => { 
   const [rowOffset, colOffset] = direction;
   const newRow = row + rowOffset;
   const newCol = col + colOffset;
   
   // If out of bounds, we can't go in this direction
   if (newRow < 0 || newRow >= board.length || newCol < 0 || newCol >= board[0].length) {
     return;
   }
   
   // If the next character is in bounds and it exists in the trie, we'll recursively explore this direction
   if (currentNode.children.hasOwnProperty(board[newRow][newCol])) {
     dfs(newRow, newCol, board, result, currentNode);
   }
 });
 
 // Restore the current letter back to its original state after exploring all directions
 board[row][col] = letter;
};`;

const WordSearchII: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/word-search-ii/</p>
      <p>
        Given an m x n board of characters and a list of strings words, return
        all words on the board. Each word must be constructed from letters of
        sequentially adjacent cells, where adjacent cells are horizontally or
        vertically neighboring. The same letter cell may not be used more than
        once in a word.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="trieDfs.js" language="javascript">
          {trieDfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default WordSearchII;
