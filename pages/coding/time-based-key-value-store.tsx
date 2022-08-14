import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const hashBinarySearchCode = `
var TimeMap = function() {
  // [key: string]: [{ timestamp: number, value: string }]
  this.map = {};
};

/** 
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 * @return {void}
 */
// O(1) time, O(N) space over time
TimeMap.prototype.set = function(key, value, timestamp) {
  // If the key exists, we add the timestamp and value to the list associated with the key
  if (this.map.hasOwnProperty(key)) {
    this.map[key].push({ timestamp, value });
  } else {
  // Otherwise, we initialize the list associated with the key
    this.map[key] = [{ timestamp, value }];
  }
};

/** 
 * @param {string} key 
 * @param {number} timestamp
 * @return {string}
 */
// O(logK) time, O(1) space
TimeMap.prototype.get = function(key, timestamp) {
  // If the key doesn't exist, we know there is no value so we return ""
  if (!this.map.hasOwnProperty(key)) {
    return "";
  }
  
  // Binary search to find timestampPrev <= timestamp
  let left = 0;
  let right = this.map[key].length - 1;
  let timestampPrev = -1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (this.map[key][mid].timestamp === timestamp) {
      return this.map[key][mid].value;
    } else if (this.map[key][mid].timestamp > timestamp) {
      right = mid - 1;
    } else {
      timestampPrev = left;
      left = mid + 1; 
    }
  }
  
  return timestampPrev !== -1 ? this.map[key][timestampPrev].value : "";
};

/** 
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */`;

const TimeBasedKeyValueStore: NextPage = () => {
  return (
    <div>
      <p>Source: https://leetcode.com/problems/time-based-key-value-store/</p>
      <p>
        Design a time-based key-value data structure that can store multiple
        values for the same key at different time stamps and retrieve the key
        value at a certain timestamp. Implement the TimeMap class: TimeMap()
        Initializes the object of the data structure. void set(String key,
        String value, int timestamp) Stores the key key with the value value at
        the given time timestamp. String get(String key, int timestamp) Returns
        a value such that set was called previously, with timestamp_prev {"<="}{" "}
        timestamp. If there are multiple such values, it returns the value
        associated with the largest timestamp_prev. If there are no values, it
        returns empty string.
      </p>
      <Prism.Tabs>
        <Prism.Tab label="hashBinarySearch.js" language="javascript">
          {hashBinarySearchCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default TimeBasedKeyValueStore;
