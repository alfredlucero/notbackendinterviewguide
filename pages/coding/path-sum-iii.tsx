import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsHashMapCode = `/**
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
* @return {number}
*/
// O(N) time, O(N) space
var pathSum = function(root, targetSum) {
 // Use DFS (preorder traversal to process current node and then left and right)
 // We'll keep track of a numPathSums counter and prefixSumMap to map prefix sum to how many times we've seen it before
 let numPathSums = 0;
 let prefixSumMap = new Map();
 
 const dfs = (root, currentSum) => {
   // If node is null, return as nothing to process and no potential path sum here
   if (root === null) {
     return;
   }
   
   // Increment current sum by root val to keep on calculating the prefix sum along the way
   let newCurrentSum = currentSum + root.val;
 
   // If newCurrentSum is equal to targetSum, increment numPathSums as we've found a path from root to current node
   if (newCurrentSum === targetSum) {
     numPathSums++;
   }
 
   // If newCurrentSum - targetSum exists in the prefixSumMap, increment numPathSums by the number of times we've seen newCurrentSum - targetSum as we have seen numbers that can add up to target sum
   if (prefixSumMap.has(newCurrentSum - targetSum)) {
     numPathSums += prefixSumMap.get(newCurrentSum - targetSum);
   }
 
   // Increment newCurrentSum in prefixSumMap for how many times we've seen it before
   prefixSumMap.set(newCurrentSum, prefixSumMap.has(newCurrentSum) ? prefixSumMap.get(newCurrentSum) + 1 : 1);
   
   // Recursively process the left subtree
   dfs(root.left, newCurrentSum);
 
   // Recursively process the right subtree
   dfs(root.right, newCurrentSum);
 
   // Decrement newCurrentSum in prefixSumMap to backtrack and not mess with parallel subtree processing
   prefixSumMap.set(newCurrentSum, prefixSumMap.get(newCurrentSum) - 1);
 }
 
 dfs(root, 0);
 return numPathSums;
};`;

const PathSumIII: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/path-sum-iii/</p>
      <p>
        Given the root of a binary tree and an integer targetSum, return the
        number of paths where the sum of the values along the path equals
        targetSum. The path does not need to start or end at the root or a leaf,
        but it must go downwards (i.e., traveling only from parent nodes to
        child nodes).
      </p>

      <Prism.Tabs>
        <Prism.Tab label="dfsHashMap.js" language="javascript">
          {dfsHashMapCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default PathSumIII;
