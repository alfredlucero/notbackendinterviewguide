import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

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
* @return {number}
*/
// If root is null, return 0
// Get max height of left subtree
// Get max height of right subtree
// Get current diameter = max height of left subtree + max height of right subtree
// Update max diameter if current diameter is greater
// Return the max (height of the left and right) + 1 which is the height of the node
var diameterOfBinaryTree = function(root) {
 let maxDiameter = 0;
 const dfs = (root) => {
   if (root === null) {
     return 0;
   }
   
   const leftMaxHeight = dfs(root.left);
   const rightMaxHeight = dfs(root.right);
   const currentDiameter = leftMaxHeight + rightMaxHeight;
   
   maxDiameter = Math.max(currentDiameter, maxDiameter);
   
   return Math.max(leftMaxHeight, rightMaxHeight) + 1;
 };
 
 dfs(root);
 return maxDiameter;
};`;

const DiameterOfBinaryTree: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/diameter-of-binary-tree/</p>
      <p>
        Given the root of a binary tree, return the length of the diameter of
        the tree. The diameter of a binary tree is the length of the longest
        path between any two nodes in a tree. This path may or may not pass
        through the root. The length of a path between two nodes is represented
        by the number of edges between them.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default DiameterOfBinaryTree;
