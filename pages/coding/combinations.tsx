import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const backtrackCode = `/**
* @param {number} n
* @param {number} k
* @return {number[][]}
*/
// O(N!/(N-k)!k!) time and space for output
var combine = function(n, k) {
 const combinations = [];
 const combinationsHelper = (index, currentCombo) => {
   if (currentCombo.length === k) {
     combinations.push([...currentCombo]);
     return;
   }
   
   for (let i = index; i <= n; i++) {
     currentCombo.push(i);
     combinationsHelper(i + 1, currentCombo);
     currentCombo.pop();
   }
 }
 
 combinationsHelper(1, []);
 return combinations;
};`;

const Combinations: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/combinations/</p>
      <p>
        Given two integers n and k, return all possible combinations of k
        numbers out of the range [1, n]. You may return the answer in any order.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="backtrack.js" language="javascript">
          {backtrackCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default Combinations;
