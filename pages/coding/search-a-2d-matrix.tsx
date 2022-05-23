import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const binarySearchCode = `/**
* @param {number[][]} matrix
* @param {number} target
* @return {boolean}
*/
// O(logmn) time, O(1) space
var searchMatrix = function(matrix, target) {
 const numRows = matrix.length;
 const numCols = matrix[0].length;
 
 // Find the right search row through an adjusted binary search
 // O(logm) time
 let top = 0;
 let bottom = numRows - 1;
 let targetRow = -1;
 while (top <= bottom) {
   let mid = top + Math.floor((bottom - top) / 2);
   // We found the target already, so return true
   if (matrix[mid][0] === target) {
     return true;
   // Target is greater than or equal to the start of a row, the target could be in this row, but we still check bottom half more in case there is a closer row
   } else if (matrix[mid][0] <= target) {
     top = mid + 1;
     targetRow = mid;
   // Target is less than the start of a row, so we check the upper half instead
   } else {
     bottom = mid - 1;
   }
 }
 
 // If we couldn't find a targetRow we return -1;
 if (targetRow === -1) {
   return false;
 }
        
 let left = 0;
 let right = numCols - 1;
 // After we find the row, we do a standard binary search to find the target amongst the columns
 // O(log n) time
 while (left <= right) {
   let mid = left + Math.floor((right - left) / 2);
   // We found the target in search row, so return true
   if (matrix[targetRow][mid] === target) {
     return true;
   // Mid is less than target, so check right half
   } else if (matrix[targetRow][mid] < target) {
     left = mid + 1;
   // Mid is greater than target, so we check left half
   } else {
     right = mid - 1
   }
 }
 
 // We couldn't find the target amongst the columns in the search row, so we return false
 return false;
};`;

const SearchA2DMatrix: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/search-a-2d-matrix/</p>
      <p>
        Write an efficient algorithm that searches for a value target in an m x
        n integer matrix matrix. This matrix has the following properties:
        Integers in each row are sorted from left to right. The first integer of
        each row is greater than the last integer of the previous row.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="binarySearch.js" language="javascript">
          {binarySearchCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default SearchA2DMatrix;
