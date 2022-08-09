import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const slidingWindowCode = `/**
* @param {string} s1
* @param {string} s2
* @return {boolean}
*/
// Sliding Window Approach
// O(L1 + 26*(L2 - L1)) time, O(1) space
var checkInclusion = function(s1, s2) {
 if (s1.length > s2.length) {
   return false;
 }
 
 const s1Map = Array.from({ length: 26 }, () => 0);
 const s2Map = Array.from({ length: 26 }, () => 0);
 
 // Add counts of characters from s1 and s2 up to the length of s1
 for (let i = 0; i < s1.length; i++) {
   s1Map[s1.charCodeAt(i) - "a".charCodeAt(0)] += 1;
   s2Map[s2.charCodeAt(i) - "a".charCodeAt(0)] += 1;
 }
 
 // Check all s1 length substrings of s2 while checking if we've encountered matching character frequencies
 for (let i = 0; i < s2.length - s1.length; i++) {
   // If we found a substring with matching frequencies as s1, we found a permutation of s1 in s2
   if (hasMatchingFrequencies(s1Map, s2Map)) {
     return true;
   }
   // Add character from the right end
   s2Map[s2.charCodeAt(i + s1.length) - "a".charCodeAt(0)] += 1;
   // Remove character from left end
   s2Map[s2.charCodeAt(i) - "a".charCodeAt(0)] -= 1;
 }
 
 return hasMatchingFrequencies(s1Map, s2Map);
};

function hasMatchingFrequencies(s1Map, s2Map) {
 return s1Map.every((s1Count, idx) => s1Count === s2Map[idx]);
}`;

const PermutationInString: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/permutation-in-string/</p>
      <p>
        Given two strings s1 and s2, return true if s2 contains a permutation of
        s1, or false otherwise. In other words, return true if one of s1's
        permutations is the substring of s2.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="slidingWindow.js" language="javascript">
          {slidingWindowCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default PermutationInString;
