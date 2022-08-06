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
* @param {TreeNode} subRoot
* @return {boolean}
*/
// O(NM) time, O(N) space
var isSubtree = function(root, subRoot) { 
 const isIdentical = (t1, t2) => {
   if (t1 === null && t2 === null) {
     return true;
   }
   if (t1 === null || t2 === null) {
     return false;
   }
   
   return t1.val === t2.val && isIdentical(t1.left, t2.left) && isIdentical(t1.right, t2.right);
 };
 
 if (root === null || subRoot === null) {
   return false;
 }
 
 if (isIdentical(root, subRoot)) {
   return true;
 }
 
 return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};`;

const SubtreeOfAnotherTree: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/subtree-of-another-tree/</p>
      <p>
        Given the roots of two binary trees root and subRoot, return true if
        there is a subtree of root with the same structure and node values of
        subRoot and false otherwise. A subtree of a binary tree tree is a tree
        that consists of a node in tree and all of this node descendants. The
        tree tree could also be considered as a subtree of itself.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default SubtreeOfAnotherTree;
