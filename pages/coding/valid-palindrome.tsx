import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const twoPointersCode = `/**
* @param {string} s
* @return {boolean}
*/
// O(N) time, O(1) space
var isPalindrome = function(s) {
 const isAlphaNumeric = (char) => {
   return /[a-zA-Z0-9]/.test(char);
 };
 
 if (s.length <= 1) {
   return true;
 }
 
 let left = 0;
 let right = s.length - 1;
 
 while (left < right) {
   // Keep incrementing left until we reach an alphanumeric character
   while (!isAlphaNumeric(s[left])) {
     left++;
   }
   // Keep decrementing right until we reach an alphanumeric character
   while (!isAlphaNumeric(s[right])) {
     right--;
   }
   
   // If the alphanumeric characters case-insensitive do not match, it's not a palindrome
   if (left < right && s[left].toLowerCase() !== s[right].toLowerCase()) {
     return false;
   }
   
   // Assume they match, so we move both left and right inward
   left++;
   right--;
 }
 
 return true;
};`;

const ValidPalindrome: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/valid-palindrome/</p>
      <p>
        A phrase is a palindrome if, after converting all uppercase letters into
        lowercase letters and removing all non-alphanumeric characters, it reads
        the same forward and backward. Alphanumeric characters include letters
        and numbers. Given a string s, return true if it is a palindrome, or
        false otherwise.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="stack.js" language="javascript">
          {twoPointersCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ValidPalindrome;
