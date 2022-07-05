import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsCode = `/**
* @param {number[]} nums
* @return {number[][]}
*/
// O(N*2^N) time to generate all subsets and then copy into output list
// O(N) space for the current subset
var subsets = function(nums) {
 const allSubsets = [];
 
 // DFS by skipping the current number or adding the current number to the current subset
 const subsetsHelper = (index, currentSubset) => {
   // If we've gone through all the nums, we'll add a clone of the current subset and return
   if (index === nums.length) {
     allSubsets.push([...currentSubset]);
     return;
   }
   
   // Try recursively creating more subsets by skipping the current number
   subsetsHelper(index + 1, currentSubset);

   // Add the current number to the current subset and recursively try creating subsets with that current number
   currentSubset.push(nums[index]);
   subsetsHelper(index + 1, currentSubset);

   // Backtrack and pop the current number
   currentSubset.pop();
 };
 
 subsetsHelper(0, []);
 return allSubsets;
};`;

const Subsets: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/subsets/</p>
      <p>
        Given an integer array nums of unique elements, return all possible
        subsets (the power set). The solution set must not contain duplicate
        subsets. Return the solution in any order.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dfsBacktrack.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default Subsets;
