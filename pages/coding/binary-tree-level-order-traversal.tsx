import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

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
* @return {number[][]}
*/
// O(N) time, O(N) space
var levelOrder = function(root) {
 if (root === null) {
   return [];
 }

 const queue = [];
 const levels = [];
 
 queue.push(root);

 // BFS
 while (queue.length > 0) {
   const levelSize = queue.length;
   let i = 0;
   const level = [];
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

   levels.push(level);
 }

 return levels;

};`;

const BinaryTreeLevelOrderTraversal: NextPage = () => {
  return (
    <div>
      <p>
        Source: https://leetcode.com/problems/binary-tree-level-order-traversal/
      </p>
      <p>
        Given the root of a binary tree, return the level order traversal of its
        nodes values. (i.e., from left to right, level by level).
      </p>
      <Prism.Tabs>
        <Prism.Tab label="bfs.js" language="javascript">
          {bfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default BinaryTreeLevelOrderTraversal;
