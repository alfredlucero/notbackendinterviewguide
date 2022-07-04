import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const iterativeCode = `/**
* Definition for singly-linked list.
* function ListNode(val, next) {
*     this.val = (val===undefined ? 0 : val)
*     this.next = (next===undefined ? null : next)
* }
*/
/**
* @param {ListNode} list1
* @param {ListNode} list2
* @return {ListNode}
*/
// O(N + M) time, O(1) space
var mergeTwoLists = function(list1, list2) {
 // Handle edge cases where one or the other list is null
 if (list1 === null && list2 === null) {
   return null;
 }
 if (list1 === null && list2 !== null) {
   return list2;
 }
 if (list1 !== null && list2 === null) {
   return list1;
 }

 const dummyNode = new ListNode(0, null);
 let currentNode = dummyNode;
 let l1 = list1;
 let l2 = list2;
 
 while (l1 !== null && l2 !== null) {
   // If l1 is less than or equal to l2, the next node should come from l1 and we move l1 forward
   if (l1.val <= l2.val) {
     currentNode.next = l1;
     l1 = l1.next;
   } else {
   // Otherwise, it will come from l2 and we move l2 forward
     currentNode.next = l2;
     l2 = l2.next;
   }

   // Move the current node forward to overwrite the next node's link
   currentNode = currentNode.next;
 }

 // If we still have values of l1 to go through, append to final result
 if (l1 !== null) {
   currentNode.next = l1;
 }

 // If we still have values of l2 to go through, append to final result
 if (l2 !== null) {
   currentNode.next = l2;
 }

 return dummyNode.next;
};`;

const MergeTwoSortedLists: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/merge-two-sorted-lists/</p>
      <p>
        You are given the heads of two sorted linked lists list1 and list2.
        Merge the two lists in a one sorted list. The list should be made by
        splicing together the nodes of the first two lists. Return the head of
        the merged linked list.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="iterative.js" language="javascript">
          {iterativeCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default MergeTwoSortedLists;
