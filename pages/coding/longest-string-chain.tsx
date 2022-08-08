import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dpCode = `/**
* @param {string[]} words
* @return {number}
*/
// O(NlogN + N*L^2) where N is the number of words and L is the maximum possible length of a word
// O(N) space for chain map
var longestStrChain = function(words) {
 // Sort the words by length in ascending order
 words.sort((a, b) => a.length - b.length);
 
 // Initialize a hashmap of words to their max chain length 
 const chainMap = new Map();
 
 let longestWordChain = 0;
 
 // Loop through each word to compute the longest word chain along the way
 words.forEach((word) => {
   // Each word has at a minimum a word chain of 1
   chainMap.set(word, 1);
   
   // Find all the possible predecessors for the current word by removing one letter from each index at a time
   for (let i = 0; i < word.length; i++) {
     const predecessor = word.slice(0, i) + word.slice(i + 1);
     
     // If the chain from the predecessor is greater than the chain we have for the word, we update the longest chain so far
     if (chainMap.has(predecessor) && chainMap.get(predecessor) + 1 > chainMap.get(word)) {
       chainMap.set(word, chainMap.get(predecessor) + 1);
     }
   }
   
   // Update the overall longest word chain after going through a word's predecessors
   longestWordChain = Math.max(longestWordChain, chainMap.get(word));
 });
 
 return longestWordChain;
};`;

const LongestStringChain: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/longest-string-chain/</p>
      <p>
        You are given an array of words where each word consists of lowercase
        English letters. wordA is a predecessor of wordB if and only if we can
        insert exactly one letter anywhere in wordA without changing the order
        of the other characters to make it equal to wordB. For example, abc is a
        predecessor of abac, while cba is not a predecessor of bcad. A word
        chain is a sequence of words [word1, word2, ..., wordk] with k {">="} 1,
        where word1 is a predecessor of word2, word2 is a predecessor of word3,
        and so on. A single word is trivially a word chain with k == 1. Return
        the length of the longest possible word chain with words chosen from the
        given list of words.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dp.js" language="javascript">
          {dpCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default LongestStringChain;
