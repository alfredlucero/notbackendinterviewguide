import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsCode = `/**
* @param {number[][]} image
* @param {number} sr
* @param {number} sc
* @param {number} color
* @return {number[][]}
*/
// O(N) time, O(N) call stack size for recursive function
var floodFill = function(image, sr, sc, color) {
 const numRows = image.length;
 const numCols = image[0].length;
 
 // DFS to fill the neighbors that have the same value with the color
 const dfs = (row, col, startColor) => {
   // If we are out of bounds, we'll return
   if (row < 0 || row >= numRows || col < 0 || col >= numCols) {
     return;
   }
   
   // If we are at a valid cell position where it doesn't equal to the startColor, we can't fill it in with the new color so we return
   if (image[row][col] !== startColor) {
     return;
   }
   
   // If the current cell has the same value as the startColor, we will fill it in with the new color
   image[row][col] = color;
   
   // We will attempt to recursively visit the neighbors to fill (top, bottom, left, right)
   // Try to fill the top neighbors
   dfs(row - 1, col, startColor);
   
   // Try to fill the bottom neighbors
   dfs(row + 1, col, startColor);
   
   // Try to fill the left neighbors
   dfs(row, col - 1, startColor);
   
   // Try to fill the right neighbors
   dfs(row, col + 1, startColor);
 };
 
 // From the starting point and starting color, we will attempt to fill the neighbors
 const startColor = image[sr][sc];
 if (color !== startColor) {
   dfs(sr, sc, startColor);
 }
 
 return image;
};`;

const FloodFill: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/flood-fill/</p>
      <p>
        An image is represented by an m x n integer grid image where image[i][j]
        represents the pixel value of the image. You are also given three
        integers sr, sc, and color. You should perform a flood fill on the image
        starting from the pixel image[sr][sc]. To perform a flood fill, consider
        the starting pixel, plus any pixels connected 4-directionally to the
        starting pixel of the same color as the starting pixel, plus any pixels
        connected 4-directionally to those pixels (also with the same color),
        and so on. Replace the color of all of the aforementioned pixels with
        color. Return the modified image after performing the flood fill.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default FloodFill;
