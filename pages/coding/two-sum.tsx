import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const hashmapCode = `/**
* @param {number[]} nums
* @param {number} target
* @return {number[]}
*/
// O(N) time, O(N) space
var twoSum = function(nums, target) {
 if (nums.length < 2) {
   return [];
 }
 
 const numsMap = new Map();
 
 for (let i = 0; i < nums.length; i++) {
   const currentNum = nums[i];
   const diff = target - currentNum;
   
   if (numsMap.has(diff)) {
     return [i, numsMap.get(diff)];
   } else {
     numsMap.set(currentNum, i);
   }
 }
 
 return [];
};`;

const TwoSum: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/two-sum/</p>
      <p>
        Given an array of integers nums and an integer target, return indices of
        the two numbers such that they add up to target. You may assume that
        each input would have exactly one solution, and you may not use the same
        element twice. You can return the answer in any order.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="hashmap.js" language="javascript">
          {hashmapCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default TwoSum;
