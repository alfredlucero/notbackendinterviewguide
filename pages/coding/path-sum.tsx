import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsRecursiveCode = `/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/
/**
* @param {TreeNode} root
* @param {number} targetSum
* @return {boolean}
*/
// O(N) time since we visit all the nodes once, O(N) recursive space if unbalanced
var hasPathSum = function(root, targetSum) {
 // We will do DFS down from root to leaf and see if we can reach the target sum
 const dfs = (currentRoot, remainingTarget) => {
   // If there is no root, return false
   if (currentRoot === null) {
     return false;
   }
   
   // If current root is a leaf node and the leaf node's value is equal to the remaining target, we found a path sum
   if (currentRoot.left === null && currentRoot.right === null && currentRoot.val === remainingTarget) {
     return true;
   }
   
   // Check if by going down the left we can find a path sum
   let hasPathSumLeft = false;
   if (currentRoot.left) {
     hasPathSumLeft = dfs(currentRoot.left, remainingTarget - currentRoot.val);
   }
   
   // Check if by going down the right we can find a path sum
   let hasPathSumRight = false;
   if (currentRoot.right) {
     hasPathSumRight = dfs(currentRoot.right, remainingTarget - currentRoot.val);
   }
   
   return hasPathSumLeft || hasPathSumRight;
 };
 
 return dfs(root, targetSum);
};`;

const PathSum: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/path-sum/</p>
      <p>
        Given the root of a binary tree and an integer targetSum, return true if
        the tree has a root-to-leaf path such that adding up all the values
        along the path equals targetSum. A leaf is a node with no children.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="dfsRecursive.js" language="javascript">
          {dfsRecursiveCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default PathSum;
