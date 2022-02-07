import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const invertBinaryTreeRecursiveCode = `// Edge cases if node is null return null
// If one node without any children, nothing to swap
// If one node exists, swap children and then recursively swap left/right children trees
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

const invertBinaryTreeIterativeCode = `// Use stack for iterative approach
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

const InvertBinaryTree: NextPage = () => {
  return (
    <div>
      <p>Source: https://bigfrontend.dev/problem/invert-a-binary-tree</p>

      <Prism.Tabs>
        <Prism.Tab label="invertBinaryTreeRecursive.js" language="javascript">
          {invertBinaryTreeRecursiveCode}
        </Prism.Tab>

        <Prism.Tab label="invertBinaryTreeIterative.js" language="javascript">
          {invertBinaryTreeIterativeCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default InvertBinaryTree;
