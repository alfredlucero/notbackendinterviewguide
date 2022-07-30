import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const topSortCode = `/**
* @param {string[]} words
* @return {string}
*/
// O(C) time where C is total length of all words in input list
// O(1) space assuming we have only 26 characters but O(U + min(U^2, N)) otherwise where U is total number of unique letters aka (E + V) at most U^2 or N edges
// and N is total number of strings in input list
var alienOrder = function(words) {
 // Initialize adjacency list and find all unique letters for indegrees map
 const adjList = new Map(); // Keeps track of character key that comes before dependent characters
 const indegrees = new Map(); // Keeps track of number of characters that come before the key character
 words.forEach((word) => {
   for (let char of word) {
     indegrees.set(char, 0);
     adjList.set(char, []);
   }
 });
 
 // Find all edges to build out adjacency list and set indegrees
 for (let i = 0; i < words.length - 1; i++) {
   const word1 = words[i];
   const word2 = words[i+1];
   
   // Check that word2 is not a prefix of word1 i.e. abcd abc is not possible so we return ""
   if (word1.length > word2.length && word1.startsWith(word2)) {
     return "";
   }
   
   // Find the first non match and insert the corresponding relation before breaking out
   for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
     if (word1[j] !== word2[j]) {
       adjList.get(word1[j]).push(word2[j]);
       indegrees.set(word2[j], indegrees.get(word2[j]) + 1);
       break;
     }
   }
 }
 
 // BFS/Topological Sort
 const output = [];
 const queue = [];
 
 // Add all characters with zero indegrees to start off the topological sort
 for (let [char, indegree] of indegrees) {
   if (indegree === 0) {
     queue.push(char);
   }
 }
 
 while (queue.length > 0) {
   const char = queue.shift();
   output.push(char);
   
   adjList.get(char).forEach((next) => {
     indegrees.set(next, indegrees.get(next) - 1);
     if (indegrees.get(next) === 0) {
       queue.push(next);
     }
   });
 }
 
 // If our alien ordering does not have at least all of the unique characters, we don't have a valid ordering
 if (output.length < indegrees.size) {
   return "";
 }
 
 // We have one of multiple valid orderings so we return what we have in the output
 return output.join("");
};`;

const AlienDictionary: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/alien-dictionary/</p>
      <p>
        There is a new alien language that uses the English alphabet. However,
        the order among the letters is unknown to you. You are given a list of
        strings words from the alien language dictionary, where the strings in
        words are sorted lexicographically by the rules of this new language.
        Return a string of the unique letters in the new alien language sorted
        in lexicographically increasing order by the new language rules. If
        there is no solution, return empty string. If there are multiple
        solutions, return any of them. A string s is lexicographically smaller
        than a string t if at the first letter where they differ, the letter in
        s comes before the letter in t in the alien language. If the first
        min(s.length, t.length) letters are the same, then s is smaller if and
        only if s.length less than t.length.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="topSort.js" language="javascript">
          {topSortCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default AlienDictionary;
