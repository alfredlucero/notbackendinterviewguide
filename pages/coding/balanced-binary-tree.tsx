import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const maxHeightCode = `/**
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
// O(N^2) time
var isBalanced = function(root) {
 const maxHeight = (root) => {
   if (root === null) {
     return 0;
   }
   // Get the max height of the left subtree
   const leftHeight = maxHeight(root.left);
         
   // Get the max height of the right subtree
   const rightHeight = maxHeight(root.right);
   
   // Get the max between the two subtrees plus 1 to take into account the extra level
   return Math.max(leftHeight, rightHeight) + 1;
 }
 
 if (root === null) {
   return true;
 }
 
 // Get the max height of the left and right subtrees
 const leftHeight = maxHeight(root.left);
 const rightHeight = maxHeight(root.right);
 
 // Difference between two subtrees should be at most 1 and then we recursively check the left and right subtrees are balanced as well
 return Math.abs(leftHeight - rightHeight) <= 1 && isBalanced(root.left) && isBalanced(root.right);
};`;

const dfsCode = `/**
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
// O(N) time
var isBalanced = function(root) {
 const dfs = (root) => {
   if (root === null) {
     return 0;
   }
   
   // Get the height of the left subtree or -1 if it's imbalanced
   const leftHeight = dfs(root.left);
   if (leftHeight === -1) {
     return -1;
   }
   // Get the height of the right subtree or -1 if it's imbalanced
   const rightHeight = dfs(root.right);
   if (rightHeight === -1) {
     return -1;
   }
   
   // If height difference between left and right subtrees are > 1, it's imbalanced so return -1
   if (Math.abs(leftHeight - rightHeight) > 1) {
     return -1;
   }
   
   // Continue to keep track of the height of the current node at each level
   return Math.max(leftHeight, rightHeight) + 1;
 };
 
 return dfs(root) !== -1;
};`;

const BalancedBinaryTree: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/balanced-binary-tree/</p>
      <p>
        Given a binary tree, determine if it is height-balanced. For this
        problem, a height-balanced binary tree is defined as: a binary tree in
        which the left and right subtrees of every node differ in height by no
        more than 1.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="maxHeight.js" language="javascript">
          {maxHeightCode}
        </Prism.Tab>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default BalancedBinaryTree;
