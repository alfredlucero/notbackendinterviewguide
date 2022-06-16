import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const minMaxRecursiveCode = `/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/
/**
* @param {TreeNode} root
* @return {boolean}
*/
var isValidBST = function(root) {
 // Keep track of the min and max that a node can be in
 const isValidBSTHelper = (root, min, max) => {
   // if root is null, it's valid so we return null
   if (root === null) {
     return true;
   }
   
   // if root is not null and there is a min node and the root's val <= min node's val, return false
   if (min !== null && root.val <= min.val) {
     return false;
   }
   // if root is not null and there is a max node and the root's val >= max node's val, return false
   if (max !== null && root.val >= max.val) {
     return false;
   }
   
   // recursively check if the left subtree is valid bst and right subtree is valid bst
   return isValidBSTHelper(root.left, min, root) && isValidBSTHelper(root.right, root, max);
 };
 
 return isValidBSTHelper(root, null, null);
};`;

const iterativeInorderCode = `/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/
/**
* @param {TreeNode} root
* @return {boolean}
*/
var isValidBST = function(root) {
 // Empty tree is a valid BST
 if (root === null) {
   return true;
 }
 
 // Inorder traversal with stack
 const stack = [];
 // We'll keep track of the previous child node we popped from the stack
 let prevChild = null;
 let currentRoot = root;
 // While the root is not null and the stack is not empty
 while (currentRoot !== null || stack.length > 0) {
   // Keep going down the left subtree as much as possible and push nodes along the way
   while (currentRoot !== null) {
     stack.push(currentRoot);
     currentRoot = currentRoot.left;
   }
   
   // Process the current root aka pop the top node from stack
   currentRoot = stack.pop();
   
   // If the previous child node is not null and the current root's val is <= the previous child's val, it's not a valid bst
   if (prevChild !== null && currentRoot.val <= prevChild.val) {
     return false;
   }
   // Set the previous child to the current root
   prevChild = currentRoot;
   
   // Go down the right subtreee
   currentRoot = currentRoot.right;
 }
 
 // We've validated all the nodes, so it's a valid BST
 return true;
};`;

const recursiveInorderCode = `/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/
/**
* @param {TreeNode} root
* @return {boolean}
*/
var isValidBST = function(root) {
 let previousNode = null;
 const isValidBSTHelper = (root) => {
   // If root is null, it's valid
   if (root === null) {
     return true;
   }

   // Check left subtree is valid
   if (!isValidBSTHelper(root.left)) {
     return false;
   }

   // If there is a previous node and the current root's val is <= previous node's value, it's invalid
   if (previousNode !== null && root.val <= previousNode.val) {
     return false;
   }
   
   // Set the previous node to the root
   previousNode = root;
   
   // Check right subtree is valid
   if (!isValidBSTHelper(root.right)) {
     return false;
   }
   
   return true;
 };
 
 return isValidBSTHelper(root);
};`;

const ValidateBinarySearchTree: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/validate-binary-search-tree/</p>
      <p>
        Given the root of a binary tree, determine if it is a valid binary
        search tree (BST). A valid BST is defined as follows: The left subtree
        of a node contains only nodes with keys less than the node key. The
        right subtree of a node contains only nodes with keys greater than the
        node key. Both the left and right subtrees must also be binary search
        trees.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="minMaxRecursive.js" language="javascript">
          {minMaxRecursiveCode}
        </Prism.Tab>
        <Prism.Tab label="iterInorder.js" language="javascript">
          {iterativeInorderCode}
        </Prism.Tab>
        <Prism.Tab label="recInorder.js" language="javascript">
          {recursiveInorderCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ValidateBinarySearchTree;
