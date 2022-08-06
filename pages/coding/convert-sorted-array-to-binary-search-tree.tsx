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
* @param {number[]} nums
* @return {TreeNode}
*/
// Preorder DFS Approach
// O(N) time, O(log N) space for balanced BST height
var sortedArrayToBST = function(nums) {
 const buildTree = (left, right) => {
   if (left > right) {
     return null;
   }
   
   const rootIndex = Math.floor((left + right) / 2);
   const root = new TreeNode(nums[rootIndex]);
         
   // Recursively build the left and right subtree
   root.left = buildTree(left, rootIndex - 1);
   root.right = buildTree(rootIndex + 1, right);
   
   return root;
 };
 
 return buildTree(0, nums.length - 1);
};`;

const ConvertSortedArrayToBinarySearchTree: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
      </p>
      <p>
        Given an integer array nums where the elements are sorted in ascending
        order, convert it to a height-balanced binary search tree. A
        height-balanced binary tree is a binary tree in which the depth of the
        two subtrees of every node never differs by more than one.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="recursive.js" language="javascript">
          {recursiveCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ConvertSortedArrayToBinarySearchTree;
