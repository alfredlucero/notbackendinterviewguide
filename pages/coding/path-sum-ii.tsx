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
* @param {number} targetSum
* @return {number[][]}
*/
// O(N^2) time to go from root to leaf and also copy path to result
var pathSum = function(root, targetSum) {
 // Use DFS to find all root to leaf node paths and keep track of the current path so far
 const dfs = (currentRoot, path, remainingTarget, result) => {
   // If current root is null, we can't find a path sum
   if (currentRoot === null) {
     return;
   }
   
   // Push current root's value onto path
   path.push(currentRoot.val);
   
   // If the current root is a leaf node and its value equals the remaining target, we found a path sum to copy to result
   if (currentRoot.left === null && currentRoot.right === null && currentRoot.val === remainingTarget) {
     result.push([...path]);
   }
   
   // If it is not a leaf node...
   
   // If there is a left child, we try to recursively find a path sum with remaining target - the current root's value
   if (currentRoot.left !== null) {
     dfs(currentRoot.left, path, remainingTarget - currentRoot.val, result);
   }
   
   // If there is a right child, we try to recursively find a path sum with remaining target - the current root's value
   if (currentRoot.right !== null) {
     dfs(currentRoot.right, path, remainingTarget - currentRoot.val, result);
   }
   
   // We pop the current root's val off the stack for backtracking purposes
   path.pop();
 };

 const result = [];
 dfs(root, [], targetSum, result);
 return result;
};`;

const PathSumII: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/path-sum-ii/</p>
      <p>
        Given the root of a binary tree and an integer targetSum, return all
        root-to-leaf paths where the sum of the node values in the path equals
        targetSum. Each path should be returned as a list of the node values,
        not node references. A root-to-leaf path is a path starting from the
        root and ending at any leaf node. A leaf is a node with no children.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default PathSumII;
