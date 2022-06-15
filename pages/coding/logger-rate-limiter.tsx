import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const hashmapCode = `
var Logger = function() {
  // Keep track of message to next valid timestamp map
  this.messageMap = new Map();  
};

/** 
 * @param {number} timestamp 
 * @param {string} message
 * @return {boolean}
 */
// O(1) time, O(N) space
Logger.prototype.shouldPrintMessage = function(timestamp, message) {
  // If the message is not in the map, set the message in the map with the next valid timestamp + 10 and return true
  if (!this.messageMap.has(message)) {
    this.messageMap.set(message, timestamp + 10);
    return true;
  }

  // If the message is in the map and the timestamp is < message's next valid timestamp, return false
  if (timestamp < this.messageMap.get(message)) {
    return false;
  }
  
  // If the message is in the map and the timestamp is >= message's next valid timestamp, set message's next valid timestamp to timestamp + 10 and return true
  this.messageMap.set(message, timestamp + 10);
  return true;
};

/** 
 * Your Logger object will be instantiated and called as such:
 * var obj = new Logger()
 * var param_1 = obj.shouldPrintMessage(timestamp,message)
 */`;

const LoggerRateLimiter: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/logger-rate-limiter/</p>
      <p>
        Design a logger system that receives a stream of messages along with
        their timestamps. Each unique message should only be printed at most
        every 10 seconds (i.e. a message printed at timestamp t will prevent
        other identical messages from being printed until timestamp t + 10). All
        messages will come in chronological order. Several messages may arrive
        at the same timestamp. Implement the Logger class: Logger() Initializes
        the logger object. bool shouldPrintMessage(int timestamp, string
        message) Returns true if the message should be printed in the given
        timestamp, otherwise returns false.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="hashmap.js" language="javascript">
          {hashmapCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default LoggerRateLimiter;
