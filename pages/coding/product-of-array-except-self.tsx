import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const productOfArrayExceptSelfCode = `/**
* @param {number[]} nums
* @return {number[]}
*/
// Approach 1:
// Intuition: for every index in the nums array, if we can know the product of the numbers to the left
// of an index and the product of numbers to the right of an index, we can multiply them together to
// get the product of the array except itself at that index
// Compute prefix product (from left side): prefixProduct[i] = prefixProduct[i-1] * nums[i-1]
// Compute suffix product (from right side): suffixProduct[i] = suffixProduct[i+1] * nums[i+1]
// Result[i] = prefix[i] * suffix[i]
// O(N) time, O(N) space
var productExceptSelf = function(nums) {
 // Initialize prefix product, suffix product, and result arrays
 const numsLength = nums.length;
 const prefixProduct = new Array(numsLength);
 const suffixProduct = new Array(numsLength);
 const result = new Array(numsLength);
 
 // Compute prefix product (starting from the left)
 // This keeps track of the product of everything to the left of an index i in the original nums array
 // i.e. [1,2,3,4] turns into [1,1,2,6]
 prefixProduct[0] = 1;
 for (let i = 1; i < numsLength; i++) {
   prefixProduct[i] = prefixProduct[i-1] * nums[i-1];
 }
 
 // Compute suffix product (starting from the right)
 // This keeps track of the product of everything to the right of an index i in the original nums array
 // i.e. [1,2,3,4] turns into [24,12,4,1]
 suffixProduct[numsLength - 1] = 1;
 for (let j = numsLength - 2; j >= 0; j--) {
   suffixProduct[j] = suffixProduct[j+1] * nums[j+1];
 }
 
 // Compute result: result[i] = prefixProduct[i] * suffixProduct[i]
 // where each index is computed as the product of all things to the left of the index multiplied by
 // the product of all things to the right of the index
 // i.e. prefixProduct [1,1,2,6] and suffixProduct [24,12,4,1]
 // turns into [24,12,8,6]
 for (let k = 0; k < numsLength; k++) {
   result[k] = prefixProduct[k] * suffixProduct[k];
 }
 
 return result;
};`;

const productOfArrayExceptSelfConstantSpaceCode = `/**
* @param {number[]} nums
* @return {number[]}
*/
// Approach 2:
// Intuition: for every index in the nums array, if we can know the product of the numbers to the left
// of an index and the product of numbers to the right of an index, we can multiply them together to
// get the product of the array except itself at that index
// Compute prefix product first in the result array by using a temp variable
// Compute suffix product against the result array by using a temp variable
// O(N) time, O(1) space since result array doesn't count as extra space
var productExceptSelf = function(nums) {
 // Initialize prefix product, suffix product, and result arrays
 const numsLength = nums.length;
 const result = new Array(numsLength);
 
 // Compute prefix product (starting from the left) in the result array
 // This keeps track of the product of everything to the left of an index i in the original nums array
 // i.e. [1,2,3,4] turns into [1,1,2,6]
 let temp = 1;
 for (let i = 0; i < numsLength; i++) {
   result[i] = temp;
   temp *= nums[i];
 }
 
 // Compute suffix product (starting from the right) and multiply it to the prefix product already in the result
 // i.e. result with prefix product [1,1,2,6] turns into [24,12,8,6] after taking into account the suffix product
 // This multiplies the product of everything to the left of the index with the product of all things to the right of the index
 temp = 1;
 for (let j = numsLength - 1; j >= 0; j--) {
   result[j] *= temp;
   temp *= nums[j]
 }
 
 return result;
};`;

const ProductOfArrayExceptSelf: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/product-of-array-except-self/</p>
      <p>
        Given an integer array nums, return an array answer such that answer[i]
        is equal to the product of all the elements of nums except nums[i]. The
        product of any prefix or suffix of nums is guaranteed to fit in a 32-bit
        integer. You must write an algorithm that runs in O(n) time and without
        using the division operation. Follow-up: Can you solve the problem in
        O(1) extra space complexity? (The output array does not count as extra
        space for space complexity analysis.)
      </p>

      <Prism.Tabs>
        <Prism.Tab label="linearSpaceCode.js" language="javascript">
          {productOfArrayExceptSelfCode}
        </Prism.Tab>
        <Prism.Tab label="constantSpaceCode.js" language="javascript">
          {productOfArrayExceptSelfConstantSpaceCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ProductOfArrayExceptSelf;
