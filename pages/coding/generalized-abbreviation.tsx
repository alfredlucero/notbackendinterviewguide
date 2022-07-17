import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsCode = `/**
* @param {string} word
* @return {string[]}
*/
// O(N*2^N) time, O(N) space
var generateAbbreviations = function(word) {
 const abbreviations = [];
 const generateAbbreviationsHelper = (currentAbbreviation, startIndex, abbreviatedCount) => {
   // We've finished abbreviating the word so we add it to result
   // If we have a count, we'll add it to the end of the current abbreviation
   if (startIndex === word.length) {
     if (abbreviatedCount > 0) {
       currentAbbreviation += abbreviatedCount;
     }
     abbreviations.push(currentAbbreviation);
     return;
   }
   
   // Keep the current abbreviation 
   if (abbreviatedCount > 0) {
     // If we have a count, we add the count and current letter and continue on
     generateAbbreviationsHelper(currentAbbreviation + abbreviatedCount + word[startIndex], startIndex + 1, 0);
   } else {
     // If we don't have a count, we add the current letter and continue on
     generateAbbreviationsHelper(currentAbbreviation + word[startIndex], startIndex + 1, 0);
   }
   
   // Skip the current abbreviation by not adding the current letter and add onto count
   generateAbbreviationsHelper(currentAbbreviation, startIndex + 1, abbreviatedCount + 1);
 };
 
 generateAbbreviationsHelper("", 0, 0);
 return abbreviations;
};`;

const GeneralizedAbbreviation: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/generalized-abbreviation/</p>
      <p>
        A word generalized abbreviation can be constructed by taking any number
        of non-overlapping and non-adjacent substrings and replacing them with
        their respective lengths. For example, abcde can be abbreviated into:
        a3e (bcd turned into 3) 1bcd1 (a and e both turned into 1) 5 (abcde
        turned into 5) abcde (no substrings replaced) However, these
        abbreviations are invalid: 23 (ab turned into 2 and cde turned into 3)
        is invalid as the substrings chosen are adjacent. 22de (ab turned into 2
        and bc turned into 2) is invalid as the substring chosen overlap. Given
        a string word, return a list of all the possible generalized
        abbreviations of word. Return the answer in any order.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default GeneralizedAbbreviation;
