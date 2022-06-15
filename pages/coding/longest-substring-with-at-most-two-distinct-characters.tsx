import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const slidingWindowCode = `/**
* @param {string} s
* @return {number}
*/
// O(N) time, O(N) space for the character counts map (can optimize with two pointers instead to be O(1) space)
var lengthOfLongestSubstringTwoDistinct = function(s) {
 const charCountMap = new Map();
 let maxLength = 0;
 let start = 0; 
 let end = 0;
 let currentDistinctChars = 0;
   
 // While the end pointer has not reached the end of the string
 while (end < s.length) {
   const currentEndChar = s[end];
   // Add the current character to the character count map (default to 1 if not yet added)
   charCountMap.set(currentEndChar, (charCountMap.get(currentEndChar) ?? 0) + 1);
   
  // If the current character count is 1, increment the number of distinct chars seen in start to end substring
   if (charCountMap.get(currentEndChar) === 1) {
     currentDistinctChars += 1;
   }
   // Move the end pointer forward
   end += 1;

   // While the number of distinct characters seen so far is greater than 2,
   // we need to shrink the sliding window until it's back down to 2 distinct characters seen so far
   while (currentDistinctChars > 2) {
     const currentStartChar = s[start];
     // Decrement the count of the current start character by 1 
     charCountMap.set(currentStartChar, charCountMap.get(currentStartChar) - 1);
     
     // If the current character count is 0, decrement the number of distinct chars seen in start to end substring
     if (charCountMap.get(currentStartChar) === 0) {
       currentDistinctChars -= 1;
     }
     
     // Move the start pointer forward
     start += 1;
   }
   

   // Update the max length with the greater of the current max length and the end - start substring length
   maxLength = Math.max(maxLength, end - start);
 }

 return maxLength;
};`;

const LongestSubstringWithAtMostTwoDistinctCharacters: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/
      </p>
      <p>
        Given a string s, return the length of the longest substring that
        contains at most two distinct characters.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="slidingWindow.js" language="javascript">
          {slidingWindowCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default LongestSubstringWithAtMostTwoDistinctCharacters;
