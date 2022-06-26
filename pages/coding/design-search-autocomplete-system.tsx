import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const trieDfsCode = `/**
* @param {string[]} sentences
* @param {number[]} times
*/
var AutocompleteSystem = function(sentences, times) {
 // Keep track of the searchTerm after each input; we will clear it whenever we get a #
 this.searchTerm = "";
 
 // Keep track of the root trie node with extra info like hot aka number of times it's been typed before 
 this.root = { children: {}, isEnd: false, hot: 0,  };
 
 // Loop through each sentence and add it to the trie
 let currentNode = this.root;
 sentences.forEach((sentence, i) => {
   this.add(sentence, times[i]);
 });
};

/*
* Helper function to add a sentence that was typed hot number of times to the trie
*/
AutocompleteSystem.prototype.add = function(sentence, hot) {
 let currentNode = this.root;
 
 // Loop through each character in sentence
 for (let char of sentence) {
   // If the character doesn't exist in the current node, add the character node in children
   if (!currentNode.children.hasOwnProperty(char)) {
     currentNode.children[char] = { children: {}, isEnd: false, hot: 0 };
   }
   // Move current node to the character node
   currentNode = currentNode.children[char];
 }
 
 // After adding all of the characters of the sentence, we mark the last current node as the end
 currentNode.isEnd = true;
 // We add the hot number to the end to keep track of how many times the sentence was typed
 currentNode.hot += hot;
};

/*
* Helper function to find all the sentences and their hot number that we can form from the searchTerm prefix
*/
AutocompleteSystem.prototype.search = function() {
 // Initial traversal to find the last node of the prefix search term in the trie
 let currentNode = this.root;
 for (let char of this.searchTerm) {
   // If we don't see any char of the search term prefix, we return [] since we have no sentences we can form from it
   if (!currentNode.children.hasOwnProperty(char)) {
     return [];
   }
   currentNode = currentNode.children[char];
 }
 
 
 // Need to DFS from the last current node (end of the prefix search term) and get all possible sentences and their hot number
 const dfs = (node, path, result) => {
   // If it's the end of a sentence, we'll append to the result the sentence and the hot number associated
   if (node.isEnd) {
     result.push([path, node.hot]);
   }
   // If it's not the end of a sentence, we'll recursively go through the children and find all possible sentences
   Object.keys(node.children).forEach((char) => {
     dfs(node.children[char], path + char, result);
   });
 };
 
 const result = [];
 dfs(currentNode, this.searchTerm, result);
 
 return result;
}

/** 
* @param {character} c
* @return {string[]}
*/
AutocompleteSystem.prototype.input = function(c) {
 // If the input is a #, we need to clear the search term, add the sentence to the trie, return []
 if (c === '#') {
   this.add(this.searchTerm, 1);
   this.searchTerm = "";
   return [];
 }
 
 // Otherwise, we append to the search term and based on that search term prefix, we will find all the sentences we can form and sort based
 // on hot number and string comparison to return the top 3 hot sentences
 this.searchTerm += c;
 const possibleHotSentences = this.search();
 const sortedHotSentences = possibleHotSentences.sort((a, b) => {
   const [aSentence, aHot] = a;
   const [bSentence, bHot] = b;
   
   if (aHot === bHot) {
     return aSentence.localeCompare(bSentence);
   }
   
   return bHot - aHot;
 }).reduce((acc, current) => {
   return [...acc, current[0]]
 }, [])
 .slice(0, 3);
 
 return sortedHotSentences;
};

/** 
* Your AutocompleteSystem object will be instantiated and called as such:
* var obj = new AutocompleteSystem(sentences, times)
* var param_1 = obj.input(c)
*/`;

const DesignSearchAutocompleteSystem: NextPage = () => {
  return (
    <div>
      <p>
        Source: https://leetcode.com/problems/design-search-autocomplete-system/
      </p>
      <p>
        Design a search autocomplete system for a search engine. Users may input
        a sentence (at least one word and end with a special character #). You
        are given a string array sentences and an integer array times both of
        length n where sentences[i] is a previously typed sentence and times[i]
        is the corresponding number of times the sentence was typed. For each
        input character except #, return the top 3 historical hot sentences that
        have the same prefix as the part of the sentence already typed. Here are
        the specific rules: The hot degree for a sentence is defined as the
        number of times a user typed the exactly same sentence before. The
        returned top 3 hot sentences should be sorted by hot degree (The first
        is the hottest one). If several sentences have the same hot degree, use
        ASCII-code order (smaller one appears first). If less than 3 hot
        sentences exist, return as many as you can. When the input is a special
        character, it means the sentence ends, and in this case, you need to
        return an empty list. Implement the AutocompleteSystem class:
        AutocompleteSystem(String[] sentences, int[] times) Initializes the
        object with the sentences and times arrays. String[] input(char c) This
        indicates that the user typed the character c. Returns an empty array []
        if c == # and stores the inputted sentence in the system. Returns the
        top 3 historical hot sentences that have the same prefix as the part of
        the sentence already typed. If there are fewer than 3 matches, return
        them all.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="trieDfs.js" language="javascript">
          {trieDfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default DesignSearchAutocompleteSystem;
