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
// O(N) time/space
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

const unionFindCode = `/**
* @param {number} n
* @param {number[][]} edges
* @return {boolean}
*/
// Union Find Approach
// O(alpha*N) time, O(N) space
var validTree = function(n, edges) {
 // If the number of edges does not equal n-1, it may not be connected or may contain cycles
 if (edges.length !== n - 1) {
   return false;
 }
 
 // Initialize UnionFind object with n nodes
 const unionFind = new UnionFind(n);
 
 // The graph must contain a single connected component so we loop through each edge and merge edges with union find
 for (let i = 0; i < edges.length; i++) {
   const edge = edges[i];
   const A = edge[0];
   const B = edge[1];
   
   // If a merge didn't happen, we encountered a cycle so we return false
   if (!unionFind.union(A, B)) {
     return false;
   }
 }
 
 // We've merged successfully down to one connected component, return true as it's a valid tree
 return true;
};

class UnionFind {
 // Initializing all the sets at the same time rather than makeset function
 constructor(n) {
   this.parent = Array.from({ length: n }, () => 0);
   for (let node = 0; node < n; node++) {
     this.parent[node] = node;
   }
 }
 
 // Trace up the parent links until it finds the root node for A and returns that root
 find(A) {
   while (this.parent[A] !== A) {
     A = this.parent[A];
   }
   return A;
 }
 
 // Return true if a merge happened and false otherwise
 union(A, B) {
   // Find the root of A and root of B
   let rootA = this.find(A);
   let rootB = this.find(B);

   // If A and B are already in the same set aka has the same root, return false as nothing to merge
   if (rootA === rootB) {
     return false;
   }

   // Merge the sets containing A and B and return true as a merge was successful
   this.parent[rootA] = rootB;

   return true;
 }
}`;

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

        <Prism.Tab label="unionFind.js" language="javascript">
          {unionFindCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default GraphValidTree;
