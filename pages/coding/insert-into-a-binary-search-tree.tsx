import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const iterativeCode = `/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/
/**
* @param {TreeNode} root
* @param {number} val
* @return {TreeNode}
*/
var insertIntoBST = function(root, val) {
 // If the root is null, the value we're inserting is the root of the tree
 if (root === null) {
   return new TreeNode(val);
 }
 
 let currentNode = root;
 let previousNode = null;
 // Find the node where we should insert the new node to
 while (currentNode !== null) {
   previousNode = currentNode;
   
   // If the value is greater than the current node's value, keep going right
   if (val > currentNode.val) {
     currentNode = currentNode.right;
   } else {
     // If the value is less than or equal to the current node's value, go left
     currentNode = currentNode.left;
   }
 }
 
 // The previous node should be where we should insert the new node from
 
 // If the value is greater, we insert to right
 if (val > previousNode.val) {
   previousNode.right = new TreeNode(val);
 } else {
 // If the value is less than or equal, we insert to left
   previousNode.left = new TreeNode(val);
 }
 
 return root;
};`;

const InsertIntoABinarySearchTree: NextPage = () => {
  return (
    <div>
      <p>
        Source: https://leetcode.com/problems/insert-into-a-binary-search-tree/
      </p>
      <p>
        You are given the root node of a binary search tree (BST) and a value to
        insert into the tree. Return the root node of the BST after the
        insertion. It is guaranteed that the new value does not exist in the
        original BST. Notice that there may exist multiple valid ways for the
        insertion, as long as the tree remains a BST after insertion. You can
        return any of them.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="iterative.js" language="javascript">
          {iterativeCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default InsertIntoABinarySearchTree;
