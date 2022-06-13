import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsCode = `/**
* Definition for a binary tree node.
* function TreeNode(val) {
*     this.val = val;
*     this.left = this.right = null;
* }
*/
/**
* @param {TreeNode} root
* @param {TreeNode} p
* @param {TreeNode} q
* @return {TreeNode}
*/
// Time: O(N) where N is number of nodes in binary tree
// Space: O(H) where H is the height of the binary tree
var lowestCommonAncestor = function(root, p, q) {
 if (root === null || root === p || root === q) {
   return root;
 }
 // Check if p or q is in either left or right subtree
 const foundNodeLeftSubtree = lowestCommonAncestor(root.left, p, q);
 const foundNodeRightSubtree = lowestCommonAncestor(root.right, p, q);
 
 // If we found p/q in both subtrees, we return the root as the LCA
 if (foundNodeLeftSubtree !== null && foundNodeRightSubtree !== null) {
   return root;
 }
 // If we found both p/q in the left subtree, we return the left node
 if (foundNodeLeftSubtree) {
   return foundNodeLeftSubtree;
 }
 // If we found both p/q in the right subtree, we return the right node
 return foundNodeRightSubtree;
};`;

const LowestCommonAncestorBinaryTree: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
      </p>
      <p>
        Given a binary search tree (BST), find the lowest common ancestor (LCA)
        of two given nodes in the BST. According to the definition of LCA on
        Wikipedia: “The lowest common ancestor is defined between two nodes p
        and q as the lowest node in T that has both p and q as descendants
        (where we allow a node to be a descendant of itself).”
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default LowestCommonAncestorBinaryTree;
