import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const minHeapCode = `/**
* @param {number[][]} matrix
* @param {number} k
* @return {number}
*/
// O(X + Klog(X)) - X to construct heap where X = min(K, N), K iterations to extract min and insert
// O(X) space for heap
var kthSmallest = function(matrix, k) {
 const numRows = matrix.length;
 const numCols = matrix[0].length;
 
 // Initialize a min heap (it will hold { value, row, col })
 const minHeap = new Heap();
 
 // Add the first n/k elements into the heap from the sorted row lists
 for (let row = 0; row < Math.min(numRows, k); row++) {
   minHeap.insert({ value: matrix[row][0], row, col: 0 });
 }
 
 let result = minHeap.peek();
 while (k > 0) {  
   // Extract the minimum
   result = minHeap.extract();
   const currentRow = result.row;
   const currentCol = result.col;
   
   if (currentCol < numCols - 1) {
     // Add the next node in the same list as the min element we extracted
     minHeap.insert({ value: matrix[currentRow][currentCol + 1], row: currentRow, col: currentCol + 1 });
   }
   
   k--;
 }
 
 return result.value;
};

class Heap {
 constructor() {
   this.heap = [];
 }
 
 insert(ele) {
   this.heap.unshift(ele);
   this.heap.sort((a,b) => a.value - b.value);
 }
 
 extract() {
   if (this.heap.length === 0) return null;
   const minValue = this.heap.shift();
   this.heap.sort((a,b) => a.value - b.value);
   return minValue;
 }
 
 peek() {
   if (this.heap.length === 0) return null;
   return this.heap[0];
 }
}`;

const KthSmallestElementInASortedMatrix: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/
      </p>
      <p>
        Given an n x n matrix where each of the rows and columns is sorted in
        ascending order, return the kth smallest element in the matrix. Note
        that it is the kth smallest element in the sorted order, not the kth
        distinct element. You must find a solution with a memory complexity
        better than O(n2).
      </p>
      <Prism.Tabs>
        <Prism.Tab label="minHeap.js" language="javascript">
          {minHeapCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default KthSmallestElementInASortedMatrix;
