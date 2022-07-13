import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsSerializeCode = `/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/
/**
* @param {TreeNode} root
* @return {TreeNode[]}
*/
// O(N^2) time for going through all nodes and repeatedly building the serialized string, O(N) space for the subtree counts
var findDuplicateSubtrees = function(root) {
 const subtreeCounts = new Map();
 const duplicateSubtrees = [];
 
 // We'll do postorder DFS in order to serialize the tree to a string and use that serialized tree string as the key in a hashmap to keep track of counts
 const postorderDfs = (node) => {
   // If we encounter null, we'll set it to a special character called N
   if (node === null) {
     return "N";
   };
   
   // We recursively serialize the tree
   const serializedTree = \`\$\{node.val\},\$\{postorderDfs(node.left)\},\$\{postorderDfs(node.right)\}\`;
   
   // We increment the count of the serialized tree
   if (subtreeCounts.has(serializedTree)) {
     subtreeCounts.set(serializedTree, subtreeCounts.get(serializedTree) + 1);
   } else {
     subtreeCounts.set(serializedTree, 1);
   }
   
   // If we've seen the same tree serialization twice, we'll add the parent node of the duplicate subtree to the result
   if (subtreeCounts.get(serializedTree) === 2) {
     duplicateSubtrees.push(node);
   }
   
   return serializedTree;
 };
 
 // Use postorder DFS to serialize the tree and figure out which serializations appear twice as duplicate subtrees
 postorderDfs(root);
 
 return duplicateSubtrees;
};`;

const FindDuplicateSubtrees: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/find-duplicate-subtrees/</p>
      <p>
        Given the root of a binary tree, return all duplicate subtrees. For each
        kind of duplicate subtrees, you only need to return the root node of any
        one of them. Two trees are duplicate if they have the same structure
        with the same node values.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dfsSerialize.js" language="javascript">
          {dfsSerializeCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default FindDuplicateSubtrees;
