import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const mapCode = `// Map should be able to support
// callback with
// (element) => 
// (element, index) =>
// (element, index, array) =>
// callback and thisArg
Array.prototype.myMap = function(callback, thisArg) {
  const length = this.length;
  const newArr = new Array(length);
  for (let i = 0; i < length; i++) {
    // Handle empty indices i.e. Array(5) -> arr[0] = 1 arr[2] = undefined
    if (i in this) {
      newArr[i] = callback.call(thisArg, this[i], i, this);
    }
  }
  return newArr;
}


console.log([1,2,3].myMap(num => num * 2));
console.log([1,2,3].myMap((num, i) => num + i));

const arr = new Array(5)
arr[0] = 1
arr[2] = undefined
arr[4] = null

const callback = item => item
console.log(arr.myMap(callback));

const arr2 = [1,2,3]
const arr3 = [1,2,3]

const callback2 = (item, i, array) => {
  array[1] = 4
  array[2] = 6
  return item
}
console.log([1,2,3].myMap(callback2))`;

const ArrayMap: NextPage = () => {
  return (
    <div>
      <p>
        Source: https://bigfrontend.dev/problem/implement-Array-prototype-map
      </p>
      <Prism language="javascript">{mapCode}</Prism>
    </div>
  );
};

export default ArrayMap;
