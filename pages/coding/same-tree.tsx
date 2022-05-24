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
* @param {TreeNode} p
* @param {TreeNode} q
* @return {boolean}
*/
var isSameTree = function(p, q) {
 // Base Cases
 // If both nodes are null, they are the same
 if (p === null && q === null) {
   return true;
 }
 // If either node is null while the other is not null, they are different
 if (p === null || q === null) {
   return false;
 }
 
 // Check the current node is the same assuming both are not null
 const isSameNodeValue = p.val === q.val;
 
 // Recursively check the left subtree and right subtrees are all the same
 const isSameLeftTree = isSameTree(p.left, q.left);
 const isSameRightTree = isSameTree(p.right, q.right);
 
 return isSameNodeValue && isSameLeftTree && isSameRightTree;
};`;

const SameTree: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/same-tree/</p>
      <p>
        Given the roots of two binary trees p and q, write a function to check
        if they are the same or not. Two binary trees are considered the same if
        they are structurally identical, and the nodes have the same value.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dfsCode.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default SameTree;
