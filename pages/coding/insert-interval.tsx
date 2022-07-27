import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const linearCode = `/**
* @param {number[][]} intervals
* @param {number[]} newInterval
* @return {number[][]}
*/
// O(N) time, O(N) space
var insert = function(intervals, newInterval) {
 let index = 0;
 let result = [];
 
 // Add all the intervals before the new interval aka current interval end < new interval start
 while (index < intervals.length && intervals[index][1] < newInterval[0]) {
   result.push(intervals[index]);
   index++;
 }
 
 // Merge all intervals that intersect with the new interval aka current interval start <= new interval end
 while (index < intervals.length && intervals[index][0] <= newInterval[1]) {
   newInterval[0] = Math.min(intervals[index][0], newInterval[0]);
   newInterval[1] = Math.max(intervals[index][1], newInterval[1]);
   index++;
 }
 result.push(newInterval);
 
 // Add all the intervals after the merged interval 
 while (index < intervals.length) {
   result.push(intervals[index]);
   index++;
 }
 
 return result;
};`;

const mergeCode = `/**
* @param {number[][]} intervals
* @param {number[]} newInterval
* @return {number[][]}
*/
// O(N) time, O(N) space
var insert = function(intervals, newInterval) {
 let result = [];
 // Collect and merge as we go loop through all the intervals
 for (let i = 0; i < intervals.length; i++) {
   const currentInterval = intervals[i];
   // If there is no more new interval to add or we know the current interval should come before the new interval (current end < new start), we add it to result
   if (newInterval === null || currentInterval[1] < newInterval[0]) {
     result.push(currentInterval);
   // If we know the current interval should come after the new interval (current start > new end), we add the new interval and current interval 
   } else if (currentInterval[0] > newInterval[1]) {
     result.push(newInterval);
     result.push(currentInterval);
     newInterval = null;
   // If we have overlap, we merge the intervals
   } else {
     newInterval[0] = Math.min(currentInterval[0], newInterval[0]);
     newInterval[1] = Math.max(currentInterval[1], newInterval[1]);
   }
 }
 
 // If we haven't added the merged interval yet to the result, we make sure to add it at the end
 if (newInterval !== null) {
   result.push(newInterval);
 }
 
 return result;
};`;

const InsertInterval: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/insert-interval/</p>
      <p>
        You are given an array of non-overlapping intervals intervals where
        intervals[i] = [starti, endi] represent the start and the end of the ith
        interval and intervals is sorted in ascending order by starti. You are
        also given an interval newInterval = [start, end] that represents the
        start and end of another interval. Insert newInterval into intervals
        such that intervals is still sorted in ascending order by starti and
        intervals still does not have any overlapping intervals (merge
        overlapping intervals if necessary). Return intervals after the
        insertion.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="linear.js" language="javascript">
          {linearCode}
        </Prism.Tab>
        <Prism.Tab label="merge.js" language="javascript">
          {mergeCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default InsertInterval;
