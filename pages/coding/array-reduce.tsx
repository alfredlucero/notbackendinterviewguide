import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const reduceCode = `// Understand
// different reduce use cases -> returning one value at the end
// arr.reduce((acc, val) => {})
// arr.reduce((acc, val, index) => {})
// arr.reduce((acc, val, index, array) => {})
// arr.reduce((acc, val, index, array) => {}, initialValue)
// arr.reduce(sumFn, 0);
// Edge cases when there is no initialValue, begin with array[0] for result and index starts at 1 for looping
// passing in null or undefined into initialValue
// Typeerror if contains empty array and no initial value
Array.prototype.myReduce = function (callbackFn, ...args) {
  const initialValue = args[0];
  // Throw an error if empty array and no initial value
  if (this.length === 0 && args.length === 0) {
    throw new Error("Empty array and no initial value provided");
  }
  const length = this.length;
  let startIndex = 0;
  result = initialValue;
  // If no initial value provided (can still be null/undefined passed through), startIndex starts at 1 instead and result starts at result[0]
  if (!initialValue && args.length < 1) {
    startIndex = 1;
    result = this[0];
  }

  // Loop through each element in array and apply the reduce function
  for (let i = startIndex; i < length; i++) {
    // (acc, curVal, index, array)
    result = callbackFn(result, this[i], i, this);
  }

  return result;
}

console.log([1,2,3].myReduce((sum, item) => sum + item));
const arr = [1,2,3,4,5,6].reverse()
const reducer = (a, b) => a - b;
console.log(arr.myReduce(reducer));

const arr2 = [1]
const reducer2 = (a, b) => {
  return '' + a + b
}
console.log(arr2.myReduce(reducer2, null))
console.log(arr2.myReduce(reducer2, undefined))

Array.prototype.myReduce = function (...args:any[]) {
  const hasInitialValue = args.length > 1
  if (!hasInitialValue && this.length === 0) {
    throw new Error()
  }

  let result = hasInitialValue ? args[1] : this[0]

  for (let i = hasInitialValue ? 0 : 1;  i < this.length; i++) {
    result = args[0](result, this[i], i, this)
  }

  return result
}`;

const ArrayReduce: NextPage = () => {
  return (
    <div>
      <p>
        Source: https://bigfrontend.dev/problem/implement-Array-prototype-reduce
      </p>
      <Prism language="javascript">{reduceCode}</Prism>
    </div>
  );
};

export default ArrayReduce;
