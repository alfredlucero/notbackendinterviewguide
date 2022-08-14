import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const dfsCode = `/**
* @param {string[][]} accounts
* @return {string[][]}
*/
// O(NKlogNK) time, O(NK) space
var accountsMerge = function(accounts) {
 const visited = new Set(); // set of visited emails
 const adjList = new Map(); // email to list of emails connected under one account
 
 // Build adjacency list
 // Add edge between first email to all other emails in the account
 for (let i = 0; i < accounts.length; i++) {
   const account = accounts[i];
   const accountSize = account.length;
   
   const accountFirstEmail = account[1];
   if (!adjList.has(accountFirstEmail)) {
     adjList.set(accountFirstEmail, []);
   }
   for (let j = 2; j < accountSize; j++) {
     const currentEmail = account[j];
     adjList.get(accountFirstEmail).push(currentEmail);
     if (adjList.has(currentEmail)) {
       adjList.get(currentEmail).push(accountFirstEmail);
     } else {
       adjList.set(currentEmail, [accountFirstEmail]);
     }
   }
 };
 
 // DFS to traverse all emails for a connected component and add to merged account
 const dfs = (mergedAccount, email) => {
   visited.add(email);
   
   // Add the email to the list that contains the current component's emails
   mergedAccount.push(email);
   
   const neighborEmails = adjList.get(email);
   for (let i = 0; i < neighborEmails.length; i++) {
     const neighborEmail = neighborEmails[i];
     if (!visited.has(neighborEmail)) {
       dfs(mergedAccount, neighborEmail);
     }
   }
 };
 
 // Traverse over all the accounts to store components
 const mergedAccounts = [];
 for (let i = 0; i < accounts.length; i++) {
   const account = accounts[i];
   const accountName = account[0];
   const accountFirstEmail = account[1];
   
   // If email is visited, then it's part of a different component
   // Perform DFS only if email is not visited yet
   if (!visited.has(accountFirstEmail)) {
     
     const mergedAccount = [];
     // Get all the emails for the account through DFS and sort
     dfs(mergedAccount, accountFirstEmail);
     mergedAccount.sort();
     
     // Make sure to add the account name at the beginning
     mergedAccounts.push([accountName, ...mergedAccount]);
   }
 }
 
 return mergedAccounts;
};`;

const AccountsMerge: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/accounts-merge/</p>
      <p>
        Given a list of accounts where each element accounts[i] is a list of
        strings, where the first element accounts[i][0] is a name, and the rest
        of the elements are emails representing emails of the account. Now, we
        would like to merge these accounts. Two accounts definitely belong to
        the same person if there is some common email to both accounts. Note
        that even if two accounts have the same name, they may belong to
        different people as people could have the same name. A person can have
        any number of accounts initially, but all of their accounts definitely
        have the same name. After merging the accounts, return the accounts in
        the following format: the first element of each account is the name, and
        the rest of the elements are emails in sorted order. The accounts
        themselves can be returned in any order.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="dfs.js" language="javascript">
          {dfsCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default AccountsMerge;
