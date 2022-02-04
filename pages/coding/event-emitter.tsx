import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const eventEmitterCode = `// Subscribe -> needs to return a release function so subscriber no longer receives event
// Thinking of a map of eventName: -> callbackArray so we can have multiple subscribers to the same event
// Emit -> lookup the event name in the map -> loop through callbackArray and relay args to each callback call
// Release -> need to remove the subscriber from the event's callbackArray
class EventEmitter {
  constructor() {
    // Initialize an event -> callbackArray map
    this.eventMap = {};
  }

  subscribe(eventName, callback) {
    // We wrap the callback in another function that returns the callback so we have a new reference that will help us with filtering the proper subscription in the release function
    // even if there are multiple subscriptions using the same callback1 for example
    const subscribedCallback = () => callback;
    // If there is an existing eventName to subscribe to, push the callback onto the array
    if (this.eventMap[eventName]) {
      this.eventMap[eventName].push(subscribedCallback);
    } else {
      // Otherwise, we initialize it with a new array with the 1 callback inside
      this.eventMap[eventName] = [subscribedCallback];
    }

    // Need to return an object with a release function that will remove the callback from the event's array
    // We have closure around the subscribedCallback reference so we can filter out the exact subscription later
    const self = this;
    return {
      release: function release() {
        if (self.eventMap[eventName]) {
          // Remove the subscribedCallback from the event's callback array
          self.eventMap[eventName] = self.eventMap[eventName].filter((currentCallback) => subscribedCallback !== currentCallback);

          // If there are no more callbacks subscribed to the event, we can remove the event from the map
          if (self.eventMap[eventName].length === 0) {
            delete self.eventMap[eventName];
          }
        }
      }
    }
  }
  
  emit(eventName, ...args) {
    // If the event doesn't exist in the map, do nothing
  	if (!this.eventMap[eventName]) {
      return;
    }

    // Otherwise, we will loop through the event's callback array and apply the callbacks with relayed args
    this.eventMap[eventName].forEach((subscribedCallback) => {
      const currentCallback = subscribedCallback();
      currentCallback.apply(this, args);
    });
  }
}

const emitter = new EventEmitter();

const callback1 = (...args) => { console.log(\`Callback 1 $\{args\}\`); };
const callback2 = () => { console.log("Callback2"); };
const sub1 = emitter.subscribe('event1', callback1);
const sub2 = emitter.subscribe('event2', callback2);

emitter.emit("event1", 1, 2);
emitter.emit("event2");

// same callback could subscribe 
// on same event multiple times
const sub3 = emitter.subscribe('event1', callback1);

emitter.emit("event1", 1,2,3);

console.log("Releasing sub1");
sub1.release();
emitter.emit("event1", 4, 5);
console.log("Releasing sub3");
sub3.release();
emitter.emit("event1", 5, 6);
console.log("Releasing sub2");
sub2.release();
emitter.emit("event2");
`;

const EventEmitter: NextPage = () => {
  return (
    <div>
      <Prism withLineNumbers language="javascript">
        {eventEmitterCode}
      </Prism>
    </div>
  );
};

export default EventEmitter;
