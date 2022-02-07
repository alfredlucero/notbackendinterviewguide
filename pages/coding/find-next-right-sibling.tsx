import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const findNextRightSiblingRecursiveCode = `// Can do recursively find nextRightSibling of parent and get its first child to get the target node's next right sibling
function nextRightSibling(root, target) {
  // If target is null, there is no next right sibling
  if (!target) {
    return null;
  }
  // Check target's immediate nextElementSibling to see if there is a next sibling on the same level
  if (target.nextElementSibling) {
    return target.nextElementSibling;
  }

  let parent = target.parentElement;
  while (parent) {
    parent = nextRightSibling(root, parent);
    if (parent && parent.firstElementChild) {
      return parent.firstElementChild;
    }
  }

  return null;
}`;

const findNextRightSiblingIterativeCode = `// Can do BFS with queue for iterative approach -> traverse from root layer by layer and find the next sibling
// If element is last one in layer, append null at each layer
function nextRightSibling(root, target) {
  // To distinguish between levels we will add null at the end of each level
  // We'll use BFS to push onto the queue each node's children
  const queue = [root, null];
  while (queue.length) {
    const head = queue.shift();
    // Assuming we popped the target node, the next element in queue should tell us if there is a next right sibling or not
    if (head === target) {
      return queue.shift();
    // after going through an entire level, we will push a null
    } else if (head === null && queue.length) {
      queue.push(null);
    // push all the head node's children onto the queue
    } else {
      queue.push(...head.children);
    }
  }
  return null;
}`;

const FindNextRightSibling: NextPage = () => {
  return (
    <div>
      <p>Source: https://bigfrontend.dev/problem/Next-Right-Sibiling</p>

      <Prism.Tabs>
        <Prism.Tab
          label="findNextRightSiblingRecursive.js"
          language="javascript"
        >
          {findNextRightSiblingRecursiveCode}
        </Prism.Tab>
        <Prism.Tab
          label="findNextRightSiblingIterative.js"
          language="javascript"
        >
          {findNextRightSiblingIterativeCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default FindNextRightSibling;
