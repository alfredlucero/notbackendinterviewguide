import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const curryingCode = `function curry(fn) {
  return curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function innerCurried(...newArgs) {
        return curried(...args, ...newArgs);
      }
    }
  }
}
`;

const curryingWithPlaceholderCode = `function curry(fn) {
  // Return the curried function to then make more calls off of
  return function curried(...args) {
    // Base case: apply the function fully only if the length of args match up with the original function's arg length and there are no placeholders
    const canApplyFully = args.length >= fn.length && !args.slice(0, fn.length).includes(curry.placeholder);
    if (canApplyFully) {
      return fn.apply(this, args);
    }

    // Assuming we have placeholders, we will return another function to fill out the placeholders/apply the rest of the args
    return function placeholderCurried(...newArgs) {
      // Replace the placeholders with the new args from the next call as much as possible
      const replacedArgs = args.map((arg) => {
        if (arg === curry.placeholder && newArgs.length > 0) {
          return newArgs.shift();
        } else {
          return arg;
        }
      });
      
      // Recursively call the func with the replaced args and remaining new args
      return curried.apply(this, replacedArgs.concat(newArgs));
    }
  }
}

curry.placeholder = Symbol()

const  join = (a, b, c) => {
   return \`$\{a}_$\{b}_$\{c}\`
}

const curriedJoin = curry(join)
const _ = curry.placeholder

console.log(curriedJoin(1, 2, 3)); // '1_2_3'

console.log(curriedJoin(_, 2)(1, 3)); // '1_2_3'

console.log(curriedJoin(_, _, _)(1)(_, 3)(2)); // '1_2_3'
`;

const Currying: NextPage = () => {
  return (
    <div>
      <p>Source: https://bigfrontend.dev/problem/implement-curry</p>
      <Prism withLineNumbers language="javascript">
        {curryingCode}
      </Prism>
      <p>
        Source: https://bigfrontend.dev/problem/implement-curry-with-placeholder
      </p>
      <Prism withLineNumbers language="javascript">
        {curryingWithPlaceholderCode}
      </Prism>
    </div>
  );
};

export default Currying;
