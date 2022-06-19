import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const bfsTopSortCode = `/**
* @param {number} numCourses
* @param {number[][]} prerequisites
* @return {boolean}
*/
// BFS Topological Sort
// O(E + V) time, space
var canFinish = function(numCourses, prerequisites) {
 // Initialize indegrees array to keep track of number of prereqs required for a course
 const indegrees = Array.from({ length: numCourses }, () => 0);
 // Initialize adjacency list (prereqs -> list of dependent courses)
 const courseList = Array.from({ length: numCourses }, () => []);
 
 // Loop through all the prereqs to build adjacency list (prereqs -> list of dependent courses) and fill in indegrees of dependent courses
 prerequisites.forEach((prerequisite) => {
   const [dependentCourse, prereqCourse] = prerequisite;
   courseList[prereqCourse].push(dependentCourse);
   indegrees[dependentCourse]++;
 });
 
 // Initialize queue of courses we can take
 const queue = [];
 
 // Loop through all indegrees and if there is a node with 0 indegree (a course that doesn't have any prereq),
 // We add it to the queue
 indegrees.forEach((indegree, course) => {
   if (indegree === 0) {
     queue.push(course);
   } 
 });
 
 // If there are no nodes with indegree 0, it's not a DAG/we cannot finish all courses because we can't take any prereqs to start
 const noCoursesToTake = !indegrees.some((indegree) => indegree === 0)
 if (noCoursesToTake) {
   return false;
 }
 
 // Initialize the number of valid courses we are able to take
 let numValidCourses = 0;
 
 // While the queue is not empty
 while (queue.length > 0) {
   // Dequeue the valid course
   const validCourse = queue.shift();
   
   // Increment the number of courses we are able to take
   numValidCourses++;
   
   // Loop through all the dependent courses that this valid course is a prereq of
   courseList[validCourse].forEach((dependentCourse) => {
     // Decrement the indegree of the dependent course
     indegrees[dependentCourse]--;
     
     // If the dependent course's indegree is 0
     if (indegrees[dependentCourse] === 0) {
       // Enqueue the dependent course as we can take it
       queue.push(dependentCourse);
     }
   }); 
 }
 
 // If the number of courses we are able to take equals the total number of courses, we can finish all courses
 return numValidCourses === numCourses; 
};`;

const dfsTopSortCode = `/**
* @param {number} numCourses
* @param {number[][]} prerequisites
* @return {boolean}
*/
// DFS Topological Sort
// O(E + V) time, space
var canFinish = function(numCourses, prerequisites) {
 // Initialize courseList - adjacency list of prereqs to list of dependent courses
 const courseList = Array.from({ length: numCourses }, () => []);
 // Initialize visited array (0 = not visited, 1 = visited, -1 = being visited)
 const visited = Array.from({ length: numCourses }, () => 0);
 
 // DFS to determine if we will not run into a cycle
 const dfs = (course) => {
   // If course is already visited, we can skip
   if (visited[course] === 1) {
     return true;
   }
   // If course is being visited, we hit a cycle and are visiting it again, so we return false
   if (visited[course] === -1) {
     return false;
   }
   
   // Mark the course as being visited
   visited[course] = -1;
   
   // Go through the course's dependent courses and see if we can DFS from each dependent course without hitting a cycle
   const dependentCourses = courseList[course];
   for (let i = 0; i < dependentCourses.length; i++) {
     const dependentCourse = dependentCourses[i];
     if (!dfs(dependentCourse)) {
       return false;
     }
   }
   
   // Mark the course as visited
   visited[course] = 1;
   
   return true;
 };
 
 // Build adjacency list (prereqs to list of dependent courses)
 prerequisites.forEach((prereq) => {
   const [dependentCourse, prereqCourse] = prereq;
   courseList[prereqCourse].push(dependentCourse);
 });
 
 // Loop through each course and check if we can DFS without encountering a cycle
 for (let course = 0; course < numCourses; course++) {
   if (!dfs(course)) {
     return false;
   }
 }
 
 // We've gone through all the courses through DFS without hitting a cycle
 return true;
};`;

const CourseSchedule: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/course-schedule/</p>
      <p>
        There are a total of numCourses courses you have to take, labeled from 0
        to numCourses - 1. You are given an array prerequisites where
        prerequisites[i] = [ai, bi] indicates that you must take course bi first
        if you want to take course ai. For example, the pair [0, 1], indicates
        that to take course 0 you have to first take course 1. Return true if
        you can finish all courses. Otherwise, return false.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="bfsTopSort.js" language="javascript">
          {bfsTopSortCode}
        </Prism.Tab>

        <Prism.Tab label="dfsTopSort.js" language="javascript">
          {dfsTopSortCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default CourseSchedule;
