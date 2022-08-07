import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const twoPointersCode = `/**
* @param {number[][]} firstList
* @param {number[][]} secondList
* @return {number[][]}
*/
// O(M + N) time for two pointer approach, O(M + N) space for the answer
var intervalIntersection = function(firstList, secondList) {
 const intersections = [];
 
 let p1 = 0;
 let p2 = 0;
 while (p1 < firstList.length && p2 < secondList.length) {
   const [firstStart, firstEnd] = firstList[p1];
   const [secondStart, secondEnd] = secondList[p2];
   
   // Check if the current pair of intervals intersect
   // For an intersection, the start should be <= end
   // start is max of first and second start
   // end is mind of first and second end
   const intersectionStart = Math.max(firstStart, secondStart);
   const intersectionEnd = Math.min(firstEnd, secondEnd);
   if (intersectionStart <= intersectionEnd) {
     intersections.push([intersectionStart, intersectionEnd]);
   }
   
   // Remove the interval with the smallest endpoint by incrementing one of the pointers forward
   if (firstList[p1][1] < secondList[p2][1]) {
     p1 += 1;
   } else {
     p2 += 1;
   }
 }
 
 return intersections;
};`;

const IntervalListIntersections: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/interval-list-intersections/</p>
      <p>
        You are given two lists of closed intervals, firstList and secondList,
        where firstList[i] = [starti, endi] and secondList[j] = [startj, endj].
        Each list of intervals is pairwise disjoint and in sorted order. Return
        the intersection of these two interval lists. A closed interval [a, b]
        (with a {"<="} b) denotes the set of real numbers x with a {"<="} x{" "}
        {"<="} b. The intersection of two closed intervals is a set of real
        numbers that are either empty or represented as a closed interval. For
        example, the intersection of [1, 3] and [2, 4] is [2, 3].
      </p>
      <Prism.Tabs>
        <Prism.Tab label="twoPointers.js" language="javascript">
          {twoPointersCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default IntervalListIntersections;
