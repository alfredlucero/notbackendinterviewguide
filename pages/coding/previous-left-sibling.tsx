import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const previousLeftSiblingIterativeCode = `// Given a DOM tree and a target element, return the previous left sibling
// Can do similar BFS with queue like next right sibling except when we see the target we return 
// the previous element and keep track of the previous element after popping
function previousLeftSibling(root, target) {
  // To distinguish between levels we will add null at the end of each level
  // We'll use BFS to push onto the queue each node's children
  const queue = [root, null];
  let previousElement = null;
  while (queue.length) {
    const head = queue.shift();
    // Assuming we popped the target node, the previous element in queue should tell us if there is a previous left sibling or not
    if (head === target) {
      return previousElement;
    // after going through an entire level, we will push a null
    } else if (head === null && queue.length) {
      queue.push(null);
    // push all the head node's children onto the queue
    } else {
      queue.push(...head.children);
    }
    previousElement = head;
  }
  return null;
}`;

const previousLeftSiblingRecursiveCode = `// Can do recursive approach except check the previousElementSibling and lastElementChild
function previousLeftSibling(root, target) {
  // If target is null, there is no previous left sibling
  if (!target) {
    return null;
  }
  // Check target's immediate previousElementSibling to see if there is a previous sibling on the same level
  if (target.previousElementSibling) {
    return target.previousElementSibling;
  }

  let parent = target.parentElement;
  while (parent) {
    parent = previousLeftSibling(root, parent);
    if (parent && parent.lastElementChild) {
      return parent.lastElementChild;
    }
  }

  return null;
}`;

const PreviousLeftSibling: NextPage = () => {
  return (
    <div>
      <p>Source: https://bigfrontend.dev/problem/previous-left-sibling</p>

      <Prism.Tabs>
        <Prism.Tab
          label="previousLeftSiblingRecursive.js"
          language="javascript"
        >
          {previousLeftSiblingRecursiveCode}
        </Prism.Tab>
        <Prism.Tab
          label="previousLeftSiblingIterative.js"
          language="javascript"
        >
          {previousLeftSiblingIterativeCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default PreviousLeftSibling;
