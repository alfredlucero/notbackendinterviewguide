import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const stackCode = `/**
* @param {string[]} tokens
* @return {number}
*/
// [2, 1, +, 3, *] -> (2 + 1) * 3
// [2], [2,1], encounter +, pop 2 items (1, 2) -> 2 + 1 and push that back onto the stack [3], [3,3], encounter * 
// pop 2 off the stack and do 3 * 3 = 9 and push it back onto the stack
// [4, 13, 5, /, +] -> (13 / 5) + 4
// [4], [4,13], [4,13,5], encounter / so we pop 2 items off the stack -> 5, 13 and do floor(13 / 5) -> 2 and push that result back onto the stack [4,2], encounter + so we pop 2 items off the stack 2,4 and add 4 + 2, push it back onto the stack as 6
// [4] -> [4], we still have some remaining elements so we just pop the result from the stack
// [10, 6, 9, 3, +, -11, *, /, *, 17, + 5, +] -> ((10* (6/((9+3)*-11))) + 17) + 5 => 22
// [10],[10,6], [10,6,9], [10,6,9,3], [10,6,12], [10,6,12,-11], [10,6,-132], [10,0], [0], [0,17], [17],[17,5],[22]
// O(N) time where N is the size of the tokens array
// O(N) space where N is the size of the tokens array
var evalRPN = function(tokens) {
 // Initialize stack
 const stack = [];
 
 // Keep track of a hashmap of operators to associated functions to run
 const operators = {
   "+": (a, b) => a + b,
   "-": (a, b) => a - b,
   "/": (a, b) => Math.trunc(a / b),
   "*": (a, b) => a * b,
 };
 
 // Loop through all the tokens
 tokens.forEach((token) => {
   // When we encounter a number we'll push onto the stack
   if (!operators[token]) {
     const num = parseInt(token, 10);
     stack.push(num);
   } else {
     // When we encounter an operator, we'll pop 2 items off the stack and carry out the operation and push it back onto the stack
     const operation = operators[token];
     const b = stack.pop();
     const a = stack.pop();
     const result = operation(a, b);
     stack.push(result);
   }
 });
 
 
 // We'll pop the only element of the stack left which is the result to return
 const evaluatedResult = stack.pop();
 return evaluatedResult;
};`;

const ReversePolishNotation: NextPage = () => {
  return (
    <div>
      <p>
        Source: https://leetcode.com/problems/evaluate-reverse-polish-notation/
      </p>
      <p>{`Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are +, -, *, and /. Each operand may be an integer or another expression.

Note that division between two integers should truncate toward zero.

It is guaranteed that the given RPN expression is always valid. That means the expression would always evaluate to a result, and there will not be any division by zero operation.`}</p>

      <Prism.Tabs>
        <Prism.Tab label="stackRPN.js" language="javascript">
          {stackCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ReversePolishNotation;
