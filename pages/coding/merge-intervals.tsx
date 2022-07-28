import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const sortIterativeCode = `/**
* @param {number[][]} intervals
* @return {number[][]}
*/
// O(nlogn) time, O(n) space
var merge = function(intervals) {
 if (intervals.length === 0) {
   return [];
 }
 if (intervals.length === 1) {
   return intervals;
 }
 
 // Sort the intervals by start time
 intervals.sort((a,b) => a[0] - b[0]);	

 const output = [];

 intervals.forEach((interval) => {
   const [currentStart, currentEnd] = interval;
   
   // If we haven't added any interval yet, we push it to output
   if (output.length === 0) {
     output.push(interval);
   // If we have overlap with the current interval and the last interval added to the output, we merge the two intervals
   } else if (currentStart <= output[output.length - 1][1]) {
     const mergedStart = Math.min(currentStart, output[output.length-1][0]);
     const mergedEnd = Math.max(currentEnd, output[output.length-1][1]);
     output[output.length-1][0] = mergedStart;
     output[output.length-1][1] = mergedEnd;
   } else {
     // If we don't have overlap, we push the current interval to the output
     output.push(interval);
   }
 });
 
 return output;
};`;

const MergeIntervals: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/merge-intervals/</p>
      <p>
        Given an array of intervals where intervals[i] = [starti, endi], merge
        all overlapping intervals, and return an array of the non-overlapping
        intervals that cover all the intervals in the input.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="sortIterative.js" language="javascript">
          {sortIterativeCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default MergeIntervals;
