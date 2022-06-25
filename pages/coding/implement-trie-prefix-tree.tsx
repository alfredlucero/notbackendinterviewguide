import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const trieCode = `
var Trie = function() {
  // Initialize root node
  // Data structure will look like this
  // i.e. { "c": { "a": { "t": { "end": true } } } }
  this.root = {};
};

/** 
 * @param {string} word
 * @return {void}
 */
// O(w) time where w is the word length
// O(w) space to add at most w nodes
Trie.prototype.insert = function(word) {
  // Initialize current node as root
  let currentNode = this.root;
  
  // Loop through each character in the word and try to fill it in the trie
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    // If the character already exists in the current node
    if (currentNode.hasOwnProperty(char)) {
      // Move to the character node
      currentNode = currentNode[char];
    } else {
      // If the character doesn't exist in the current node
      // Add the character to the current node
      currentNode[char] = {};
      // Move to the character node
      currentNode = currentNode[char];
    }
  }
    
  // After going through all of the characters in the word, we mark "end" to true
  currentNode.end = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
// O(w) to search through all characters in word
// O(1) space
Trie.prototype.search = function(word) {
  // Initialize current node as root
  let currentNode = this.root;
  
  // Loop through each character in the word and try to see if it exists
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    
    // If the character already exists in the current node
    if (currentNode.hasOwnProperty(char)) {
      // Move to the character node
      currentNode = currentNode[char];
    } else {
    // If the character doesn't exist in the current node
    // Return false since it doesn't exist
      return false;
    }
  }
 
  // After going through all of the characters in the word, return whether or not it is the "end" of a word
  return currentNode.hasOwnProperty("end");
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
// O(w) to search through all of prefix
// O(1) space
Trie.prototype.startsWith = function(prefix) {
  // Initialize current node as root
  let currentNode = this.root;
  
  // Loop through each character in the prefix and try to see if it exists
  for (let i = 0; i < prefix.length; i++) {
    const char = prefix[i];
    
    // If the character already exists in the current node
    if (currentNode.hasOwnProperty(char)) {
      // Move to the character node
      currentNode = currentNode[char];
    } else {
      // If the character doesn't exist in the current node
      // Return false since it doesn't start with the entire prefix 
      return false;
    }
  }
    
  // Return true since all the letters of the prefix are in the trie
  return true;
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */`;

const ImplementTriePrefixTree: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/implement-trie-prefix-tree/</p>
      <p>
        A trie (pronounced as try) or prefix tree is a tree data structure used
        to efficiently store and retrieve keys in a dataset of strings. There
        are various applications of this data structure, such as autocomplete
        and spellchecker. Implement the Trie class: Trie() Initializes the trie
        object. void insert(String word) Inserts the string word into the trie.
        boolean search(String word) Returns true if the string word is in the
        trie (i.e., was inserted before), and false otherwise. boolean
        startsWith(String prefix) Returns true if there is a previously inserted
        string word that has the prefix prefix, and false otherwise.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="trie.js" language="javascript">
          {trieCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ImplementTriePrefixTree;
