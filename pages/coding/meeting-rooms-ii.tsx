import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const minHeapCode = `/**
* @param {number[][]} intervals
* @return {number}
*/
// MinHeap Approach
// O(NlogN) time, O(N) space
var minMeetingRooms = function(intervals) {
 // We'll keep track of the minimum end times of meetings
 const minHeap = new Heap((a,b) => a - b);
 
 // Sort the intervals by start time
 intervals.sort((a,b) => a[0] - b[0]);
 
 // Add the first meeting end time to the min heap
 minHeap.insert(intervals[0][1]);
 

 for (let i = 1; i < intervals.length; i++) {
   const [startTime, endTime] = intervals[i];
   // If there is a free room to start a meeting where the start time is greater than the end time of the last earliest meeting that finished, we can remove that room from the minheap
   if (minHeap.size > 0 && minHeap.peek() <= startTime) {
     minHeap.extract();
   }
   
   // Push a new room onto the min heap based on the current interval's end time 
   minHeap.insert(endTime);
 }
 
 // The minimum number of meeting rooms required is equal to the min heap size at the end
 return minHeap.size;
};


class Heap {
 constructor(compareFunc) {
   this.compareFunc = compareFunc;
   this.heap = [];
 }
 
 insert(value) {
   this.heap.unshift(value);
   this.heap.sort(this.compareFunc);
 }
 
 extract() {
   if (this.size === 0) return null;
   return this.heap.shift();
 }
 
 peek() {
   if (this.size === 0) return null;
   return this.heap[0];
 }
 
 get size() {
   return this.heap.length;
 }
}
`;

const chronoSortCode = `/**
* @param {number[][]} intervals
* @return {number}
*/
// Chronological Ordering Approach
// O(NlogN) time, O(N) space
var minMeetingRooms = function(intervals) {
 if (intervals.length === 0) {
   return 0;
 }
 
 // Sort intervals by start time and end time
 const startTimes = intervals.map((interval) => interval[0]).sort((a,b) => a - b);
 const endTimes = intervals.map((interval) => interval[1]).sort((a,b) => a - b);
 
 let startPointer = 0;
 let endPointer = 0;
 let numRooms = 0;
 
 while (startPointer < intervals.length) {
   // If there is a meeting that has ended by the time the meeting at start pointer starts, we can use that freed up room
   if (startTimes[startPointer] >= endTimes[endPointer]) {
     numRooms--;
     endPointer++;
   }
   
   // When no room is free for the start time of a meeting, we need to allocate another room
   // Even when a room is free, we'll still use a room and check the next meeting
   numRooms++;
   startPointer++;
 }
 
 return numRooms;
};`;

const MeetingRoomsII: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/meeting-rooms-ii/</p>
      <p>
        Given an array of meeting time intervals intervals where intervals[i] =
        [starti, endi], return the minimum number of conference rooms required.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="chronoSort.js" language="javascript">
          {chronoSortCode}
        </Prism.Tab>
        <Prism.Tab label="minHeap.js" language="javascript">
          {minHeapCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default MeetingRoomsII;
