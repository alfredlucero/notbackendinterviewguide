import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const recursiveCode = `/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/
/**
* @param {number[]} preorder
* @param {number[]} inorder
* @return {TreeNode}
*/
// O(N) time, O(N) space
var buildTree = function(preorder, inorder) {
 // Initialize preorder index to keep track of root
 let preorderIndex = 0;
 
 // Build hashmap of inorder value to index for quick lookups
 const inorderIndexMap = new Map();
 inorder.forEach((inorderValue, inorderIndex) => {
   inorderIndexMap.set(inorderValue, inorderIndex);
 });
 
 // Recursively build the tree based on left and right subtree and the preorder root index
 const arrayToTree = (left, right) => {
   // If no elements to construct the tree, return null
   if (left > right) {
     return null;
   }
   
   // Select the preorder index element as the root and increment
   const rootValue = preorder[preorderIndex];
   preorderIndex++;
   const root = new TreeNode(rootValue);
   
   // Build left and right subtree excluding the inorder root value element since it's the root
   root.left = arrayToTree(left, inorderIndexMap.get(rootValue) - 1);
   root.right = arrayToTree(inorderIndexMap.get(rootValue) + 1, right);
   
   return root;
 };
 
 return arrayToTree(0, preorder.length - 1);
};`;

const ConstructBinaryTreeFromPreorderAndInorderTraversal: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
      </p>
      <p>
        Given two integer arrays preorder and inorder where preorder is the
        preorder traversal of a binary tree and inorder is the inorder traversal
        of the same tree, construct and return the binary tree.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="recursive.js" language="javascript">
          {recursiveCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ConstructBinaryTreeFromPreorderAndInorderTraversal;
