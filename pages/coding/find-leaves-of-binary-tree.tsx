import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsHeightSortCode = `/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/
/**
* @param {TreeNode} root
* @return {number[][]}
*/
// O(NlogN) time for sorting, O(N) space for node heights
var findLeaves = function(root) {
 const nodeHeights = [];
 // Recursive function to get all the heights of each node
 const getHeight = (currentRoot) => {
   if (currentRoot === null) {
     return -1;
   }
   
   const leftHeight = getHeight(currentRoot.left);
   const rightHeight = getHeight(currentRoot.right);
   
   const currentHeight = Math.max(leftHeight, rightHeight) + 1;
   
   nodeHeights.push([currentHeight, currentRoot.val]);
   
   return currentHeight;
 };
 
 // Get the heights of all the nodes in the tree
 getHeight(root);
 
 // Sort the nodes by height in ascending order
 nodeHeights.sort((a, b) => a[0] - b[0]);
 
 // Build the leaves solution based on the sorted node heights
 const leavesHeights = [];
 let height = 0;
 let i = 0;
 while (i < nodeHeights.length) {
   const currentLeaves = [];
   // While we're on the same height, we keep adding to the current leaves array
   while (i < nodeHeights.length && nodeHeights[i][0] === height) {
     currentLeaves.push(nodeHeights[i][1]);
     i++;
   }
   leavesHeights.push(currentLeaves);
   height++;
 }
 
 return leavesHeights;
};`;

const dfsHeightModifiedCode = `/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/
/**
* @param {TreeNode} root
* @return {number[][]}
*/
// O(N) time, O(N) space for solution only
var findLeaves = function(root) {
 const leaves = [];
 // Recursive function to get all the heights of each node and also add leaf nodes to their proper height array
 const getLeavesByHeight = (currentRoot) => {
   if (currentRoot === null) {
     return -1;
   }
   
   const leftHeight = getLeavesByHeight(currentRoot.left);
   const rightHeight = getLeavesByHeight(currentRoot.right);
   
   const currentHeight = Math.max(leftHeight, rightHeight) + 1;
   
   // If the subarray for a specific height has not been created yet, we will create the new subarray
   // and add the leaf node to it
   // Otherwise, we push onto the existing subarray for the specific height
   if (currentHeight + 1 > leaves.length) {
     leaves.push([currentRoot.val]);
   } else {
     leaves[currentHeight].push(currentRoot.val);
   }
   
   return currentHeight;
 };
 
 // Get all the leaves by height
 getLeavesByHeight(root);
 
 return leaves;
};`;

const FindLeavesOfBinaryTree: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/find-leaves-of-binary-tree/</p>
      <p>
        Given the root of a binary tree, collect the tree nodes as if you were
        doing this: Collect all the leaf nodes. Remove all the leaf nodes.
        Repeat until the tree is empty.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dfsHeightSort.js" language="javascript">
          {dfsHeightSortCode}
        </Prism.Tab>
        <Prism.Tab label="dfsHeightModified.js" language="javascript">
          {dfsHeightModifiedCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default FindLeavesOfBinaryTree;
