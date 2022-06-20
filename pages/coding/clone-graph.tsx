import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsCode = `/**
* // Definition for a Node.
* function Node(val, neighbors) {
*    this.val = val === undefined ? 0 : val;
*    this.neighbors = neighbors === undefined ? [] : neighbors;
* };
*/

/**
* @param {Node} node
* @return {Node}
*/
// DFS Hashmap Approach
// O(N + M) time, O(N) space
var cloneGraph = function(node) {
 // Base case if node is null, we return back null
 if (node === null) {
   return null;
 }
 
 // Keep track of a visited hashmap of unique node values to cloned nodes
 const visited = new Map();
 
 // DFS to clone each node as we go and mark as visited along the way
 const dfs = (root) => {
   // If the current root is already visited, return the cloned node
   if (visited.has(root.val)) {
     return visited.get(root.val);
   }
   
   // Clone node and mark it as visited
   const clonedNode = new Node(root.val);
   visited.set(root.val, clonedNode);
   
   // Loop through each neighbor and add it to cloned list of neighbors
   const clonedNeighbors = [];
   root.neighbors.forEach((neighbor) => {
     clonedNeighbors.push(dfs(neighbor));
   });
   
   // Add cloned list of neighbors to cloned node
   clonedNode.neighbors = clonedNeighbors;
   
   // Return the current root
   return clonedNode;
 };
 
 return dfs(node);
};`;

const bfsCode = `/**
* // Definition for a Node.
* function Node(val, neighbors) {
*    this.val = val === undefined ? 0 : val;
*    this.neighbors = neighbors === undefined ? [] : neighbors;
* };
*/

/**
* @param {Node} node
* @return {Node}
*/
// BFS Hashmap Approach
// O(N + M) time, O(N) space
var cloneGraph = function(node) {
 // Base case if node is null, we return back null
 if (node === null) {
   return null;
 }
 
 // Keep track of a visited hashmap of unique node values to cloned nodes
 const visited = new Map();
 
 // Initialize queue of nodes to visit
 const queue = [];
 
 // Clone the start node and mark as visited
 const clonedStartNode = new Node(node.val);
 visited.set(node.val, clonedStartNode);
 
 // Enqueue the original start node
 queue.push(node);
 
 // BFS traversal
 // While the queue is not empty
 while (queue.length > 0) {
   // We dequeue the current node
   const currentNode = queue.shift();
   
   // Loop through the current node's neighbors
   currentNode.neighbors.forEach((neighbor) => {
     // If the current neighbor is not visited
     if (!visited.has(neighbor.val)) {
       // Clone the neighbor and mark as visited
       const clonedNeighbor = new Node(neighbor.val);
       visited.set(neighbor.val, clonedNeighbor);
       
       // Add the original neighbor to the queue
       queue.push(neighbor);
     }
     
     // Add the clone of the neighbor to the current cloned node's neighbor's list
     visited.get(currentNode.val).neighbors.push(visited.get(neighbor.val));
   });
 }
 
 // Return the cloned start node
 return clonedStartNode;
};`;

const CloneGraph: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/clone-graph/</p>
      <p>
        Given a reference of a node in a connected undirected graph. Return a
        deep copy (clone) of the graph. Each node in the graph contains a value
        (int) and a list (List[Node]) of its neighbors.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>

        <Prism.Tab label="bfs.js" language="javascript">
          {bfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default CloneGraph;
