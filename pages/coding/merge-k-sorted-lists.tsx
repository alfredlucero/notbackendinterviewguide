import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const divideAndConquerCode = `/**
* Definition for singly-linked list.
* function ListNode(val, next) {
*     this.val = (val===undefined ? 0 : val)
*     this.next = (next===undefined ? null : next)
* }
*/
/**
* @param {ListNode[]} lists
* @return {ListNode}
*/
// Divide and conquer approach
// O(Nlogk) time, O(1) space
var mergeKLists = function(lists) {
 const numLists = lists.length;
 let interval = 1;
 // Continuously merge two lists at a time (each time we'll merge one new list with the existing merged list)
 while (interval < numLists) {
   for (let i = 0; i < numLists - interval; i += interval * 2) {
       lists[i] = mergeTwoLists(lists[i], lists[i + interval]);
   }
   
   interval *= 2;
 }
 
 if (numLists > 0) {
   return lists[0];
 } else {
   return null;
 }
};

function mergeTwoLists(l1, l2) {
 const dummyNode = new ListNode(0);
 let currentNode = dummyNode;
 
 while (l1 !== null && l2 !== null) {
   if (l1.val <= l2.val) {
     currentNode.next = l1;
     l1 = l1.next;
   } else {
     currentNode.next = l2;
     l2 = l2.next;
   }
   currentNode = currentNode.next;
 }
 
 if (l1 !== null) {
   currentNode.next = l1;
 }
 
 if (l2 !== null) {
   currentNode.next = l2;
 }
 
 return dummyNode.next;
}`;

const MergeKSortedLists: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/merge-k-sorted-lists/</p>
      <p>
        You are given an array of k linked-lists lists, each linked-list is
        sorted in ascending order. Merge all the linked-lists into one sorted
        linked-list and return it.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="divideAndConquer.js" language="javascript">
          {divideAndConquerCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default MergeKSortedLists;
