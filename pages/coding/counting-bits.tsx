import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const countingBitsDivisionOddCheckCode = `/**
* @param {number} n
* @return {number[]}
*/
// nlogn approach:
// For each number up to n
// We count the number of 1s by continuing to integer/floor divide by 2 and checking if odd/even
// if odd we increment the count by 1
// O(nlogn) time, O(1) space
var countBits = function(n) {
 const result = new Array(n+1);
 
 for (let i = 0; i <= n; i++) {
   let currentNum = i;
   let currentOnesCount = 0;
   while (currentNum > 0) {
     // If it's odd, we increment the number of 1s seen so far
     if (currentNum % 2 === 1) {
       currentOnesCount += 1;
     }
     
     currentNum = Math.floor(currentNum / 2);
   }
   
   result[i] = currentOnesCount;
 }
 
 return result;
};`;

const countingBitsDpCode = `/**
* @param {number} n
* @return {number[]}
*/
/*
 Dynamic programming Approach:
 0 -> 0 => 0
 1 -> 1 => 1  1 through 3 can be reused aka 1 + dp[n-1]
 2 -> 10 => 1 aka 1 + dp[n-2]
 3 -> 11 => 2 aka  1 + dp[n-2]
 4 -> 100 => 1  4 through 7 can reuse stuff from 1 through 3 and the 1 in the 1*2^2 spot aka 1 + dp[n-4]
 5 -> 101 => 2 aka 1 + dp[n-4]
 6 -> 110 => 2 aka 1 + dp[n-4]
 7 -> 111 => 3 aka 1 + dp[n-4]
 8 -> 1000 => 1 aka 1 + dp[n-8]
 9 -> 1001 => 2 aka 1 + dp[n-8]
 10 -> 1010 => 2  same thing up to 15
 11 -> 1011 => 3
 12 -> 1100 => 2
 13 -> 1101 => 3
 14 -> 1110 => 3
 15 -> 1111 => 4
 16 -> 10000 => 1 aka 1 + dp[n-8]
 ... 1 + dp[n-2^x] (most significant bits i.e. 1, 2, 4, 8, 16, 32)
 O(n) time, O(1) space
*/
var countBits = function(n) {
 // Initialize array of size n+1
 const dp = new Array(n+1);
 dp[0] = 0;
 // This will aid us later on in our i - 2^x formula but we start at 2^0
 let currentPowerOf2Offset = 1;
 for (let i = 1; i <= n; i++) {
   // Once we hit a new power of 2, we update our offset
   if (currentPowerOf2Offset * 2 === i) {
     currentPowerOf2Offset = i;
   }
   
   // Reuse existing calculations of number of bits in early numbers by using the power of 2 offset
   // i.e. for 9 it's 1 + dp[9 - 8] = 1 + dp[1] = 2
   // i.e. for 5 it's 1 + dp[5 - 4] = 1 + dp[1] = 2
   // i.e. for 15 it's 1 + dp[15-8] = 1 + dp[7] = 4
   dp[i] = 1 + dp[i - currentPowerOf2Offset];
 }
 
 return dp;
};`;

const CountingBits: NextPage = () => {
  return (
    <div>
      <p>Source: </p>
      <p></p>
      <Prism.Tabs>
        <Prism.Tab
          label="countingBitsDivisionOddCheck.js"
          language="javascript"
        >
          {countingBitsDivisionOddCheckCode}
        </Prism.Tab>
        <Prism.Tab label="countingBitsDp.js" language="javascript">
          {countingBitsDpCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default CountingBits;
