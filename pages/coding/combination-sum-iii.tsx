import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const backtrackCode = `/**
* @param {number} k
* @param {number} n
* @return {number[][]}
*/
// O(9!*K / (9 - K)!) time (K to create combination, 9 choose K combinations), O(K) space
var combinationSum3 = function(k, n) {
 const combinations = [];
 const combinationSumHelper = (startIndex, currentCombo, remaining) => {
   if (remaining < 0) {
     return;
   }
   if (currentCombo.length === k && remaining === 0) {
     combinations.push([...currentCombo]);
     return;
   }
   
   for (let i = startIndex; i <= 9; i++) {
     currentCombo.push(i);
     
     combinationSumHelper(i + 1, currentCombo, remaining - i);
     
     currentCombo.pop();
   }
 };
 
 combinationSumHelper(1, [], n);
 return combinations;
};`;

const CombinationSumIII: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/combination-sum-iii/</p>
      <p>
        Find all valid combinations of k numbers that sum up to n such that the
        following conditions are true: Only numbers 1 through 9 are used. Each
        number is used at most once. Return a list of all possible valid
        combinations. The list must not contain the same combination twice, and
        the combinations may be returned in any order.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="backtrack.js" language="javascript">
          {backtrackCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default CombinationSumIII;
