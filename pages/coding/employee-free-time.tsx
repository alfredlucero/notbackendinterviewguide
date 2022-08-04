import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const mergeCode = `/**
* // Definition for an Interval.
* function Interval(start, end) {
*    this.start = start;
*    this.end = end;
* };
*/

/**
* @param {Interval[][]} schedule
* @return {Interval[]}
*/
// O(NlogN) time, O(N) space
var employeeFreeTime = function(schedule) {
 // Push all intervals into allIntervals list
 const allIntervals = schedule.reduce((acc, current) => {
   return [...acc, ...current];
 }, []);
 
 // Sort the intervals by start time
 allIntervals.sort((a,b) => a.start - b.start);
 
 // Merge any overlapping intervals
 const mergedIntervals = mergeIntervals(allIntervals);
 
 // Get the free times between the merged intervals by comparing two intervals at a time
 const freeIntervals = [];
 for (let i = 0; i < mergedIntervals.length - 1; i++) {
   // Get the difference between the two intervals and that's the free time to add to result
   const firstInterval = mergedIntervals[i];
   const secondInterval = mergedIntervals[i + 1];
   
   // Say we have [1,3], [4,10]..., the free time is 3-4
   const { start: startFirst, end: endFirst } = firstInterval;
   const { start: startSecond, end: endSecond }  = secondInterval;
   
   const freeInterval = { start: endFirst, end: startSecond };
   freeIntervals.push(freeInterval);
 }
 
 return freeIntervals;
};

// Assuming the intervals are sorted by start time, we'll merge any overlapping intervals
function mergeIntervals(intervals) {
 const mergedIntervals = [];
 for (let i = 0; i < intervals.length; i++) {
   const { start: currentStart, end: currentEnd } = intervals[i];
   // If there is no last merged interval or the last merged interval's end time is < current start time, we push the current interval since no overlap
   if (mergedIntervals.length === 0 || mergedIntervals[mergedIntervals.length - 1].end < currentStart) {
     mergedIntervals.push({ start: currentStart, end: currentEnd });
   } else {
     // If there is an overlap, so we merge the last merged interval and the current interval together
     mergedIntervals[mergedIntervals.length - 1].start = Math.min(mergedIntervals[mergedIntervals.length - 1].start, currentStart);
     mergedIntervals[mergedIntervals.length - 1].end = Math.max(mergedIntervals[mergedIntervals.length - 1].end, currentEnd);
   }
 }
 
 return mergedIntervals;
};`;

const EmployeeFreeTime: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/employee-free-time/</p>
      <p>
        We are given a list schedule of employees, which represents the working
        time for each employee. Each employee has a list of non-overlapping
        Intervals, and these intervals are in sorted order. Return the list of
        finite intervals representing common, positive-length free time for all
        employees, also in sorted order. (Even though we are representing
        Intervals in the form [x, y], the objects inside are Intervals, not
        lists or arrays. For example, schedule[0][0].start = 1,
        schedule[0][0].end = 2, and schedule[0][0][0] is not defined). Also, we
        would not include intervals like [5, 5] in our answer, as they have zero
        length.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="merge.js" language="javascript">
          {mergeCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default EmployeeFreeTime;
