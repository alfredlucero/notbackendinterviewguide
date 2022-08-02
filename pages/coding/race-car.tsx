import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const bfsCode = `/**
* @param {number} target
* @return {number}
*/
// BFS Approach
// O(TLogT) time/space
var racecar = function(target) {
 const queue = [];
 // Set keys are "position speed"
 const visited = new Set();
 
 // [position,speed,numInstructions,instructions]
 queue.push([0, 1, 0, ""]);
 
 while (queue.length > 0) {
   const [currentPosition, currentSpeed, currentNumInstructions, currentInstructions] = queue.shift();
   
   // We've reached the target so we return the number of instructions it took
   if (currentPosition === target) {
     console.log(currentInstructions);
     return currentNumInstructions;
   }
   
   const carKey = \`$\{currentPosition} $\{currentSpeed}\`;
   
   // Assuming we haven't been at the same position and speed before...
   if (!visited.has(carKey)) {
     // Mark as visited
     visited.add(carKey);
     
     // Try accelerating to reach the target
     queue.push([currentPosition + currentSpeed, currentSpeed * 2, currentNumInstructions + 1, currentInstructions + "A"]);

     // Try reversing in going back if we overshot the target
     if (currentSpeed > 0 && currentPosition + currentSpeed > target) {
       queue.push([currentPosition, -1, currentNumInstructions + 1, currentInstructions + "R"]);
     }

     // Try reversing back to forward if we're undershooting and continuing to go the wrong way
     if (currentSpeed < 0 && currentPosition + currentSpeed < target) {
       queue.push([currentPosition, 1, currentNumInstructions + 1, currentInstructions + "R"]);
     }
   }
 }
};`;

const Racecar: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/race-car/</p>
      <p>
        Your car starts at position 0 and speed +1 on an infinite number line.
        Your car can go into negative positions. Your car drives automatically
        according to a sequence of instructions A (accelerate) and R (reverse):
        When you get an instruction A, your car does the following: position +=
        speed speed *= 2 When you get an instruction R, your car does the
        following: If your speed is positive then speed = -1 otherwise speed = 1
        Your position stays the same. For example, after commands AAR, your car
        goes to positions 0 -- 1 -- 3 -- 3, and your speed goes to 1 -- 2 -- 4
        -- -1. Given a target position target, return the length of the shortest
        sequence of instructions to get there.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="bfs.js" language="javascript">
          {bfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default Racecar;
