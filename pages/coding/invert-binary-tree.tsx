import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const invertBinaryTreeRecursiveJsCode = `// Edge cases if node is null return null
// If one node without any children, nothing to swap
// If one node exists, swap children and then recursively swap left/right children trees
// O(N) time where N is number of nodes in tree, space is O(N) where the height could be at most the number of nodes
function invert(node) {
  // Base Cases:
  // If no node, return null
  if (!node) {
    return null;
  }
  const tempNode = node.left;
  node.left = node.right;
  node.right = tempNode;
  // If node with children, swap left/right and then recursively invert left/right subtree
  invert(node.left);
  invert(node.right);
  return node;
}`;

const invertBinaryTreeIterativeJsCode = `// Use stack for iterative approach
function invert(node) {
  if (node === null) return node;

  const stack = [node]

  while (stack.length > 0) {
    const node = stack.pop();
    [node.left, node.right] = [node.right, node.left]

    if (node.left) {
      stack.push(node.left)
    }

    if (node.right) {
      stack.push(node.right)
    }
  }

  return node
}`;

const invertBinaryTreeRecursiveCppCode = `/**
* Definition for a binary tree node.
* struct TreeNode {
*     int val;
*     TreeNode *left;
*     TreeNode *right;
*     TreeNode() : val(0), left(nullptr), right(nullptr) {}
*     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
*     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
* };
*/
class Solution {
public:
   TreeNode* invertTree(TreeNode* root) {
     if (root == nullptr) {
       return root;
     }
     
     auto temp = root->left;
     root->left = root->right;
     root->right = temp;
     
     invertTree(root->left);
     invertTree(root->right);
       
     return root;
   }
};`;

const invertBinaryTreeRecursiveJavaCode = `/**
* Definition for a binary tree node.
* public class TreeNode {
*     int val;
*     TreeNode left;
*     TreeNode right;
*     TreeNode() {}
*     TreeNode(int val) { this.val = val; }
*     TreeNode(int val, TreeNode left, TreeNode right) {
*         this.val = val;
*         this.left = left;
*         this.right = right;
*     }
* }
*/
class Solution {
   public TreeNode invertTree(TreeNode root) {
     if (root == null) {
       return root;
     }
     
     TreeNode temp = root.left;
     root.left = root.right;
     root.right = temp;
     
     invertTree(root.left);
     invertTree(root.right);
     
     return root;
   }
}`;

const InvertBinaryTree: NextPage = () => {
  return (
    <div>
      <p>
        Source: https://bigfrontend.dev/problem/invert-a-binary-tree
        <br />
        https://leetcode.com/problems/invert-binary-tree/
      </p>

      <Prism.Tabs>
        <Prism.Tab label="invertBinaryTreeRecursive.js" language="javascript">
          {invertBinaryTreeRecursiveJsCode}
        </Prism.Tab>

        <Prism.Tab label="invertBinaryTreeIterative.js" language="javascript">
          {invertBinaryTreeIterativeJsCode}
        </Prism.Tab>

        <Prism.Tab label="invertBinaryTreeRecursive.cpp" language="cpp">
          {invertBinaryTreeRecursiveCppCode}
        </Prism.Tab>

        <Prism.Tab label="invertBinaryTreeRecursive.java" language="diff">
          {invertBinaryTreeRecursiveJavaCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default InvertBinaryTree;
