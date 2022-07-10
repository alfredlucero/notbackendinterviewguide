import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const twoPointersCode = `/**
* @param {number[]} height
* @return {number}
*/
// O(N) time, O(1) space
var maxArea = function(height) {
 let left = 0;
 let right = height.length - 1;
 let overallMax = 0;
 // Use two pointers from left and right to keep on computing the area
 while (left < right) {
   const width = right - left;
   const currentArea = Math.min(height[left], height[right]) * width;
   overallMax = Math.max(currentArea, overallMax);
   
   // Move the pointer of the shorter line towards the center to see if we can find a longer vertical line
   // to form a larger area
   if (height[left] <= height[right]) {
     left++;
   } else {
     right--;
   }
 }

 return overallMax;
};`;

const ContainerWithMostWater: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/container-with-most-water/</p>
      <p>
        You are given an integer array height of length n. There are n vertical
        lines drawn such that the two endpoints of the ith line are (i, 0) and
        (i, height[i]). Find two lines that together with the x-axis form a
        container, such that the container contains the most water. Return the
        maximum amount of water a container can store. Notice that you may not
        slant the container.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="twoPointers.js" language="javascript">
          {twoPointersCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ContainerWithMostWater;
