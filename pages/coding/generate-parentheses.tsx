import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const backtrackCode = `/**
* @param {number} n
* @return {string[]}
*/
// O(N * 2^(2n)) time, O(N) space
var generateParenthesis = function(n) {
 const parentheses = [];
 const parenthesesHelper = (currentParentheses, numOpen, numClosed, numMax) => {
   if (currentParentheses.length === 2 * n) {
     parentheses.push(currentParentheses.join(""));
     return;
   }
   
   if (numOpen < numMax) {
     currentParentheses.push("(");
     parenthesesHelper(currentParentheses, numOpen + 1, numClosed, numMax);
currentParentheses.pop()
   }

   if (numClosed < numOpen) {
     currentParentheses.push(")");
     parenthesesHelper(currentParentheses, numOpen, numClosed + 1, numMax);
     currentParentheses.pop();
   }
 };

 if (n === 0) {
   return [];
 }

 parenthesesHelper([], 0, 0, n);
 return parentheses;
};`;

const GenerateParentheses: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/generate-parentheses/</p>
      <p>
        Given n pairs of parentheses, write a function to generate all
        combinations of well-formed parentheses.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="backtrack.js" language="javascript">
          {backtrackCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default GenerateParentheses;
