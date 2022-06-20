import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const bfsTopSortCode = `/**
* @param {number} numCourses
* @param {number[][]} prerequisites
* @return {number[]}
*/
// BFS TopSort
// O(E + V) time, space
var findOrder = function(numCourses, prerequisites) {
 // Initialize adjacency list aka courseList (prereq -> list of dependent courses)
 const courseList = Array.from({ length: numCourses }, () => []);
 // Initialize indegrees array (course -> number of courses required to take)
 const indegrees = Array.from({ length: numCourses }, () => 0);
 
 // Build adjacency list (prereq -> list of dependent courses) and fill indegrees of courses
 prerequisites.forEach((prereq) => {
   const [dependentCourse, prereqCourse] = prereq;
   courseList[prereqCourse].push(dependentCourse);
   indegrees[dependentCourse]++;
 });
 
 // Initialize queue of courses to take
 const queue = [];
 
 // Add all courses with indegree 0 (no prereqs required to take) to queue of courses to take
 indegrees.forEach((indegree, course) => {
   if (indegree === 0) {
     queue.push(course);
   }
 });
 
 // If there are no courses with indegree 0, we cannot take any course to start so we return empty array
 const noCourseToTake = !indegrees.some((indegree) => indegree === 0);
 if (noCourseToTake) {
   return [];
 }
 
 // Initialize coursesTaken to empty array
 const coursesTaken = [];
 
 // While the queue of courses to take is not empty
 while (queue.length > 0) {
   // Dequeue valid course
   const validCourse = queue.shift();
   
   // Add to coursesTaken
   coursesTaken.push(validCourse);
   
   // Loop through all the courses that depend on the valid course
   courseList[validCourse].forEach((dependentCourse) => {
     // Decrement indegrees of the dependent course
     indegrees[dependentCourse]--;
     
     // If the indegrees of the dependent course is 0, we can take the course now so we add onto queue
     if (indegrees[dependentCourse] === 0) {
       queue.push(dependentCourse);
     }
   });
 }
   
 
 // If number of coursesTaken is equal to numCourses, we can return coursesTaken; otherwise, we return empty array
 return coursesTaken.length === numCourses ? coursesTaken : [];
};`;

const CourseScheduleII: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/course-schedule-ii/</p>
      <p>
        There are a total of numCourses courses you have to take, labeled from 0
        to numCourses - 1. You are given an array prerequisites where
        prerequisites[i] = [ai, bi] indicates that you must take course bi first
        if you want to take course ai. For example, the pair [0, 1], indicates
        that to take course 0 you have to first take course 1. Return the
        ordering of courses you should take to finish all courses. If there are
        many valid answers, return any of them. If it is impossible to finish
        all courses, return an empty array.
      </p>

      <Prism.Tabs>
        <Prism.Tab label="bfsTopSort.js" language="javascript">
          {bfsTopSortCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default CourseScheduleII;
