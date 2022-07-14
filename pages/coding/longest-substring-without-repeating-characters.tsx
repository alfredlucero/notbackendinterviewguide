import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const slidingWindowCode = `/**
* @param {string} s
* @return {number}
*/
// O(S) time, O(min(S,characterset)) space
var lengthOfLongestSubstring = function(s) {
 if (s.length === 0) {
   return 0;
 }
 
 // Keep track of the number of unique characters in the window
 const windowCounts = new Map();
 let maxLength = 0;
 let numWindowRepeating = 0;
 
 // Sliding window approach
 let left = 0;
 let right = 0;
 
 while (right < s.length) {
   // Increment the count of the character in the window
   const rightChar = s[right];
   windowCounts.set(rightChar, windowCounts.has(rightChar) ? windowCounts.get(rightChar) + 1 : 1);
   
   // Contract the window if the number of repeating characters for the character on the right is greater than 1
   while (left <= right && windowCounts.get(rightChar) > 1) {
     // Decrement the count of the character in the left that will no longer be part of the window
     const leftChar = s[left];
     windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);
     
     // Keep moving left as long as we have repeating characters
     left++;
   }
   
   // Update the max length if it's greater
   const currentMaxLength = right - left + 1;
   if (currentMaxLength > maxLength) {
     maxLength = currentMaxLength;
   }
   
   // Keep moving right as long as we have no repeating characters
   right++;
 }
 
 return maxLength;
};`;

const LongestSubstringWithoutRepeatingCharacters: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://leetcode.com/problems/longest-substring-without-repeating-characters/
      </p>
      <p>
        Given a string s, find the length of the longest substring without
        repeating characters.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="slidingWindow.js" language="javascript">
          {slidingWindowCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default LongestSubstringWithoutRepeatingCharacters;
