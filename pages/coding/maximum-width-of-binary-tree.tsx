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
// DFS Approach
// O(N) time, O(N) space
var widthOfBinaryTree = function(root) {
 // Initialize overallMaxWidth to 0 (use BigInt for 32 bit overflow)
 let overallMaxWidth = 0n;
 // Initialize hashmap of depth to first column index of node at that depth
 const firstColumnIndexMap = new Map();
 
 // DFS to go through all the nodes and compute the max width along the way by keeping track of the first column index 
 // we've seen at a certain level in our map and the current column index of a node
 const dfs = (node, depth, colIndex) => {
   if (node === null) {
     return;
   }
   
   // If we haven't seen a node yet at the current depth, we will add the first colIndex to the map for that depth
   if (!firstColumnIndexMap.has(depth)) {
     firstColumnIndexMap.set(depth, colIndex);
   }
   
   // Get the first column index at the current depth
   const firstColIndex = firstColumnIndexMap.get(depth);
   
   // Compute the current max width by doing colIndex - firstColIndex + 1
   const currentMaxWidth = colIndex - firstColIndex + 1n;
   overallMaxWidth = Math.max(Number(overallMaxWidth), Number(currentMaxWidth));
   
   // Recursively go through the next depth and the left/right subtrees
   dfs(node.left, depth + 1, 2n * colIndex);
   dfs(node.right, depth + 1, 2n * colIndex + 1n);
 };
 
 dfs(root, 0, 0n);
 return overallMaxWidth;
};`;

const bfsCode = `/**
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
// BFS Approach
// O(N) time, O(N) space
var widthOfBinaryTree = function(root) {
 // For an empty tree, return 0
 if (root === null) {
   return 0;
 }
 
 // Initialize overallMaxWidth to 0 (use BigInt for 32 bit overflow)
 let overallMaxWidth = 0n;
 // Initialize queue to do BFS on the tree
 const queue = [];
 
 // Push the root onto the queue with the current index
 queue.push([root, 0n]);
 
 // BFS and compute max width based on first node index and last node index at a certain depth
 while (queue.length > 0) {
   // Keep track of the first node at a certain depth
   let firstNodeData = queue[0];
   // Keep track of the last node at a certain depth
   let lastNodeData = null;
   
   // Loop through all nodes at the current depth
   let numNodesAtDepth = queue.length;
   for (let i = 0; i < numNodesAtDepth; i++) {
     const [currentNode, colIndex] = queue.shift();
     lastNodeData = [currentNode, colIndex];
     
     // Enqueue left node if available with updated column index
     if (currentNode.left) {
       queue.push([currentNode.left, 2n * colIndex]);
     }
     
     // Enqueue right node if available with updated column index
     if (currentNode.right) {
       queue.push([currentNode.right, 2n * colIndex + 1n]);
     }
   }
   
   // Compute current max width (last column index - first column index + 1)
   const [firstNode, firstColIndex] = firstNodeData;
   const [lastNode, lastColIndex] = lastNodeData;
   const currentMaxWidth = lastColIndex - firstColIndex + 1n;
   // Update overall max width if greater
   overallMaxWidth = Math.max(Number(currentMaxWidth), Number(overallMaxWidth));
 }
 
 return overallMaxWidth;
};`;

const MaximumWidthOfBinaryTree: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/maximum-width-of-binary-tree/</p>
      <p>
        Given the root of a binary tree, return the maximum width of the given
        tree. The maximum width of a tree is the maximum width among all levels.
        The width of one level is defined as the length between the end-nodes
        (the leftmost and rightmost non-null nodes), where the null nodes
        between the end-nodes that would be present in a complete binary tree
        extending down to that level are also counted into the length
        calculation. It is guaranteed that the answer will in the range of a
        32-bit signed integer.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>

        <Prism.Tab label="bfs.js" language="javascript">
          {bfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default MaximumWidthOfBinaryTree;
