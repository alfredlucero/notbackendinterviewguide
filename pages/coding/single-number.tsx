import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const singleNumberCode = `/**
* @param {number[]} nums
* @return {number}
*/
// XOR Approach
// Loop through the nums and continue to XOR the result with the current num
// Elements that appear twice will cancel out to 0 and the single number will be in final result
// O(N) time, O(1) space
var singleNumber = function(nums) {
 const result = nums.reduce((acc, current) => { return acc ^ current }, 0);
 return result;
};`;

const SingleNumber: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/single-number/</p>
      <p>
        Given a non-empty array of integers nums, every element appears twice
        except for one. Find that single one. You must implement a solution with
        a linear runtime complexity and use only constant extra space.
      </p>
      <Prism language="javascript">{singleNumberCode}</Prism>
    </div>
  );
};

export default SingleNumber;
