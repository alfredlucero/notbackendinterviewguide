import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const removeKDigitsCode = `// Assuming we're given at least k digits in num string
// Given 10200, k = 1 -> 200 by removing the 1
// 12345, k = 1 -> if increasing we can remove the least significant digit 5 to make it 1234
// 54321, k = 1 -> if decreasing we can remove the most significant digit 5 to make it 4321
// 9119, k = 1 -> remove 9 to make 119
// 10, k = 2 -> remove both digits to make 0
// 1432219, k = 3 -> have some sort of stack to push each number; if top of stack is greater than current number i.e. [1, 4] encounter 3; 4 > 3; pop 4, push 3-> [1,3]; next iteration 3 > 2, pop 3 -> [1,2,2] -> pop 2, push 1 -> [1,2,1], k = 0 -> [1,2,1,9]
// Monotonic stack: keep popping while top of stack is greater than current number and there is k left and push current number onto stack
var removeKdigits = function(num, k) {
    // Initialize stack
    let stack = [];
    
    // Loop through each number in string
    for (let i = 0; i < num.length; i++) {
        const currentNum = num[i];
        // While we still have k digits to pop and the top of the stack is greater than the current number
        while (k > 0 && stack.length > 0 && stack[stack.length - 1] > currentNum) {
            // Decrement k since we're removing a digit
            k--;
            // Pop from the stack i.e. remove number from end result
            stack.pop();
        } 
        
        // Push current number onto stack
        stack.push(currentNum);
    }
        
    
    // If there are remaining k elements, we remove those from end result
    stack = stack.slice(0, stack.length - k);
    
    // If all digits have been removed, return "0"
    if (stack.length === 0) {
        return "0";
    }
    
    // Account for any leading zeroes in result
    let lastZeroIndex = null;
    for (let j = 0; j < stack.length; j++) {
        if (stack[j] === "0") {
            lastZeroIndex = j;
        } else {
            break;
        }
    }
    
    const result = lastZeroIndex !== null ? stack.slice(lastZeroIndex + 1).join("") : stack.join("");
    return result !== "" ? result : "0";
};`;

const RemoveKDigits: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/remove-k-digits/</p>
      <p>
        Given string num representing a non-negative integer num, and an integer
        k, return the smallest possible integer after removing k digits from
        num.
      </p>
      <Prism language="javascript">{removeKDigitsCode}</Prism>
    </div>
  );
};

export default RemoveKDigits;
