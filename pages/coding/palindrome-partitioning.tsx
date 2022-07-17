import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const backtrackCode = `/**
* @param {string} s
* @return {string[][]}
*/
// O(N*2^N) time as there are 2^N possible substrings and it takes O(N) timeto build a substring and determine if it's a palindrome
// O(N) space for substring and recursion stack
var partition = function(s) {
 const partitions = [];
 
 const isPalindrome = (left, right) => {
   while (left < right) {
     if (s[left] !== s[right]) {
       return false;
     }
     left++;
     right--;
   }
   return true;
 };
 
 const partitionHelper = (startIndex, currentPartitions) => {
   // We've reached the end of the string so we add the current partitions we've formed so far to the result
   if (startIndex >= s.length) {
     partitions.push([...currentPartitions]);
     return;
   }
   
   // We'll generate all possible substrings from startIndex to end (up to s.length)
   for (let end = startIndex; end < s.length; end++) {
     // Only if it's a palindrome, we try to expand and see if further substrings are also palindromes
     if (isPalindrome(startIndex, end)) {
       currentPartitions.push(s.substring(startIndex, end + 1));
   
       partitionHelper(end + 1, currentPartitions);
       
       currentPartitions.pop();
     }
   }
 };
 
 partitionHelper(0, []);
 return partitions;
};`;

const PalindromePartitioning: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/palindrome-partitioning/</p>
      <p>
        Given a string s, partition s such that every substring of the partition
        is a palindrome. Return all possible palindrome partitioning of s. A
        palindrome string is a string that reads the same backward as forward.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="backtrack.js" language="javascript">
          {backtrackCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default PalindromePartitioning;
