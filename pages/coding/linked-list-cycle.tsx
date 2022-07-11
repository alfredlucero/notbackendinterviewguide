import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const floydCycleCode = `/**
* Definition for singly-linked list.
* function ListNode(val) {
*     this.val = val;
*     this.next = null;
* }
*/

/**
* @param {ListNode} head
* @return {boolean}
*/
// O(N) time, O(1) space
var hasCycle = function(head) {
 // Tortoise and hare approach aka Floyd's Cycle Finding Algorithm
 // Two pointers: one fast (hare) going two steps at a time and one slow (tortoise) going one step at a time
 // If there is a cycle, eventually they will intersect
 // If there is no cycle, we'll hit null
 if (head === null) {
   return false;
 }
 
 let hare = head.next;
 let tortoise = head;
 while (hare !== null && hare.next !== null && tortoise !== null) {
   if (hare === tortoise) {
     return true;
   }
   tortoise = tortoise.next;
   hare = hare.next.next;
 }
 
 return false;
};`;

const LinkedListCycle: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/linked-list-cycle/</p>
      <p>
        Given head, the head of a linked list, determine if the linked list has
        a cycle in it. There is a cycle in a linked list if there is some node
        in the list that can be reached again by continuously following the next
        pointer. Internally, pos is used to denote the index of the node that
        tail next pointer is connected to. Note that pos is not passed as a
        parameter. Return true if there is a cycle in the linked list.
        Otherwise, return false.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="floydCycle.js" language="javascript">
          {floydCycleCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default LinkedListCycle;
