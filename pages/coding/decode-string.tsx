import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const stackCode = `/**
* @param {string} s
* @return {string}
*/
// Stack Approach
// O((maxK^countK)*N) time -> maxK = maximum value of K, countK is count of nested k values and N is maximum length of encoded string
// O(sum((maxK^countK)*N)) space -> can hold the entire decoded string at the end
var decodeString = function(encodedString) {
 const isNumber = (char) => {
   return /[0-9]/.test(char);
 }

 const stack = [];

 let i = 0;
 while (i < encodedString.length) {
   // Extract the entire number i.e. it can be 2, 20, some positive integer for num repetitions and push onto stack
   if (isNumber(encodedString[i])) {
     let startNumberIndex = i;
     while (isNumber(encodedString[i])) {
       i++; 
     }

     const numRepetitions = parseInt(encodedString.substring(startNumberIndex, i), 10);
     stack.push(numRepetitions);
   } else if (encodedString[i] === "[") {
     // Skip open brackets
     i++;
   } else if (encodedString[i] === "]") {
     // We continue to pop from the stack all the characters until we reach a number
     const decodedChars = [];
     while (stack.length > 0 && !Number.isInteger(stack[stack.length - 1])) {
       const decodedChar = stack.pop();
       decodedChars.push(decodedChar);
     }
     // Pop the number of times we repeat the substring
     const numRepetitions = stack.pop();

     // Repeat the substring and add back onto the stack
     const decodedString = decodedChars.reverse().join("").repeat(numRepetitions);
     stack.push(decodedString);
     
     i++;
   } else {
     // Push alphabetic characters onto the stack
     stack.push(encodedString[i]);
     i++;
   }	
 }

 return stack.join("");
};`;

const DecodeString: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/decode-string/</p>
      <p>
        Given an encoded string, return its decoded string. The encoding rule
        is: k[encoded_string], where the encoded_string inside the square
        brackets is being repeated exactly k times. Note that k is guaranteed to
        be a positive integer. You may assume that the input string is always
        valid; there are no extra white spaces, square brackets are well-formed,
        etc. Furthermore, you may assume that the original data does not contain
        any digits and that digits are only for those repeat numbers, k. For
        example, there will not be input like 3a or 2[4]. The test cases are
        generated so that the length of the output will never exceed 105.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="stack.js" language="javascript">
          {stackCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default DecodeString;
