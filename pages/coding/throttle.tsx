import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const throttleCode = `// In case of a "storm of events", this executes once every $threshold
// For throttle, we will call the function at most once every wait 
function throttle(func, wait) {
  // Initialize a timer and keep track of lastArgs
  let timeout = null;
  let lastArgs = null;
  
  // Return a throttled function
  return function throttled(...args) {
    // If there is no existing timer, we will call the func already
    if (!timeout) {
      func.apply(this, args);
    } else {
      // Otherwise, we set the lastArgs for when the cooldown is over
      lastArgs = args;
    }

    // In a later function
    const later = () => {
      // If there are lastArgs, we will call the func, reset last args, and start the cooldown timer again
      if (lastArgs) {
        func.apply(this, lastArgs);
        lastArgs = null;
        timeout = setTimeout(later, wait)
      } else {
        // Otherwise, reset the timeout
        timeout = null;
      }
      
    }

    // Assign timeout to setTimeout if there is no timeout
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
  }
}

const throttledFunc = throttle((message) => { console.log(\`Throttled $\{message\}\`) }, 100);
throttledFunc("1");
throttledFunc("2");
throttledFunc("3");
// Should be Throttled 1 (from first call) Throttled 3 (from last call)`;

const throttleWithLeadingAndTrailingOptionsCode = `// leading=true means to invoke right away
// trailing= true means to invoke after the delay
// leading=true,trailing=true is basic throttle
// leading=false,trailing=false means to do nothing
function throttle(func, wait, option = {leading: true, trailing: true}) {
  // Initialize a timer and keep track of lastArgs
  let timeout = null;
  let lastArgs = null;
  
  // Return a throttled function
  return function throttled(...args) {
    // If there is no existing timer and it's leading, we will call the func already
    if (!timeout && option.leading) {
      func.apply(this, args);
    } else {
      // Otherwise, we set the lastArgs for when the cooldown is over
      lastArgs = args;
    }

    // In a later function
    const later = () => {
      // If there are lastArgs and it's trailing, we will call the func, reset last args, and start the cooldown timer again
      if (lastArgs && option.trailing) {
        func.apply(this, lastArgs);
        lastArgs = null;
        timeout = setTimeout(later, wait)
      } else {
        // Otherwise, reset the timeout
        timeout = null;
      }
      
    }
    
    // Assign timeout to setTimeout if there is no timeout
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
  }
}`;

const Throttle: NextPage = () => {
  return (
    <div>
      <p>Throttle</p>
      <p>Source: https://bigfrontend.dev/problem/implement-basic-throttle</p>
      <Prism language="javascript">{throttleCode}</Prism>

      <p>Throttle with leading and trailing options</p>
      <p>
        Source:
        https://bigfrontend.dev/problem/implement-throttle-with-leading-and-trailing-option
      </p>
      <Prism language="javascript">
        {throttleWithLeadingAndTrailingOptionsCode}
      </Prism>
    </div>
  );
};

export default Throttle;
