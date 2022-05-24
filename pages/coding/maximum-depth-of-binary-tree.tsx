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
var maxDepth = function(root) {
 if (root === null) {
   return 0;
 }
 const leftMaxDepth = 1 + maxDepth(root.left);
 const rightMaxDepth = 1 + maxDepth(root.right);
 
 return Math.max(leftMaxDepth, rightMaxDepth);
};`;

const MaximumDepthOfBinaryTree: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/maximum-depth-of-binary-tree/</p>
      <p>
        Given the root of a binary tree, return its maximum depth. A binary tree
        maximum depth is the number of nodes along the longest path from the
        root node down to the farthest leaf node.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dfsCode.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default MaximumDepthOfBinaryTree;
