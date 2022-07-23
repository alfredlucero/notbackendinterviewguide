import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const minHeapCode = `/**
* @param {number[]} nums
* @param {number} k
* @return {number}
*/
// O(NlogK) time, O(K) space
var findKthLargest = function(nums, k) {
 // Initialize a min heap
 const minHeap = new MinHeap();
 
 nums.forEach((num) => {
   minHeap.insert(num);
   if (minHeap.size() > k) {
     minHeap.extract();
   }
 });
 
 return minHeap.peek();
};

class MinHeap {
 constructor() {
   this.heap = [];
 }
 
 insert(val) {
   this.heap.unshift(val);
   this.heap.sort((a,b) => a - b);
 }
 
 extract() {
   if (this.heap.length === 0) return null;
   const maxValue = this.heap.shift();
   return maxValue;
 }
 
 peek() {
   if (this.heap.length === 0) return null;
   return this.heap[0];
 }
 
 size() {
   return this.heap.length;
 }
}`;

const quickSelectCode = `/**
* @param {number[]} nums
* @param {number} k
* @return {number}
*/
// Quickselect approach
// O(N) time, O(1) space 
var findKthLargest = function(nums, k) {
 const swap = (a, b) => {
   const temp = nums[a];
   nums[a] = nums[b];
   nums[b] = temp;
 }
 
 const partition = (left, right, pivotIndex) => {
   const pivot = nums[pivotIndex];
   // Move pivot to end
   swap(pivotIndex, right);
   let storeIndex = left;
   
   // Move all smaller elements to the left
   for (let i = left; i <= right; i++) {
     if (nums[i] < pivot) {
       swap(storeIndex, i);
       storeIndex++;
     }
   }
   
   // Move pivot to its final place
   swap(storeIndex, right);
   
   return storeIndex;
 };
 
 const quickselect = (left, right, kSmallest) => {
   // If the list contains only one element, return that element
   if (left === right) {
     return nums[left];
   }
   
   // Select a random pivot index
   const randomNum = Math.floor(Math.random() * (right - left));
   let pivotIndex = left + randomNum;
   
   pivotIndex = partition(left, right, pivotIndex);
   
   // The pivot is on N-kth smallest position
   if (kSmallest === pivotIndex) {
     return nums[kSmallest];
   // Go left side
   } else if (kSmallest < pivotIndex) {
     return quickselect(left, pivotIndex - 1, kSmallest);
   }
   
   // Go right side
   return quickselect(pivotIndex + 1, right, kSmallest);
 };
 
 const size = nums.length;
 return quickselect(0, size - 1, size - k);
};`;

const KthLargestElementInAnArray: NextPage = () => {
  return (
    <div>
      <p>
        Source: https://leetcode.com/problems/kth-largest-element-in-an-array/
      </p>
      <p>
        Given an integer array nums and an integer k, return the kth largest
        element in the array. Note that it is the kth largest element in the
        sorted order, not the kth distinct element. You must solve it in O(n)
        time complexity.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="minHeap.js" language="javascript">
          {minHeapCode}
        </Prism.Tab>
        <Prism.Tab label="quickSelect.js" language="javascript">
          {quickSelectCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default KthLargestElementInAnArray;
