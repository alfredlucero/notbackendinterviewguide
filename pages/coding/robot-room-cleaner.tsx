import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const backtrackCode = `/**
* // This is the robot's control interface.
* // You should not implement it, or speculate about its implementation
* function Robot() {
*     // Returns true if the cell in front is open and robot moves into the cell.
*     // Returns false if the cell in front is blocked and robot stays in the current cell.
*     @return {boolean}
*     this.move = function() {
*         ...
*     };
*
*     // Robot will stay in the same cell after calling turnLeft/turnRight.
*     // Each turn will be 90 degrees.
*     @return {void}
*     this.turnLeft = function() {
*         ...
*     };
* 
*     // Robot will stay in the same cell after calling turnLeft/turnRight.
*     // Each turn will be 90 degrees.
*     @return {void} 
*     this.turnRight = function() {
*         ...
*     };
*
*     // Clean the current cell.
*     @return {void}
*     this.clean = function() {
*         ...
*     };
* };
*/

/**
* @param {Robot} robot
* @return {void}
*/
// O(N-M) time where N is number of cells and M is number of obstacles
// O(N-M) space since we have a visited set
var cleanRoom = function(robot) {
 // Go back one step to where the robot came from
 const goBack = () => {
   robot.turnRight();
   robot.turnRight();
   robot.move();
   robot.turnRight();
   robot.turnRight();
 };
 
 // Keep track of a visited position set so we don't revisit cells we've been to before
 const visited = new Set();
 
 // DFS from the robot's starting position while favoring the right first
 const dfs = (row, col, direction) => {
   // Clean the current cell
   robot.clean();
   // Mark it as visited
   const cellKey = \`\${row}-\${col}\`;
   visited.add(cellKey);
 
   // Try going in each direction, favoring the clockwise direction
   const directions = [[-1,0], [0,1], [1,0], [0,-1]];
   for (let i = 0; i < 4; i++) {
     const newDirection = (direction + i) % 4; 
     const [rowOffset, colOffset] = directions[newDirection];
     const newRow = row + rowOffset;
     const newCol = col + colOffset;
     
     const newCellKey = \`\${newRow}-\${newCol}\`;
     
     // If we haven't visited the cell before and we can move to it, try recursively visiting the rest of the cells
     if (!visited.has(newCellKey) && robot.move()) {
       dfs(newRow, newCol, newDirection);
       goBack();
     }
     
     // Turn the robot in chosen direction going clockwise
     robot.turnRight();
   }
 };
 
 dfs(0, 0, 0);
};`;

const RobotRoomCleaner: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/robot-room-cleaner/</p>
      <p>
        The robot starts at an unknown location in the room that is guaranteed
        to be empty, and you do not have access to the grid, but you can move
        the robot using the given API Robot. You are tasked to use the robot to
        clean the entire room (i.e., clean every empty cell in the room). The
        robot with the four given APIs can move forward, turn left, or turn
        right. Each turn is 90 degrees. When the robot tries to move into a wall
        cell, its bumper sensor detects the obstacle, and it stays on the
        current cell.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="backtrack.js" language="javascript">
          {backtrackCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default RobotRoomCleaner;
