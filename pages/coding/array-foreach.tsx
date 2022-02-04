import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const forEachCode = `Array.prototype.myForEach = function(callback, thisArg) {
  const length = this.length;
  for (let i = 0; i < length; i++) {
    // Handle empty indices/sparse arrays i.e. Array(5) -> arr[0] = 1 arr[2] = undefined
    if (i in this) {
      callback.call(thisArg, this[i], i, this);
    }
  }
}`;

const ArrayForEach: NextPage = () => {
  return (
    <div>
      <p>Source: foreach source</p>
      <Prism language="javascript">{forEachCode}</Prism>
    </div>
  );
};

export default ArrayForEach;
