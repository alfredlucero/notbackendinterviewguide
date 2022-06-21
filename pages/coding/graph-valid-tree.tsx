import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsCode = `/**
* @param {number} n
* @param {number[][]} edges
* @return {boolean}
*/
// DFS Approach
// O(N + E) time/space
var validTree = function(n, edges) {
 // Initialize adjacency list (node to list of nodes it has edges to)
 const adjList = Array.from({ length: n }, () => []);
 
 // Loop through list of edges to build adjacency list (node to list of nodes it has edges to)
 edges.forEach((edge) => {
   const [node, to] = edge;
   adjList[node].push(to);
   adjList[to].push(node);
 });
 
 // Initialize stack of nodes to run DFS on
 const stack = [];
 // Initialize hashmap of parents aka node -> parent node it came from to help with going in one direction and visiting nodes once to keep track of nodes we've seen so far
 const parentMap = new Map();
 // Push first node onto stack and set it in parent map with -1 as there were no parent nodes to get to the start node 0
 stack.push(0);
 parentMap.set(0, -1);
 
 // While the stack is not empty
 while (stack.length > 0) {
   // Pop the current node
   const currentNode = stack.pop();
   
   // Go through the current node's neighbors
   const neighbors = adjList[currentNode];
   for (let i = 0; i < neighbors.length; i++) {
     const neighbor = neighbors[i];
     
     // If the neighbor node is equal to the parent node that go to the current node, we can skip the trivial cycle i.e. A -> B -> A
     if (parentMap.get(currentNode) === neighbor) {
       continue;
     }
     
     // If the parent map has the neighbor node aka we've already seen the node before, we encountered a cycle so we return false
     if (parentMap.has(neighbor)) {
       return false;
     }
 
     // Push the neighbor onto the stack
     stack.push(neighbor);
     // Add to parent map as being seen
     parentMap.set(neighbor, currentNode);
   }
 }
 
 // If the number of nodes we've seen in parent map equals the total number of nodes, we have a graph valid tree
 return parentMap.size === n;
};`;

const bfsGraphTheoryCode = `/**
* @param {number} n
* @param {number[][]} edges
* @return {boolean}
*/
// BFS Graph Theory Approach
// O(N + E) time/space
var validTree = function(n, edges) {
 // If the number of edges does not equal n-1, it may not be connected or may contain cycles
 if (edges.length !== n - 1) {
   return false;
 }
 
 // Initialize adjacency list (node to list of nodes it has edges to)
 const adjList = Array.from({ length: n }, () => []);
 
 // Loop through list of edges to build adjacency list (node to list of nodes it has edges to)
 edges.forEach((edge) => {
   const [node, to] = edge;
   adjList[node].push(to);
   adjList[to].push(node);
 });
 
 // Initialize queue of nodes to run BFS on
 const queue = [];
 // Initialize set of nodes seen so far
 const seen = new Set();
 
 // Push first node onto queue and seen set
 queue.push(0);
 seen.add(0);
 
 // While the queue is not empty
 while (queue.length > 0) {
   // Dequeue the current node
   const currentNode = queue.shift();
   
   // Go through the current node's neighbors
   const neighbors = adjList[currentNode];
   for (let i = 0; i < neighbors.length; i++) {
     const neighbor = neighbors[i];
     
     // If the neighbor node is already seen before, skip
     if (seen.has(neighbor)) {
       continue;
     }
 
     // Push the neighbor onto the queue
     queue.push(neighbor);
     // Add neighbor to seen set
     seen.add(neighbor);
   }
 }
 
 // If the number of nodes we've seen equals the total number of nodes, we have a graph valid tree
 return seen.size === n;
};`;

const GraphValidTree: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/graph-valid-tree/</p>
      <p>
        You have a graph of n nodes labeled from 0 to n - 1. You are given an
        integer n and a list of edges where edges[i] = [ai, bi] indicates that
        there is an undirected edge between nodes ai and bi in the graph. Return
        true if the edges of the given graph make up a valid tree, and false
        otherwise.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>

        <Prism.Tab label="bfsGraphTheory.js" language="javascript">
          {bfsGraphTheoryCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default GraphValidTree;
