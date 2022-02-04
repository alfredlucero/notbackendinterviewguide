import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const convertHexColorToRgbaCode = `// Cases for Hexadecimal (base16)
// Validation: hexadecimal must start with # and include numbers 0-9, letters a-f
// #fff (length 4) -> 3 characters expand to #ff ff ff; need to add a = ff
// #0001 (length 5) -> 3 characters expand to #00 00 00 11
// #ffffff (length 7) -> 6 characters; need to add a = ff
// #ffffffff (length 9) -> 8 characters; nothing needed to add
// Once we normalize the hex string to 8 characters, we pull out the r,g,b,a values i.e. r = ff, g = ff, b = ff, a = ff
// Convert r,g,b by parsing int value from the letters with base 16
// Convert a to a float i.e. 0.80 by extracting the int value and dividing by 255 and say round to 2 decimal places
// Form the string like rgba($\{r\},$\{g\},$\{b\},$\{a\})
function hexToRgba(hex) {
  const validHexLengths = [4,5,7,9];
  const validHexRegex = /#[a-fA-F0-9]+$/;
  // Validate hex string to have proper length and regex match i.e. #[a-fA-F0-9]+
  if (!validHexLengths.includes(hex.length) || !validHexRegex.test(hex)) {
    throw new Error("Invalid hex format!");
  }

  let r,g,b,a;
  // Parse the hex without the #
  const parsedHex = hex.slice(1);

  // Normalize and parse out the rgba values
  // Handle fff case when length = 3 -> need to double up the letters i.e. f -> ff and default a = ff
  if (parsedHex.length === 3) {
    [r,g,b,a = "ff"] = [parsedHex.slice(0,1).repeat(2), parsedHex.slice(1,2).repeat(2), parsedHex.slice(2).repeat(2)];
  }

  // Handle ffff case when length = 4 -> need to double up the letters
  if (parsedHex.length === 4) {
    [r,g,b = "00",a = "ff"] = [parsedHex.slice(0,1).repeat(2), parsedHex.slice(1,2).repeat(2), parsedHex.slice(2,3).repeat(2), parsedHex.slice(3).repeat(2)];
  }

  // Handle ffffff case when length = 6 -> need to default a = ff
  if (parsedHex.length === 6) {
    [r,g,b,a = "ff"] = [parsedHex.slice(0,2), parsedHex.slice(2,4), parsedHex.slice(4)];
  }

  // Handle fffffff case when length = 8 -> need to extract out rgba
  if (parsedHex.length === 8) {
    [r,g,b,a] = [parsedHex.slice(0,2), parsedHex.slice(2,4), parsedHex.slice(4,6), parsedHex.slice(6)];
  }

  // Parse number from hex rgba values
  const parsedR = parseInt(r, 16);
  const parsedG = parseInt(g, 16);
  const parsedB = parseInt(b, 16);
  const parsedA = parseFloat((parseInt(a, 16) / 255).toFixed(2));

  // Form and return the rgba string
  return \`rgba($\{parsedR\},$\{parsedG\},$\{parsedB\},$\{parsedA\})\`;
}

console.log(hexToRgba("#fff"));
console.log(hexToRgba("#ffff"));
console.log(hexToRgba("#ffffff"));
console.log(hexToRgba("#efefefef"));`;

const ConvertHexColorToRgba: NextPage = () => {
  return (
    <div>
      <p>Source: https://bigfrontend.dev/problem/convert-HEX-color-to-RGBA</p>
      <Prism language="javascript">{convertHexColorToRgbaCode}</Prism>
    </div>
  );
};

export default ConvertHexColorToRgba;
