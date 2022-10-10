import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const twoPointersJsCode = `/**
* @param {string} s
* @return {boolean}
*/
// O(N) time, O(1) space
var isPalindrome = function(s) {
 const isAlphaNumeric = (char) => {
   return /[a-zA-Z0-9]/.test(char);
 };
 
 if (s.length <= 1) {
   return true;
 }
 
 let left = 0;
 let right = s.length - 1;
 
 while (left < right) {
   // Keep incrementing left until we reach an alphanumeric character
   while (!isAlphaNumeric(s[left])) {
     left++;
   }
   // Keep decrementing right until we reach an alphanumeric character
   while (!isAlphaNumeric(s[right])) {
     right--;
   }
   
   // If the alphanumeric characters case-insensitive do not match, it's not a palindrome
   if (left < right && s[left].toLowerCase() !== s[right].toLowerCase()) {
     return false;
   }
   
   // Assume they match, so we move both left and right inward
   left++;
   right--;
 }
 
 return true;
};`;

const twoPointersCppCode = `class Solution {
  public:
      // O(N) time, O(1) space
      bool isPalindrome(string s) {
        int left = 0;
        int right = s.length() - 1;
        
        // Two pointer approach to check characters match on left and right and work your way inward
        while (left < right) {
          // Skip non-alphanumeric characters on the left
          while (left < s.length() && !isalnum(s[left])) {
            left++;
          }
          
          // Skip non-alphanumeric characters on the right
          while (right >= 0 && !isalnum(s[right])) {
            right--;
          }
          
          // Both left and right should be alphanumeric...
          // If the characters don't match, we don't have a palindrome
          if (left < right && tolower(s[left]) != tolower(s[right])) {
            return false;
          }
          
          left++;
          right--;
        }
        
        // We've checked all the characters, so it's a valid palindrome
        return true;
      }
  };`;

const twoPointersJavaCode = `class Solution {
  // O(N) time, O(1) space
  public boolean isPalindrome(String s) {
      int left = 0;
      int right = s.length() - 1;
      
      // Two pointer approach to check characters on left match characters on right and work your way inward
      while (left < right) {
        
        // Keep on skipping the non-alphanumeric characters on the left
        while(left < s.length() && !Character.isLetterOrDigit(s.charAt(left))) {
          left++;
        }
        
        // Keep on skipping the non-alphanumeric characters on the right
        while (right >= 0 && !Character.isLetterOrDigit(s.charAt(right))) {
          right--;
        }
        
        // Both left and right should have alphanumeric characters if the indices haven't crossed...
        // If both left and right characters do not match, we will return false since it can't be a palindrome
        if (left < right && Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
          return false;
        }
        
        left++;
        right--;
      }
      
      
      // We've verified all alphanumeric characters form a palindrome
      return true;
  }
}`;

const ValidPalindrome: NextPage = () => {
  return (
    <div>
      {/* NC150 */}
      <p>Source: https://leetcode.com/problems/valid-palindrome/</p>
      <p>
        A phrase is a palindrome if, after converting all uppercase letters into
        lowercase letters and removing all non-alphanumeric characters, it reads
        the same forward and backward. Alphanumeric characters include letters
        and numbers. Given a string s, return true if it is a palindrome, or
        false otherwise.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="twoPointers.js" language="javascript">
          {twoPointersJsCode}
        </Prism.Tab>
        <Prism.Tab label="twoPointers.cpp" language="cpp">
          {twoPointersCppCode}
        </Prism.Tab>
        <Prism.Tab label="twoPointers.java" language="diff">
          {twoPointersJavaCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ValidPalindrome;
