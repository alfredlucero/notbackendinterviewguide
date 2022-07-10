import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const greedyCode = `/**
* @param {string[]} words
* @param {number} maxWidth
* @return {string[]}
*/
var fullJustify = function(words, maxWidth) {
 // Greedily find the last word index that can fit into a line starting from start index
 const findLastWordIndex = (startIndex) => {
   let lastWordIndex = startIndex;
   let currentWidth = words[lastWordIndex].length;
   lastWordIndex++;
   
   while (lastWordIndex < words.length && currentWidth + words[lastWordIndex].length + 1 <= maxWidth) {
     currentWidth += words[lastWordIndex].length + 1;
     lastWordIndex++;
   }
   
   return lastWordIndex - 1;
 };
 
 // Create a string with certain number of spaces
 const createSpaces = (numSpaces) => {
   return " ".repeat(numSpaces);
 };
 
 // Add a certain number of spaces to the end of the word to fill up the rest up to maxWidth
 const padWord = (word, numSpaces) => {
   const spaces = createSpaces(numSpaces);
   return \`$\{word\}$\{spaces\}\`;
 };
 
 // Get length of all the words in a line from start to last index
 const getWordsLength = (startIndex, lastIndex) => {
   let wordsLength = 0;
   for (let i = startIndex; i <= lastIndex; i++) {
     wordsLength += words[i].length;
   }
   return wordsLength;
 };
 
 // Add equal spaces between words as much as possible
 const justify = (startIndex, lastIndex) => {
   // If there is only one word, we can return that word with the rest padded until the end
   if (lastIndex - startIndex === 0) {
     return padWord(words[startIndex], maxWidth - words[startIndex].length);
   }
   
   // If it's the last line, all the words are separated by one space
   const isLastLine = lastIndex === words.length - 1;
   
   // Get the number of spaces given the number of words and total spaces available given the length of all the words in a line
   const numWordSpaces = lastIndex - startIndex;
   const totalPossibleSpaces = maxWidth - getWordsLength(startIndex, lastIndex);
   
   // Divide up the spaces between words as equally as possible but for any extra remaining spaces we'll need to add it to the ends of the first words we see
   // If it's the last line, we'll add only one space between words
   const spacesBetweenWords = isLastLine ? " " : createSpaces(Math.floor(totalPossibleSpaces / numWordSpaces));
   let numRemainingSpaces = isLastLine ? 0 : totalPossibleSpaces % numWordSpaces;
   
   // Add each word to the line with proper spaces
   const lineWords = [];
   for (let i = startIndex; i <= lastIndex; i++) {
     lineWords.push(words[i]);
     lineWords.push(spacesBetweenWords);
     if (numRemainingSpaces > 0) {
       lineWords.push(" ");
       numRemainingSpaces--;
     }
   }
   
   const line = lineWords.join("").trim();
   return padWord(line, maxWidth - line.length);
 };
 
 // Keep on adding words to each line until we run out of words
 let startIndex = 0;
 const result = [];
 while (startIndex < words.length) {
   const lastWordIndex = findLastWordIndex(startIndex);
   result.push(justify(startIndex, lastWordIndex));
   startIndex = lastWordIndex + 1;
 }
 
 return result;
};`;

const TextJustification: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/text-justification/</p>
      <p>
        Given an array of strings words and a width maxWidth, format the text
        such that each line has exactly maxWidth characters and is fully (left
        and right) justified. You should pack your words in a greedy approach;
        that is, pack as many words as you can in each line. Pad extra spaces
        when necessary so that each line has exactly maxWidth characters. Extra
        spaces between words should be distributed as evenly as possible. If the
        number of spaces on a line does not divide evenly between words, the
        empty slots on the left will be assigned more spaces than the slots on
        the right. For the last line of text, it should be left-justified, and
        no extra space is inserted between words. Note: A word is defined as a
        character sequence consisting of non-space characters only. Each word
        length is guaranteed to be greater than 0 and not exceed maxWidth. The
        input array words contains at least one word.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="greedy.js" language="javascript">
          {greedyCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default TextJustification;
