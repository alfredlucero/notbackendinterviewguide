import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const backtrackingCode = `/**
* @param {number[]} nums
* @return {number[][]}
*/
// O(N!) time for permutations, O(N) space for used array
var permute = function(nums) {
 // Perform DFS on the state-space of possible numbers to form permutations
 const dfs = (path, used, result) => {
   // Once we've used up all the numbers, we've reached a permutation
   // Add copy of path to result and return
   if (path.length === nums.length) {
     result.push([...path]);
     return;
   }
   
   // Loop through each num in nums
   for (let i = 0; i < nums.length; i++) {
     // If the current num is already used, skip
     if (used[i] === true) {
       continue;
     }
     
     // Current num is not used, add it to path and set it to used
     path.push(nums[i]);
     used[i] = true;
     
     // Recursively form the rest of the permutation
     dfs(path, used, result);
     
     // We backtrack and pop the used number from path and set used to false
     path.pop();
     used[i] = false;
   }
 };
 
 // Initialize used array of length nums with all false for unused
 const used = Array.from({ length: nums.length }, () => false);
 // Initialize result array to keep track of all the permutations
 const result = [];
 dfs([], used, result);
 return result;
};`;

const Permutations: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/permutations/</p>
      <p>
        Given an array nums of distinct integers, return all the possible
        permutations. You can return the answer in any order.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="backtracking.js" language="javascript">
          {backtrackingCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default Permutations;
