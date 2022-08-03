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
* @param {number} startValue
* @param {number} destValue
* @return {string}
*/
// O(N) time, O(N) space
var getDirections = function(root, startValue, destValue) {
 const findPath = (currentNode, targetValue, path) => {
   if (currentNode === null) {
     return false;
   }
   if (currentNode.val === targetValue) {
     return true;
   }
   
   path.push("L");
   if (findPath(currentNode.left, targetValue, path)) {
      return true; 
   }
   path.pop();
   
   path.push("R");
   if (findPath(currentNode.right, targetValue, path)) {
     return true;
   }
   path.pop();
   
   return false;
 };
 
 // Find path from root to start value
 let startPath = [];
 findPath(root, startValue, startPath);
 
 // Find path from root to dest value
 let destPath = [];
 findPath(root, destValue, destPath);
 
 // Remove common prefix between start path and dest path by keeping track of the index when both start and dest path 
 // differ from the common prefix
 let i = 0;
 while (i < Math.min(startPath.length, destPath.length) && startPath[i] === destPath[i]) {
   i++;
 }
 
 // Get length of remaining start path to convert to "U"
 const startPathRemaining = startPath.length - i;
 
 // Add start path with "U" and dest path together for the shortest directions
 return "U".repeat(startPathRemaining) + destPath.slice(i).join("");
};`;

const StepByStepDirectionsFromABinaryTreeNodeToAnother: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/
      </p>
      <p>
        You are given the root of a binary tree with n nodes. Each node is
        uniquely assigned a value from 1 to n. You are also given an integer
        startValue representing the value of the start node s, and a different
        integer destValue representing the value of the destination node t. Find
        the shortest path starting from node s and ending at node t. Generate
        step-by-step directions of such path as a string consisting of only the
        uppercase letters L, R, and U. Each letter indicates a specific
        direction: L means to go from a node to its left child node. R means to
        go from a node to its right child node. U means to go from a node to its
        parent node. Return the step-by-step directions of the shortest path
        from node s to node t.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default StepByStepDirectionsFromABinaryTreeNodeToAnother;
