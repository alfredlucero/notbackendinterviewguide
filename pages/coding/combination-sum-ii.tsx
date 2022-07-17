import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const backtrackCode = `/**
* @param {number[]} candidates
* @param {number} target
* @return {number[][]}
*/
// O(2^N) time, O(N) space
var combinationSum2 = function(candidates, target) {
 // Sort the numbers first to get rid of duplicates
 candidates.sort();
 
 const combinations = [];
 
 const combinationSumHelper = (startIndex, currentCombo, remaining) => {
   if (remaining < 0) {
     return;
   }
   // We found a combination that adds up to the target
   if (remaining === 0) {
     combinations.push([...currentCombo]);
     return;
   }
   
   for (let i = startIndex; i < candidates.length; i++) {
     // Skip duplicate numbers
     if (i > startIndex && candidates[i] === candidates[i-1]) {
       continue;
     }
     
     const currentNum = candidates[i];
     currentCombo.push(currentNum);
     
     combinationSumHelper(i + 1, currentCombo, remaining - currentNum);
     
     currentCombo.pop();
   }
 };
 
 combinationSumHelper(0, [], target);
 return combinations;
};`;

const CombinationSumII: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/combination-sum-ii/</p>
      <p>
        Given a collection of candidate numbers (candidates) and a target number
        (target), find all unique combinations in candidates where the candidate
        numbers sum to target. Each number in candidates may only be used once
        in the combination. Note: The solution set must not contain duplicate
        combinations.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="backtrack.js" language="javascript">
          {backtrackCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default CombinationSumII;
