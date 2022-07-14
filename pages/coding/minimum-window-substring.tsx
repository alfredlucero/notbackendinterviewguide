import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const slidingWindowCode = `/**
* @param {string} s
* @param {string} t
* @return {string}
*/
// O(S + T) time, O(S + T) space
var minWindow = function(s, t) {
 if (s.length === 0 || t.length === 0) {
   return "";
 }
 
 // Use a hashmap to keep track of a count of all the unique characters in t
 const tCounts = new Map();
 for (let i = 0; i < t.length; i++) {
   const char = t[i];
   if (tCounts.has(char)) {
     tCounts.set(char, tCounts.get(char) + 1);
   } else {
     tCounts.set(char, 1);
   }
 }
 
 // Sliding Window Approach
 // Keep expanding the right pointer until we get a desirable window
 let right = 0;
 // Contract the window whenever we have a desirable window to see if we can make it smaller
 let left = 0;
 
 // Keep track of the counts of all the unique characters in the current window
 const windowCounts = new Map();
 
 // Keep track of the number of unique required characters we need to find with the right counts in the window
 const numRequiredCharacters = tCounts.size;
 // Keep track of the unique characters found in the window that have the right counts as in t
 let numWindowCharacters = 0; 
 
 // Keep track of the answer (minimum length, left/right index of substring)
 const answer = {
   minLength: -1,
   left: 0,
   right: 0,
 };
 
 while (right < s.length) {
   // Keep expanding the right window until we get a desirable window that has all characters of t
   // Increment the character count found in the current window
   const char = s[right];
   const oldCount = windowCounts.has(char) ? windowCounts.get(char) : 0;
   windowCounts.set(char, oldCount + 1);
   
   // If the counts of the current character added equals the desired count in t, increment the number of window characters we've seen that are in t
   if (tCounts.has(char) && windowCounts.get(char) === tCounts.get(char)) {
     numWindowCharacters++;
   }
   
   // Try to contract the window until the point where it ceases to be desirable aka doesn't have all the characters in the window
   while (left <= right && numWindowCharacters === numRequiredCharacters) {      
     // Update the smallest window so far
     const currentMinLength = right - left + 1;
     if (answer.minLength === -1 || currentMinLength < answer.minLength) {
       answer.minLength = currentMinLength;
       answer.left = left;
       answer.right = right;
     }
     
     const char = s[left];
     // The character at the left is no longer a part of the window
     // so we decrement the count for it
     windowCounts.set(char, windowCounts.get(char) - 1);
     // Decrement the number of window characters seen if removing it no longer matches the count of it in t
     if (tCounts.has(char) && windowCounts.get(char) < tCounts.get(char)) {
       numWindowCharacters--;
     }
         
     // Move the left pointer to see if we can find a smaller window 
     left++;
   }
   
   // Keep expanding the window once we're done contracting
   right++;
 }
 
 // If we cannot find all the characters of t in s, we return empty string
 if (answer.minLength === -1) {
   return "";
 }
 
 // Otherwise, we found an answer and need to return that substring
 return s.substring(answer.left, answer.right + 1);
};`;

const MinimumWindowSubstring: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/minimum-window-substring/</p>
      <p>
        Given two strings s and t of lengths m and n respectively, return the
        minimum window substring of s such that every character in t (including
        duplicates) is included in the window. If there is no such substring,
        return the empty string. The testcases will be generated such that the
        answer is unique. A substring is a contiguous sequence of characters
        within the string.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="slidingWindow.js" language="javascript">
          {slidingWindowCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default MinimumWindowSubstring;
