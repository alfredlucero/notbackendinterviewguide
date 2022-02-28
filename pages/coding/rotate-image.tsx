import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const rotateImageCode = `/**
* @param {number[][]} matrix
* @return {void} Do not return anything, modify matrix in-place instead.
*/
// Approach: Find the Transpose of the Matrix (flip rows/columns) and reverse each row to rotate by 90 degrees clockwise
// Iterate through the matrix and transpose it
// For each row in the transposed matrix, reverse the row in place to achieve 90 degree rotation
// O(n * n) time, O(1) space
var rotate = function(matrix) {  
 // Transpose the matrix
 for (let row = 0; row < matrix.length; row++) {
   for (let col = 0; col < row; col++) {
     const temp = matrix[row][col];
     matrix[row][col] = matrix[col][row];
     matrix[col][row] = temp;
   }
 }
 
 // For each row in the transposed matrix, reverse the row in place to finish the 90 degree rotation clockwise
 for (let row = 0; row < matrix.length; row++) {
   reverseInPlace(matrix[row]);
 }
};

const reverseInPlace = (arr) => {
 let left = 0;
 let right = arr.length - 1;
 while (left < right) {
   const temp = arr[left];
   arr[left] = arr[right];
   arr[right] = temp;
   left++;
   right--;
 }
}`;

const RotateImage: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/rotate-image/</p>
      <p>
        You are given an n x n 2D matrix representing an image, rotate the image
        by 90 degrees (clockwise). You have to rotate the image in-place, which
        means you have to modify the input 2D matrix directly. DO NOT allocate
        another 2D matrix and do the rotation.
      </p>
      <Prism language="javascript">{rotateImageCode}</Prism>
    </div>
  );
};

export default RotateImage;
