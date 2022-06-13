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
// O(H) time where H is height of tree, O(1) space
var lowestCommonAncestor = function(root, p, q) {
 const large = Math.max(p.val, q.val);
 const small = Math.min(p.val, q.val);
 
 let current = root;
 while (current !== null) {
   // If current root is greater than the larger node, the LCA must be in the left subtree
   if (current.val > large) {
     current = current.left;
   // If current root is less than the smaller node, the LCA must be in the right subtree
   } else if (current.val < small) {
     current = current.right;
   // small.val <= current.val <= large.val -> we found the LCA
   } else {
     return current;
   }
 } 
 
 return null;
};`;

const LowestCommonAncestoryBinarySearchTree: NextPage = () => {
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

export default LowestCommonAncestoryBinarySearchTree;
