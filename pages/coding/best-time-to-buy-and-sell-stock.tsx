import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const linearCode = `/**
* @param {number[]} prices
* @return {number}
*/
// O(N) time, O(1) space
var maxProfit = function(prices) {
 if (prices.length <= 1) {
   return 0;
 }

 let maxProfit = 0;
 let minimumToBuy = Infinity;
 let minimumIndex = 0;
 let maximumToSell = -Infinity;
 
 for (let i = 0; i < prices.length; i++) {
   const price = prices[i];
   
   if (price < minimumToBuy) {
     minimumToBuy = price;
     minimumIndex = i;
     maximumToSell = -Infinity;
   }

   if (i > minimumIndex) {
     maximumToSell = Math.max(price, maximumToSell);
     maxProfit = Math.max(maximumToSell - minimumToBuy, maxProfit);
   }
 }

 return maxProfit;
};`;

const BestTimeToBuyAndSellStock: NextPage = () => {
  return (
    <div>
      <p>https://leetcode.com/problems/best-time-to-buy-and-sell-stock/</p>
      <Prism.Tabs>
        <Prism.Tab label="linear.js" language="javascript">
          {linearCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default BestTimeToBuyAndSellStock;
