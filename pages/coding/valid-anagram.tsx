import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const hashmapCode = `/**
* @param {string} s
* @param {string} t
* @return {boolean}
*/
// O(N) time, O(N) space - whichever string s or t is longer
var isAnagram = function(s, t) {
 // If s and t do not have the same length
 if (s.length !== t.length) {
   return false;
 }
 
 // Get the counts of characters in s
 const sMap = {};
 for (let char of s) {
   if (sMap.hasOwnProperty(char)) {
     sMap[char]++;
   } else {
     sMap[char] = 1;
   }
 }
 
 // Loop through characters in t
 for (let char of t) {
   // Decrement counts of characters in s found in t
   if (sMap.hasOwnProperty(char)) {
     sMap[char]--;
     
     // If we hit negative on any of the counts, we return false
     if (sMap[char] < 0) {
       return false;
     }
   // If the character is only in t, we also return false
   } else {
     return false;
   }
 }
 
 // Loop through the counts of s and if any are not 0 we return false
 return Object.keys(sMap).every((char) => sMap[char] === 0);
};`;

const ValidAnagram: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/valid-anagram/</p>
      <p>
        Given two strings s and t, return true if t is an anagram of s, and
        false otherwise. An Anagram is a word or phrase formed by rearranging
        the letters of a different word or phrase, typically using all the
        original letters exactly once.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="hashmap.js" language="javascript">
          {hashmapCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ValidAnagram;
