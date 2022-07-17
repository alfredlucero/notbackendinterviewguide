import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const backtrackCode = `/**
* @param {number} n
* @return {string[]}
*/
// O(N * 5^(N/2 + 1) time since we have 5 pairs of characters to append; same for space with the output
var findStrobogrammatic = function(n) {
 let reversiblePairs = [
   ['0', '0'],
   ['1', '1'],
   ['6', '9'],
   ['9', '6'],
   ['8', '8']
 ];
 
 const generateStroboNumbers = (n, finalLength) => {
   if (n === 0) {
     return [""];
   }
   
   if (n === 1) {
     return ['1', '8', '0'];
   }
   
   const previousStroboNums = generateStroboNumbers(n - 2, finalLength);
   const currentStroboNums = [];
   
   previousStroboNums.forEach((previousStroboNum) => {
     reversiblePairs.forEach((pair) => {
       if (pair[0] !== '0' || n !== finalLength) {
         currentStroboNums.push(pair[0] + previousStroboNum + pair[1]);
       }
     });
   });
   
   return currentStroboNums;
 };
 
 return generateStroboNumbers(n, n);
};`;

const StrobogrammaticNumberII: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/strobogrammatic-number-ii/</p>
      <p>
        Given an integer n, return all the strobogrammatic numbers that are of
        length n. You may return the answer in any order. A strobogrammatic
        number is a number that looks the same when rotated 180 degrees (looked
        at upside down).
      </p>
      <Prism.Tabs>
        <Prism.Tab label="backtrack.js" language="javascript">
          {backtrackCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default StrobogrammaticNumberII;
