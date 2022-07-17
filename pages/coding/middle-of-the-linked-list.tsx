import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const twoPassesCode = `/**
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
var middleNode = function(head) {
 // Get the length of the list
 let length = 0;
 let current = head;
 while (current !== null) {
   length++;
   current = current.next;
 }
 
 // Get the middle index (how far we need to go to reach middle node)
 const middle = Math.floor(length / 2) + 1;
 
 // Advance up to the middle node and return the reference to it
 let i = 0;
 current = head;
 while (i < middle - 1) {
   i++;
   current = current.next;
 }
 
 return current;
};`;

const MiddleOfTheLinkedList: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/middle-of-the-linked-list/</p>
      <p>
        Given the head of a singly linked list, return the middle node of the
        linked list. If there are two middle nodes, return the second middle
        node.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="twoPasses.js" language="javascript">
          {twoPassesCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default MiddleOfTheLinkedList;
