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
* @param {ListNode} head
* @return {ListNode}
*/
// O(N) time, O(1) space
var reverseList = function(head) {
 let previous = null;
 let current = head;
 
 // Loop through all nodes in the linked list
 while (current !== null) {
   // Store the current node's next pointer to move onto after we reversed the current node
   const nextTemp = current.next;
   
   // Change current node's next pointer to point to its previous node
   current.next = previous;
   
   // Update the previous node with the current node we flipped
   previous = current;
   
   // Advance current node to the next node in the original list
   current = nextTemp;
 }
 
 // New head reference should be in previous at the end
 return previous;
};`;

const ReverseLinkedList: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/reverse-linked-list/</p>
      <p>
        Given the head of a singly linked list, reverse the list, and return the
        reversed list.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="iterative.js" language="javascript">
          {iterativeCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ReverseLinkedList;
