import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const traverseDomLevelByLevelCode = `// Given a DOM tree, flatten it into a one dimensional array in order of layer by layer
// Use BFS with a queue, start off queue with the root, pop head off queue to add to flattened result and add children to queue; 
function flatten(root) {
  // If there is no root, return empty array
  if (!root) {
    return [];
  }
  // Iterative BFS with queue to go level by level and add the child of the head nodes onto the queue
  const queue = [root];
  const flattenedResult = [];
  while (queue.length > 0) {
    const head = queue.shift();
    flattenedResult.push(head);
    queue.push(...head.children);
  }
  return flattenedResult;
}`;

const TraverseDomLevelByLevel: NextPage = () => {
  return (
    <div>
      <p>Source: https://bigfrontend.dev/problem/Traverse-DOM-level-by-level</p>

      <Prism language="javascript">{traverseDomLevelByLevelCode}</Prism>
    </div>
  );
};

export default TraverseDomLevelByLevel;
