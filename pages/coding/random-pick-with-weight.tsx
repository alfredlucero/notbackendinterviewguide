import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const extraSpaceCode = `/**
* @param {number[]} w
*/
// O(W) where W is the total weight as we form an index slots array with W slots filled with the index numbers
var Solution = function(w) {
 // Get the sum of the array weights i.e. [1,3] = 1 + 3 = 4
 this.totalWeight = w.reduce((acc, current) => acc + current, 0);
 
 // Given an array like [1,3], we will form another array like [0,1,1,1] to represent the weight distribution of indices
 this.indexSlots = [];
 let currentIndex = 0;
 for (let i = 0; i < w.length; i++) {
   const numCurrentIndex = w[i];
   // Push the current index the number of times it should appear in the index slots to represent the probability
   // i.e. one 0, three 1 index
   for (let j = 0; j < numCurrentIndex; j++) {
     this.indexSlots.push(currentIndex);
   }
   currentIndex++;
 }
};

/**
* @return {number}
*/
Solution.prototype.pickIndex = function() {
 const randomIndex = Math.floor(Math.random() * this.totalWeight);
 return this.indexSlots[randomIndex];
};

/** 
* Your Solution object will be instantiated and called as such:
* var obj = new Solution(w)
* var param_1 = obj.pickIndex()
*/`;

const prefixSumLinearCode = `/**
* @param {number[]} w
*/
// O(W) time/space
var Solution = function(w) {
 this.prefixSums = Array.from({ length: w.length });
 
 // Form the prefix sums array to simulate the ranges of numbers that our pick index function can use to determine which index to return i.e. [1,3] -> [1,4]; numbers in 0-1 will be for 0 index, numbers in 1-4 will be for 1 index
 let prefixSum = 0;
 for (let i = 0; i < w.length; i++) {
   prefixSum += w[i];
   this.prefixSums[i] = prefixSum;
 }
 
 // Keep track of total weight so we can scale our random number function
 // i.e. Math.random() * 4 -> 0-4 range
 this.totalWeight = prefixSum;
};

/**
* @return {number}
*/
// O(W) time
Solution.prototype.pickIndex = function() {
 // Generate a random scaled number from total weight to determine which range it falls in under the prefix sums
 const randomNumber = Math.random() * this.totalWeight;
 
 // Loop through each number to determine which range it falls under and we'll return the associated index with that range
 // Scaled random number should be less than the current prefix sum to be in that range
 for (let i = 0; i < this.prefixSums.length; i++) {
   if (randomNumber < this.prefixSums[i]) {
     return i;
   }
 }
      
 // It shouldn't get in this case but for return purposes
 return i - 1;
};

/** 
* Your Solution object will be instantiated and called as such:
* var obj = new Solution(w)
* var param_1 = obj.pickIndex()
*/`;

const prefixSumBinarySearchCode = `/**
* @param {number[]} w
*/
// O(W) time/space
var Solution = function(w) {
 this.prefixSums = Array.from({ length: w.length });
 
 // Form the prefix sums array to simulate the ranges of numbers that our pick index function can use to determine which index to return i.e. [1,3] -> [1,4]; numbers in 0-1 will be for 0 index, numbers in 1-4 will be for 1 index
 let prefixSum = 0;
 for (let i = 0; i < w.length; i++) {
   prefixSum += w[i];
   this.prefixSums[i] = prefixSum;
 }
 
 // Keep track of total weight so we can scale our random number function
 // i.e. Math.random() * 4 -> 0-4 range
 this.totalWeight = prefixSum;
};

/**
* @return {number}
*/
// O(logW) time
Solution.prototype.pickIndex = function() {
 // Generate a random scaled number from total weight to determine which range it falls in under the prefix sums
 const randomNumber = Math.random() * this.totalWeight;
 
 // Since the prefix sums is sorted i.e. [1,4], we can use binary search to find the index of the smallest number greater than the random number
 let randomIndex = 0;
 let left = 0;
 let right = this.prefixSums.length - 1;
 while (left <= right) {
   const mid = left + Math.floor((right - left) / 2);
   if (this.prefixSums[mid] < randomNumber) {
     left = mid + 1;
   } else {
     right = mid - 1;
   }
 }
 
 return left;
};

/** 
* Your Solution object will be instantiated and called as such:
* var obj = new Solution(w)
* var param_1 = obj.pickIndex()
*/`;

const RandomPickWithWeight: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/random-pick-with-weight/</p>
      <p>
        You are given a 0-indexed array of positive integers w where w[i]
        describes the weight of the ith index. You need to implement the
        function pickIndex(), which randomly picks an index in the range [0,
        w.length - 1] (inclusive) and returns it. The probability of picking an
        index i is w[i] / sum(w). For example, if w = [1, 3], the probability of
        picking index 0 is 1 / (1 + 3) = 0.25 (i.e., 25%), and the probability
        of picking index 1 is 3 / (1 + 3) = 0.75 (i.e., 75%).
      </p>
      <Prism.Tabs>
        <Prism.Tab label="extraSpace.js" language="javascript">
          {extraSpaceCode}
        </Prism.Tab>
        <Prism.Tab label="prefixSumLinear.js" language="javascript">
          {prefixSumLinearCode}
        </Prism.Tab>
        <Prism.Tab label="prefixSumBinarySearch.js" language="javascript">
          {prefixSumBinarySearchCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default RandomPickWithWeight;
