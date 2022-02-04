import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const debounceCode = `// debouncing, executes the function if there was no new event in $wait milliseconds
function debounce(func, wait) {
  // Initialize timeout
  let timeout;

  // Return a debounced function
  return function debounced(...args) {
    // Define a later callback that will be called by the setTimeout
    const later = () => {
      // Within the later callback, we must set the timeout to null and call the function passed inside with args
      timeout = null;
      func.apply(this, args);
    }
    
    // If the debounced function is called while there is a setTimeout waiting to be finished, we will clear the existing timeout id
    if (timeout !== null) {
      console.log("Clearing existing timeout!");
      clearTimeout(timeout);
    }
 

    // Assign timeout to setTimeout's timeout id with later callback
    timeout = setTimeout(later, wait);
  }
}

const debouncedFunc = debounce(() => { console.log("Debounced func called once")}, 100);
debouncedFunc();
debouncedFunc();
debouncedFunc();

 debounce: function(func, wait, scope) {
    var timeout;
    return function() {
      var context = scope || this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

debounce(() => { console.log("Debounced func")}, 100);`;

const debounceWithLeadingAndTrailingOptionsCode = `// leading => invoke right away, especially if there is no existing timeout
// trailing => invoke after the delay is over
// if leading=false, trailing= false, nothing happens
function debounce(func, wait, option = {leading: false, trailing: true}) {
  let timeout = null;
  let lastArgs = null;

  return function debounced(...args) {
    // If it's leading and there is no timeout waiting, we call invoke it right away
    if (option.leading && !timeout) {
      func.apply(this, args);
    } else {
      // Otherwise, we keep track of lastArgs for the trailing option
      lastArgs = args;
    }

    const later = () => {
      // After the timeout is over and it's trailing with existing lastArgs, we invoke the function and clear out existing timeout/lastArgs
      if (option.trailing && lastArgs) {
        func.apply(this, lastArgs);
      }
      // Reset timeout and lastArgs for the next time it's called
      timeout = null;
      lastArgs = null;
    }

    clearTimeout(timeout);
    
    timeout = setTimeout(later, wait);
  }
}`;

const Debounce: NextPage = () => {
  return (
    <div>
      <p>Debounce</p>
      <p>Source: https://bigfrontend.dev/problem/implement-basic-debounce</p>
      <Prism language="javascript">{debounceCode}</Prism>

      <p>Debounce with leading and trailing options</p>
      <p>
        Source:
        https://bigfrontend.dev/problem/implement-debounce-with-leading-and-trailing-option
      </p>
      <Prism language="javascript">
        {debounceWithLeadingAndTrailingOptionsCode}
      </Prism>
    </div>
  );
};

export default Debounce;
