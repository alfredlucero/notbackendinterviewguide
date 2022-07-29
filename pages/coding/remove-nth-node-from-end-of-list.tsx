import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const twoPointersRulerCode = `/**
* Definition for singly-linked list.
* function ListNode(val, next) {
*     this.val = (val===undefined ? 0 : val)
*     this.next = (next===undefined ? null : next)
* }
*/
/**
* @param {ListNode} head
* @param {number} n
* @return {ListNode}
*/
// Two pointers ruler approach
// O(N) time, O(1) space
var removeNthFromEnd = function(head, n) {
 const dummyNode = new ListNode(0);
 dummyNode.next = head;
 let first = dummyNode;
 let second = dummyNode;
 
 // Advance the first pointer so that the gap between first and second is n nodes apart
 for (let i = 0; i <= n; i++) {
   first = first.next;
 }
 
 // Move first to the end while maintaining the gap
 while (first !== null) {
   first = first.next;
   second = second.next
 }
 
 // Remove the nth node from the end
 second.next = second.next.next;
 
 // Return the head after removing the node
 return dummyNode.next;
};`;

const RemoveNthNodeFromEndOfList: NextPage = () => {
  return (
    <div>
      <p>
        Source: https://leetcode.com/problems/remove-nth-node-from-end-of-list/
      </p>
      <p>
        Given the head of a linked list, remove the nth node from the end of the
        list and return its head.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="twoPointersRuler.js" language="javascript">
          {twoPointersRulerCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default RemoveNthNodeFromEndOfList;
