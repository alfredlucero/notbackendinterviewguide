import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const sortIterCode = `/**
* @param {number[][]} intervals
* @return {boolean}
*/
var canAttendMeetings = function(intervals) {
 if (intervals.length <= 1) {
   return true;
 }

 // Sort by start time
 intervals.sort((a, b) => a[0] - b[0]);

 for (let i = 1; i < intervals.length; i++) {
   const currentInterval = intervals[i];
   const previousInterval = intervals[i - 1];
   
   const [currentStart, currentEnd] = currentInterval;
   const [previousStart, previousEnd] = previousInterval;

   if (currentStart < previousEnd) {
     return false;
   }
 }
 
 return true;
};`;

const MeetingRooms: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/meeting-rooms/</p>
      <p>
        Given an array of meeting time intervals where intervals[i] = [starti,
        endi], determine if a person could attend all meetings.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="sortIter.js" language="javascript">
          {sortIterCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default MeetingRooms;
