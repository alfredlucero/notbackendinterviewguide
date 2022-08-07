import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const greedyCode = `/**
* @param {character[]} tasks
* @param {number} n
* @return {number}
*/
// O(N) where N is number of tasks to execute
// O(1) space
var leastInterval = function(tasks, n) {
 // Get the frequencies of the tasks
 const frequencies = Array.from({ length: 26 }, () => 0);
 tasks.forEach((task) => {
   frequencies[task.charCodeAt(0) - "A".charCodeAt(0)] += 1;
 });
 
 // Sort frequencies
 frequencies.sort((a, b) => a - b);
 
 // Get the max frequency of tasks
 const maxFrequency = frequencies[25];
 // Total possible idle time
 let idleTime = (maxFrequency - 1) * n;
 
 // Pick elements in descending order one by one and at each step we decrease the idle time to fulfill as many slots as possible
 for (let i = frequencies.length - 2; i >= 0 && idleTime > 0; i--) {
   idleTime -= Math.min(maxFrequency - 1, frequencies[i]);
 }
 idleTime = Math.max(0, idleTime);
 
 
 return idleTime + tasks.length;
};`;

const TaskScheduler: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/task-scheduler/</p>
      <p>
        Given a characters array tasks, representing the tasks a CPU needs to
        do, where each letter represents a different task. Tasks could be done
        in any order. Each task is done in one unit of time. For each unit of
        time, the CPU could complete either one task or just be idle. However,
        there is a non-negative integer n that represents the cooldown period
        between two same tasks (the same letter in the array), that is that
        there must be at least n units of time between any two same tasks.
        Return the least number of units of times that the CPU will take to
        finish all the given tasks.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="greedy.js" language="javascript">
          {greedyCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default TaskScheduler;
