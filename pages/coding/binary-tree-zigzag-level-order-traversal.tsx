import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const bfsReverseCode = `/**
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
// O(N^2) time, O(N) space
var zigzagLevelOrder = function(root) {
 // If the tree is empty, return empty array
 if (root === null) {
   return [];
 }

 // BFS with queue
 const levels = [];
 const queue = [];
 queue.push(root);
 
 let isLeftToRight = true;

 while (queue.length > 0) { 
   const levelSize = queue.length;
   const level = [];
   let i = 0;
   // For each node in the current level, we'll add the current node value and enqueue the children
   while (i < levelSize) {
     const currentNode = queue.shift();

     level.push(currentNode.val);

     if (currentNode.left !== null) {
       queue.push(currentNode.left);
     } 

     if (currentNode.right !== null) {
       queue.push(currentNode.right);
     }	

     i++;
   }

   // Depending on if we're going left to right or right to left, we'll push the nodes in a level from left to right or reverse the first and then toggle the direction
   if (isLeftToRight) {
     levels.push(level);
   } else {
     levels.push(level.reverse());
   }
   isLeftToRight = !isLeftToRight;
 }

 return levels;
};`;

const bfsLinkedListCode = `/**
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
// O(N) time, O(N) space
var zigzagLevelOrder = function(root) {
 // If the tree is empty, return empty array
 if (root === null) {
   return [];
 }

 // BFS with queue
 const levels = [];
 const queue = [];
 queue.push(root);
 
 let isLeftToRight = true;

 while (queue.length > 0) { 
   const levelSize = queue.length;
   // Pretend we have a more optimized linked list
   const level = [];
   let i = 0;
   // For each node in the current level, we'll add the current node value and enqueue the children
   while (i < levelSize) {
     const currentNode = queue.shift();
     
     if (isLeftToRight) {
       level.push(currentNode.val);
     } else {
       level.unshift(currentNode.val);
     }

     if (currentNode.left !== null) {
       queue.push(currentNode.left);
     } 

     if (currentNode.right !== null) {
       queue.push(currentNode.right);
     }	

     i++;
   }

   levels.push(level);
   isLeftToRight = !isLeftToRight;
 }

 return levels;
};`;

const BinaryTreeZigzagLevelOrderTraversal: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
      </p>
      <p>
        Given the root of a binary tree, return the zigzag level order traversal
        of its nodes values. (i.e., from left to right, then right to left for
        the next level and alternate between).
      </p>
      <Prism.Tabs>
        <Prism.Tab label="bfsReverse.js" language="javascript">
          {bfsReverseCode}
        </Prism.Tab>
        <Prism.Tab label="bfsLinkedList.js" language="javascript">
          {bfsLinkedListCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default BinaryTreeZigzagLevelOrderTraversal;
