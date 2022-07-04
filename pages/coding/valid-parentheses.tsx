import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const stackCode = `/**
* @param {string} s
* @return {boolean}
*/
// O(N) time, O(N) space
var isValid = function(s) {
 if (s.length === 0) {
   return true;
 }
 
 const brackets = {
   "{": "}",
   "(": ")",
   "[": "]",
 };
 
 
 const stack = [];
 
 for (let bracket of s) {
   const isOpenBracket = brackets.hasOwnProperty(bracket);
   // Push open brackets onto the stack
   if (isOpenBracket) {
     stack.push(bracket);
   } else {
   // For closed brackets we make sure we can find the matching open bracket at the top of the stack
     if (stack.length === 0) {
       return false;
     }

     const currentOpenBracket = stack[stack.length - 1];
     if (brackets[currentOpenBracket] !== bracket) {
       return false;
     }

     // If they matched, we remove the top open bracket
     stack.pop();
   }
 }
 
 // Assuming all the brackets are matched and accounted for, we return true
 return stack.length === 0;
};`;

const ValidParentheses: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/valid-parentheses/</p>
      <p>
        Given a string s containing just the characters {"("}, {")"}, {"{"},{" "}
        {"}"}, {"["} and {"]"}, determine if the input string is valid. An input
        string is valid if: Open brackets must be closed by the same type of
        brackets. Open brackets must be closed in the correct order.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="stack.js" language="javascript">
          {stackCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ValidParentheses;
