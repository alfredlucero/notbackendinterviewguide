import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const coinChangeTopDownMemoizedCode = `/**
* @param {number[]} coins
* @param {number} amount
* @return {number}
*/
// Top Down Recursive Approach with Memoization
// O(N*C) time where N is the total amount, C is the total number of different coins
// O(N) space to hold amount keys in the memo + the recursive stack space
var coinChange = function(coins, amount) {
 if (amount === 0) {
   return 0;
 }
 
 const memo = {};
 const coinChangeHelper = (currentAmount) => {
   if (memo.hasOwnProperty(currentAmount)) {
     return memo[currentAmount];
   }
   if (currentAmount === 0) {
     return 0;
   }
   if (currentAmount < 0) {
     return Infinity;
   }
   let minCoins = Infinity;
   coins.forEach((coin) => {
     let currentMinCoins = coinChangeHelper(currentAmount - coin);
     if (currentMinCoins >= 0 && currentMinCoins !== Infinity) {
       currentMinCoins += 1;
     }
     minCoins = Math.min(currentMinCoins, minCoins);
   });
   
   memo[currentAmount] = minCoins;
   
   return minCoins;
 };
 
 const result = coinChangeHelper(amount);
 return result === Infinity ? -1 : result;
};`;

const coinChangeBottomUpDpCode = `/**
* @param {number[]} coins
* @param {number} amount
* @return {number}
*/
// Dynamic Programming Bottom Up Approach
// Keeping track of the minimum number of coins needed to reach every single amount between 0 to amount
// We'll go through all permutations of coins to reach the amounts
//
// Initialize dp array of size amount + 1; set all initial values to amount + 1; dp[0] = 0 (takes 0 coins to reach 0 amount)
// Each index i in the dp array will represent the minimum number of coins to reach that amount i 
// Loop through each value i in the amount starting from i = 1
//   Loop through each coin c in coins
//     if the coin value is less than the current amount
//        Set dp[i] to the minimum of skipping the coin dp[i] or adding the coin dp[i - coins[c]] + 1
// if the dp[amount] is greater than amount i.e. not possible to reach amount given the coins, we return -1
// otherwise, we return dp[amount] which should be the minimum number of coins to reach 
// Time: O(n*c) where n is the amount and c is the number of coins; Space: O(n) since we build an array of size amount + 1
var coinChange = function(coins, amount) {
 // Initialize dp array of size amount + 1 with all initial values set to greater than the amount
 // Each index element i in dp represents the minimum number of coins to reach that amount i
 let dp = Array.from({ length: amount + 1 }, () => amount + 1);
 
 // Since it takes 0 coins to reach amount 0
 dp[0] = 0;
 
 // Loop through each value i in the amount
 for (let i = 1; i < dp.length; i++) {
   // Loop through each coin c in coins
   for (let c = 0; c < coins.length; c++) {
     // If the coin is less than or equal to the current amount i
     if (coins[c] <= i) {
       // We can update the minimum number of coins to reach the amount i with the minimum of skipping the coin or adding the coin
       dp[i] = Math.min(dp[i], dp[i - coins[c]] + 1);
     }
   }
 }
 
 // If dp[amount] is greater than amount, it's not possible to reach amount with the given coins so we return -1
 // Otherwise, we return dp[amount] which should be the minimum number of coins needed to reach the amount
 return dp[amount] > amount ? -1 : dp[amount];
};`;

const CoinChange: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/coin-change/</p>
      <p>
        You are given an integer array coins representing coins of different
        denominations and an integer amount representing a total amount of
        money. Return the fewest number of coins that you need to make up that
        amount. If that amount of money cannot be made up by any combination of
        the coins, return -1. You may assume that you have an infinite number of
        each kind of coin.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="coinChangeTopDownMemoized.js" language="javascript">
          {coinChangeTopDownMemoizedCode}
        </Prism.Tab>
        <Prism.Tab label="coinChangeBottomUpDp.js" language="javascript">
          {coinChangeBottomUpDpCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default CoinChange;
