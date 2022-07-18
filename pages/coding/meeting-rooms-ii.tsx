import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

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
      </Prism.Tabs>
    </div>
  );
};

export default MeetingRoomsII;
