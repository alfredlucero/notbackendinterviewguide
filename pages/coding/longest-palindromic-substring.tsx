import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const iterativeCode = `/**
* @param {string} s
* @return {string}
*/
// To check for a palindrome we need to check the string can expand with matching letters
// Odd case: "aba", "a", "babab"
// Even case: "aa", "baab", "cbaabc"
// Loop through each letter in s and try and see if we can form a bigger palindrome from that letter
// We will try expanding for the odd case i.e. left and right pointers starting at s[i]
// We will try expanding for the even case i.e. left and right points starting at s[i] and s[i+1]
// O(N^2) time, O(1) space
var longestPalindrome = function(s) {
 let maxLength = 1;
 let maxLeft = 0;
 let maxRight = 1;
 
 // Go through each letter in s and see if we can form a bigger palindrome from that letter
 for (let i = 0; i < s.length - 1; i++) {
   // Try expanding with the odd case and update the longest palindrome if possible
   const [oddLeft, oddRight] = expandPalindrome(i, i);
   const oddMaxLength = oddRight - oddLeft;
   if (oddMaxLength > maxLength) {
     maxLength = oddMaxLength;
     maxLeft = oddLeft;
     maxRight = oddRight;
   }
   
   // Try expanding with the even case and update the longest palindrome if possible 
   const [evenLeft, evenRight] = expandPalindrome(i, i + 1);
   const evenMaxLength = evenRight - evenLeft;
   if (evenMaxLength > maxLength) {
     maxLength = evenMaxLength;
     maxLeft = evenLeft;
     maxRight = evenRight;
   }
 }
 
 return s.substring(maxLeft, maxRight);
 
 // We'll try to expand the palindrome to the left and right and return back the left and right indices of the palindrome
 function expandPalindrome(left, right) {
   let currentLeft = left;
   let currentRight = right;
   
   // Keep expanding to the left and right if within bounds and letters match
   while (currentLeft >= 0 && currentRight < s.length && s[currentLeft] === s[currentRight]) {
     currentLeft--;
     currentRight++;
   }
   
   return [currentLeft+1, currentRight];
 }
};`;

const LongestPalindromicSubstring: NextPage = () => {
  return (
    <div>
      <p>
        Source: https://leetcode.com/problems/longest-palindromic-substring/
      </p>
      <p>Given a string s, return the longest palindromic substring in s.</p>
      <Prism language="javascript">{iterativeCode}</Prism>
    </div>
  );
};

export default LongestPalindromicSubstring;
