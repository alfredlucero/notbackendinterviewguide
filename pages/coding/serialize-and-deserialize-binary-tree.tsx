import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const serializeAndDeserializeRecursiveCode = `function serialize(root) {
  // Recursive DFS approach
  function dfsSerialize(root) {
    // If the root exists, we push the current value of the root and recursively go through the left and right children
    if (root) {
      result.push(root.value);
      dfsSerialize(root.left);
      dfsSerialize(root.right);
    } else {
      // If the root is null, we push null onto the array
      result.push("null");
    }
  }  

  // Manage a result with closure that we'll append the nodes to
  const result = [];
  dfsSerialize(root);
  return result.toString();
}

function deserialize(str) {
  // We can do a recursive DFS to deserialize the serialized tree
  function dfsDeserialize() {
    // Get the current value from nodes and increment onto the next node
    const currentValue = nodes[i++];

    // If the current node is null, return null
    if (currentValue === "null") {
      return null;
    }

    // Otherwise, create a node based on the value and recursively assign the left and right of the current node
    const node = new Node(+currentValue);
    node.left = dfsDeserialize();
    node.right = dfsDeserialize();

    return node;
  }

  // Split the serialized tree by commas to get the nodes
  const nodes = str.split(",");
  // Start from the root node index at 0
  let i = 0;
  return dfsDeserialize();
}`;

const serializeAndDeserializeIterativeCode = `function serialize(root) {
  const result = [];
  if (!root) {
    return "null";
  }

  // Do BFS with a queue, starting with the root node
  const queue = [root];
  // As we go through each level we'll push onto the result array if there is a left/right child or null
  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (currentNode === null) {
      result.push("null");
    } else {
      result.push(currentNode.value);
      queue.push(currentNode.left);
      queue.push(currentNode.right);
    }
  }

  // At the end we'll join the array values with a comma to form a string
  const serializedTree = result.join(",");
  return serializedTree;
}

function deserialize(str) {
  // Helper to create a node (checks if value is === "null" => null or convert string to number value)
  function createNode(s) {
    if (s === "null") {
      return null;
    }
    return new Node(parseInt(s, 10));
  }

  // We'll first split the string by commas to get all the nodes out
  const nodes = str.split(",");
  let i = 1;

  // Start from the root and use a queue/BFS again to gradually build the tree again
  const root = createNode(nodes[0]);
  const queue = [root];
  // Get node from queue and if it's not null, we'll set the left/right node to the next nodes in the array and push onto the queue
  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (currentNode) {
      const left = createNode(nodes[i++]);
      const right = createNode(nodes[i++]);
      currentNode.left = left;
      currentNode.right = right;
      queue.push(left);
      queue.push(right);
    }
  }

  return root;
}

const singleRoot = new Node(1);
console.log("Single root", serialize(singleRoot));

const simpleRoot = new Node(1);
simpleRoot.left = new Node(2);
simpleRoot.right = new Node(3);
console.log("Simple root", serialize(simpleRoot));

const testRoot = new Node(1);
testRoot.left = new Node(2);
testRoot.right = new Node(3);
testRoot.left.left = new Node(4);
testRoot.right.right = new Node(5);
testRoot.right.right.left = new Node(8);
testRoot.left.left.left = new Node(6);
testRoot.left.left.right = new Node(7);
testRoot.left.left.right.right = new Node(9);
console.log("Test root", serialize(testRoot));
console.log(deserialize(serialize(testRoot)));`;

const SerializeAndDeserializeBinaryTree: NextPage = () => {
  return (
    <div>
      <p>
        Source:
        https://bigfrontend.dev/problem/serialize-and-deserialize-binary-tree
      </p>

      <Prism.Tabs>
        <Prism.Tab
          label="serializeAndDeserializeRecursive.js"
          language="javascript"
        >
          {serializeAndDeserializeRecursiveCode}
        </Prism.Tab>
        <Prism.Tab
          label="serializeAndDeserializeIterative.js"
          language="javascript"
        >
          {serializeAndDeserializeIterativeCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default SerializeAndDeserializeBinaryTree;
