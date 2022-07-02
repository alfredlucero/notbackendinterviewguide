import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsBacktrackCode = `/**
* @param {string} digits
* @return {string[]}
*/
// O(4^N * N) time where N is the length of digits and 4 is the max number of letters for a digit
// O(N) where N is the length of the digits for recursion stack (not counting outputs)
var letterCombinations = function(digits) {
 // Initialize map of digits to letters
 const digitLetters = {
   2: "abc",
   3: "def",
   4: "ghi",
   5: "jkl",
   6: "mno",
   7: "pqrs",
   8: "tuv",
   9: "wxyz"
 };
 // If there are no digits, return empty array
 if (digits.length === 0) {
   return [];
 }
 
 // DFS with Backtracking to build up all the permutations of letter combinations given a phone number
 const dfs = (path, digitIndex, res) => {
   // If we reached a valid letter combination mapped from all the digits of the phone number, we push onto the reuslt
   if (path.length === digits.length) {
     res.push(path.join(""));
     return;
   }
   
   // Get the current digit and map it to the possible phone number letters i.e. 1 -> "abc"
   const currentDigit = parseInt(digits[digitIndex], 10);
   const phoneNumberLetters = digitLetters[currentDigit];
   // Loop through each letter i.e. "a", "b", "c" for "abc"
   for (let letter of phoneNumberLetters) {
     // Push the letter onto the path
     path.push(letter);
       
     // Recursively add the next digit
     dfs(path, digitIndex + 1, res);
       
     // Backtrack after we're done processing the current letter
     path.pop();
   }
 };
 
 const result = [];
 dfs([], 0, result);
 
 return result;
};`;

const LetterCombinationsOfAPhoneNumber: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://leetcode.com/problems/letter-combinations-of-a-phone-number/
      </p>
      <p>
        Given a string containing digits from 2-9 inclusive, return all possible
        letter combinations that the number could represent. Return the answer
        in any order. A mapping of digits to letters (just like on the telephone
        buttons) is given below. Note that 1 does not map to any letters.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="dfsBacktrack.js" language="javascript">
          {dfsBacktrackCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default LetterCombinationsOfAPhoneNumber;
