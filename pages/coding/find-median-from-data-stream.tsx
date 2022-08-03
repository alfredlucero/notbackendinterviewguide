import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const sortCode = `
var MedianFinder = function() {
  this.nums = []; 
};

/** 
 * @param {number} num
 * @return {void}
 */
// O(1) time
MedianFinder.prototype.addNum = function(num) {
  this.nums.push(num);
};

/**
 * @return {number}
 */
// O(NlogN) time, O(N) space
MedianFinder.prototype.findMedian = function() {
  this.nums.sort((a,b) => a - b);
  
  if (this.nums.length % 2 === 0) {
    return (this.nums[Math.floor(this.nums.length / 2)] + this.nums[Math.floor(this.nums.length / 2) - 1]) / 2;
  } else {
    return this.nums[Math.floor(this.nums.length / 2)];
  }
};

/** 
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */`;

const heapCode = `
var MedianFinder = function() {
  // Maxheap of smaller half of numbers
  this.lowerHeap = new Heap((a,b) => b - a);
  // Minheap of greater half of numbers
  this.upperHeap = new Heap((a,b) => a - b);
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  // Add the number to the lower max heap
  this.lowerHeap.push(num);
  
  // Balance them out
  this.upperHeap.push(this.lowerHeap.peek());
  this.lowerHeap.pop();
  
  // Maintain the size property i.e. lowerHeap can have up at most 1 more element than upperHeap
  if (this.lowerHeap.size() < this.upperHeap.size()) {
    this.lowerHeap.push(this.upperHeap.peek());
    this.upperHeap.pop();
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  return this.lowerHeap.size() > this.upperHeap.size() ? this.lowerHeap.peek() : (this.lowerHeap.peek() + this.upperHeap.peek()) / 2;
};

/** 
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

// Mocking out heaps though it's inefficient than the actual
class Heap {
  constructor(compareFunc) {
    this.heap = [];
    this.compareFunc = compareFunc;
  }
  
  push(value) {
    this.heap.push(value);
    this.heap.sort(this.compareFunc);
  }
  
  pop() {
    if (this.heap.length === 0) {
      return null;
    }
    const value = this.heap.shift();
    return value;
  }
  
  peek() {
    if (this.heap.length === 0) {
      return null;
    }
    return this.heap[0];
  }
  
  size() {
    return this.heap.length;
  }
}`;

const FindMedianFromDataStream: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/find-median-from-data-stream/</p>
      <p>
        The median is the middle value in an ordered integer list. If the size
        of the list is even, there is no middle value and the median is the mean
        of the two middle values. For example, for arr = [2,3,4], the median is
        3. For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
        Implement the MedianFinder class: MedianFinder() initializes the
        MedianFinder object. void addNum(int num) adds the integer num from the
        data stream to the data structure. double findMedian() returns the
        median of all elements so far. Answers within 10-5 of the actual answer
        will be accepted.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="sort.js" language="javascript">
          {sortCode}
        </Prism.Tab>
        <Prism.Tab label="heap.js" language="javascript">
          {heapCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default FindMedianFromDataStream;
