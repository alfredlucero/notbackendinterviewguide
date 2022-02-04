import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const flatRecursiveCode = `function flat(arr, depth = 1) {
  // Recursively flatten for each depth
  if (depth > 0) {
    return arr.reduce((acc, val) => {
      if (Array.isArray(val)) {
        return [...acc, ...flat(val, depth - 1)];
      } else {
        return [...acc, val];
      }
    }, []);
  // Base case if no more depth to flatten, return the new array
  } else {
    return arr.slice();
  }
}
`;

const flatIterativeStackCode = `function flat(arr, depth = 1) {
  // Iteratively go through it with stack and use an array as a tuple i.e. [val, depth]
  // Initialize stack with array of tuples
  const stack = arr.map((val) => ([val, depth]));
  // Initialize result array to push flattened elements to
  const result = [];
  // While stack is not empty
  while (stack.length > 0) {
    // Pop tuple from stack
    const [val, depth] = stack.pop();
    // if value is an array and its depth is greater than zero
    if (Array.isArray(val) && depth > 0) {
      // push items onto stack
      stack.push(...val.map((ele) => ([ele, depth - 1])));
      console.log("Pushing more items onto stack", stack);
    } else {
      // otherwise push items onto result
      result.push(val);
    }
  }

  console.log("Result", result);
  // return results reversed since stack is FIFO
  return result.reverse();
}`;

const ArrayFlat: NextPage = () => {
  return (
    <div>
      <p>
        Source
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
        https://bigfrontend.dev/problem/implement-Array-prototype.flat
      </p>

      <Prism.Tabs>
        <Prism.Tab label="flatRecursive.js" language="javascript">
          {flatRecursiveCode}
        </Prism.Tab>

        <Prism.Tab label="flatIterative.js" language="javascript">
          {flatIterativeStackCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ArrayFlat;
