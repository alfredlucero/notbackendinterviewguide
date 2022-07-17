import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const backtrackCode = `/**
* @param {number[]} candidates
* @param {number} target
* @return {number[][]}
*/
// O(N^(T/M + 1)) time as DFS traversal in a n-ary tree; O(T/M) space
var combinationSum = function(candidates, target) {
 const combinations = [];
 const combinationSumHelper = (startIndex, currentCombo, remaining) => {
   if (remaining < 0) {
     return;
   }
   // We find a combination that adds up to the target
   if (remaining === 0) {
     combinations.push([...currentCombo]);
     return;
   }
   
   for (let i = startIndex; i < candidates.length; i++) {
     const currentNum = candidates[i];
     currentCombo.push(currentNum);
     
     // We don't do i + 1 since we can reuse the same number multiple times
     combinationSumHelper(i, currentCombo, remaining - currentNum);
     
     // Backtrack
     currentCombo.pop();
   }
 };
 
 combinationSumHelper(0, [], target);
 return combinations;
};`;

const CombinationSum: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/combination-sum/</p>
      <p>
        Given an array of distinct integers candidates and a target integer
        target, return a list of all unique combinations of candidates where the
        chosen numbers sum to target. You may return the combinations in any
        order. The same number may be chosen from candidates an unlimited number
        of times. Two combinations are unique if the frequency of at least one
        of the chosen numbers is different. It is guaranteed that the number of
        unique combinations that sum up to target is less than 150 combinations
        for the given input.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="backtrack.js" language="javascript">
          {backtrackCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default CombinationSum;
