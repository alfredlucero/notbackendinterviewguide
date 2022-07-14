import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const slidingWindowCode = `/**
* @param {string} s
* @param {number} k
* @return {number}
*/
// O(S) time, O(min(characterset, s)) space
var characterReplacement = function(s, k) {
 const counts = Array.from({ length: 26 }, () => 0);
 let left = 0;
 let right = 0;
 let maxCount = 0;
 let maxLength = 0;
 
 const getCharIndex = (char) => {
   return char.charCodeAt(0) - 'A'.charCodeAt(0);
 };
 
 while (right < s.length) {
   const rightChar = s[right];
   // Increment the count of the right character in the window
   counts[getCharIndex(rightChar)]++;
   
   // Update the max count of the character in the window if greater
   if (counts[getCharIndex(rightChar)] > maxCount) {
     maxCount = counts[getCharIndex(rightChar)];
   }
   
   // Contract while there are more unique characters than k replacements in the window
   if (right - left + 1 - maxCount > k) {
     // Decrement the count of the left character since it will be no longer part of the window
     const leftChar = s[left];
     counts[getCharIndex(leftChar)]--;
     
     left++;
   }
   
   // Update the max length after k replacements happen if it's greater
   maxLength = Math.max(maxLength, right - left + 1);
   
   right++;
 }

 return maxLength;
};`;

const LongestRepeatingCharacterReplacement: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://leetcode.com/problems/longest-repeating-character-replacement/
      </p>
      <p>
        You are given a string s and an integer k. You can choose any character
        of the string and change it to any other uppercase English character.
        You can perform this operation at most k times. Return the length of the
        longest substring containing the same letter you can get after
        performing the above operations.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="slidingWindow.js" language="javascript">
          {slidingWindowCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default LongestRepeatingCharacterReplacement;
