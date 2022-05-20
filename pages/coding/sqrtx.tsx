import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const binarySearchCode = `/**
* @param {number} x
* @return {number}
*/
// Binary Search Approach
// default sqrt = 0
// (Search space from 1 to x)
// left = 1
// right = x
// while left <= right
// const mid = left + Math.floor((right - left) / 2)
// mid * mid > x (or mid > x / mid) -> check left half aka right = mid - 1
// mid * mid <= x (or mid <= x / mid) -> check right half aka set sqrt = mid, left = mid + 1 
// O(logn) time, O(1) space
var mySqrt = function(x) {
 let sqrt = 0;
 let left = 1;
 let right = x;
 // Binary search to find the closest square root of x
 while (left <= right) {
   const mid = left + Math.floor((right - left) / 2);
   // Overshot the target, so we check the left half
   if (mid > x / mid) {
     right = mid - 1;
   // We could be at or before the target so we check the right half and set the sqrt to the closest number mid
   } else {
     left = mid + 1;
     sqrt = mid;
   }
 }
 
 return sqrt;
};`;

const SqrtX: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/sqrtx/</p>
      <p>
        Given a non-negative integer x, compute and return the square root of x.
        Since the return type is an integer, the decimal digits are truncated,
        and only the integer part of the result is returned. Note: You are not
        allowed to use any built-in exponent function or operator, such as
        pow(x, 0.5) or x ** 0.5.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="binarySearch.js" language="javascript">
          {binarySearchCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default SqrtX;
