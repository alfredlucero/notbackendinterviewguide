import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const convert1DArrayInto2DArrayCode = `/**
* @param {number[]} original
* @param {number} m
* @param {number} n
* @return {number[][]}
*/
// O(mn) time and space to build up 2D array from original 1D array with same number of elements
var construct2DArray = function(original, m, n) {
 // If we can't put all of the original array into a new m x n array, return empty array
 if (original.length !== m*n) {
   return [];
 }
 
 const result = [];
 
 // Loop through and build up the result from the original  
 // Approach 1: Can assign original[row * n + col] into result[row][col]
 // For example, original = [1,2,3,4], m = 2, n = 2
 // 0 to n - 1 -> original[0] and original[1] map to result[0][0] and result[0][1]
 // n to 2 * n - 1 -> original[2] and original[3] map to result[1][0] and result [1][1] 
 // Approach 2: extra k index to keep track of place in original array being added to result that will be incremented after each iteration
 let k = 0;
 for (let row = 0; row < m; row++) {
   const currentRow = [];
   for (let col = 0; col < n; col++) {
     // Approach 1
     // const currentIdx = row * n + col
     // const currentNum = original[currentIdx] 
     
     // Approach 2
     const currentNum = original[k];
     k++;
     currentRow.push(currentNum);
   }
   result.push(currentRow);
 }
 
 return result;
};`;

const Convert1DArrayInto2DArray: NextPage = () => {
  return (
    <div>
      <p>
        Source: https://leetcode.com/problems/convert-1d-array-into-2d-array/
      </p>
      <p>
        You are given a 0-indexed 1-dimensional (1D) integer array original, and
        two integers, m and n. You are tasked with creating a 2-dimensional (2D)
        array with m rows and n columns using all the elements from original.
        The elements from indices 0 to n - 1 (inclusive) of original should form
        the first row of the constructed 2D array, the elements from indices n
        to 2 * n - 1 (inclusive) should form the second row of the constructed
        2D array, and so on. Return an m x n 2D array constructed according to
        the above procedure, or an empty 2D array if it is impossible.
      </p>
      <Prism language="javascript">{convert1DArrayInto2DArrayCode}</Prism>
    </div>
  );
};

export default Convert1DArrayInto2DArray;
