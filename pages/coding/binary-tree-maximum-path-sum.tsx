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
// O(N) time, O(H) space
var maxPathSum = function(root) {
 let overallMaxPathSum = -Infinity;
 const pathSumHelper = (root) => {
   // If there is no node, we return 0
   if (root === null) {
     return 0;
   }
   
   // Compute the max path sum of the left and right subtrees assuming the current node as the root
   // We default to zero in case there are only negatives
   const leftMaxPathSum = Math.max(pathSumHelper(root.left), 0);
   const rightMaxPathSum = Math.max(pathSumHelper(root.right), 0);
   
   // Compute the current path sum as root val + max left path sum + max right path sum
   const currentPathSum = root.val + leftMaxPathSum + rightMaxPathSum;
   // Update the overall max path sum if it's greater
   overallMaxPathSum = Math.max(currentPathSum, overallMaxPathSum);
   
   // Return the current root val + max of going down left path or right path as parents that are the root
   // from above can only go down in one direction through one subtree
   return root.val + Math.max(leftMaxPathSum, rightMaxPathSum);
 };
 
 pathSumHelper(root); 
 return overallMaxPathSum;
};`;

const BinaryTreeMaximumPathSum: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/binary-tree-maximum-path-sum/</p>
      <p>
        A path in a binary tree is a sequence of nodes where each pair of
        adjacent nodes in the sequence has an edge connecting them. A node can
        only appear in the sequence at most once. Note that the path does not
        need to pass through the root. The path sum of a path is the sum of the
        nodes values in the path. Given the root of a binary tree, return the
        maximum path sum of any non-empty path.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default BinaryTreeMaximumPathSum;
