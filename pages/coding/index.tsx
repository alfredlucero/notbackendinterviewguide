import type { NextPage } from "next";
import { List } from "@mantine/core";
import { Link } from "../../components/Link";

interface CodingLink {
  href: string;
  title: string;
}

const codingLinkBaseHref = "/coding";
const codingLinks: CodingLink[] = [
  {
    href: "/two-sum",
    title: "Two Sum",
  },
  {
    href: "/valid-parentheses",
    title: "Valid Parentheses",
  },
  {
    href: "/merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
  },
  {
    href: "/best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
  },
  {
    href: "/valid-palindrome",
    title: "Valid Palindrome",
  },
  {
    href: "/valid-anagram",
    title: "Valid Anagram",
  },
  {
    href: "/3sum",
    title: "3Sum",
  },
  {
    href: "/random-pick-with-weight",
    title: "Random Pick with Weight",
  },
  {
    href: "/text-justification",
    title: "Text Justification",
  },
  {
    href: "/container-with-most-water",
    title: "Container With Most Water",
  },
  {
    href: "/sliding-window-maximum",
    title: "Sliding Window Maximum",
  },
  {
    href: "/flood-fill",
    title: "Flood Fill",
  },
  {
    href: "/linked-list-cycle",
    title: "Linked List Cycle",
  },
  {
    href: "/minimum-window-substring",
    title: "Minimum Window Substring",
  },
  {
    href: "/longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
  },
  {
    href: "/reverse-linked-list",
    title: "Reverse Linked List",
  },
  {
    href: "/middle-of-the-linked-list",
    title: "Middle of the Linked List",
  },
  {
    href: "/array-flat",
    title: "Array.prototype.flat()",
  },
  {
    href: "/array-foreach",
    title: "Array.prototype.forEach()",
  },
  {
    href: "/array-map",
    title: "Array.prototype.map()",
  },
  {
    href: "/array-reduce",
    title: "Array.prototype.reduce()",
  },
  {
    href: "/convert-hex-color-to-rgba",
    title: "Convert Hex Color to RGBA",
  },
  {
    href: "/currying",
    title: "Currying",
  },
  {
    href: "/debounce",
    title: "Debounce",
  },
  {
    href: "/event-emitter",
    title: "Event Emitter",
  },
  {
    href: "/find-next-right-sibling",
    title: "Find Next Right Sibling",
  },
  {
    href: "/invert-binary-tree",
    title: "Invert Binary Tree",
  },
  {
    href: "/previous-left-sibling",
    title: "Previous Left Sibling",
  },
  {
    href: "/roman-numerals-to-integer",
    title: "Roman Numerals to Integer",
  },
  {
    href: "/serialize-and-deserialize-binary-tree",
    title: "Serialize and Deserialize Binary Tree",
  },
  {
    href: "/throttle",
    title: "Throttle",
  },
  {
    href: "/traverse-dom-level-by-level",
    title: "Traverse DOM Level by Level (Flatten)",
  },
  {
    href: "/virtual-dom",
    title: "Virtual DOM",
  },
  {
    href: "/remove-k-digits",
    title: "Remove K Digits",
  },
  {
    href: "/contains-duplicate",
    title: "Contains Duplicate",
  },
  {
    href: "/missing-number",
    title: "Missing Number",
  },
  {
    href: "/find-all-numbers-disappeared-in-an-array",
    title: "Find All Numbers Disappeared in an Array",
  },
  {
    href: "/single-number",
    title: "Single Number",
  },
  {
    href: "/convert-1d-array-into-2d-array",
    title: "Convert 1D Array into 2D Array",
  },
  {
    href: "/product-of-array-except-self",
    title: "Product of Array Except Self",
  },
  {
    href: "/find-the-duplicate-number",
    title: "Find the Duplicate Number",
  },
  {
    href: "/find-all-duplicates-in-an-array",
    title: "Find All Duplicates in an Array",
  },
  {
    href: "/set-matrix-zeroes",
    title: "Set Matrix Zeroes",
  },
  {
    href: "/spiral-matrix",
    title: "Spiral Matrix",
  },
  {
    href: "/data-fetching-histogram",
    title: "Data Fetching Histogram",
  },
  {
    href: "/rotate-image",
    title: "Rotate Image",
  },
  {
    href: "/longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
  },
  {
    href: "/first-missing-positive",
    title: "First Missing Positive",
  },
  {
    href: "/climbing-stairs",
    title: "Climbing Stairs",
  },
  {
    href: "/maximum-subarray",
    title: "Maximum Subarray",
  },
  {
    href: "/range-sum-query-immutable",
    title: "Range Sum Query - Immutable",
  },
  {
    href: "/counting-bits",
    title: "Counting Bits",
  },
  {
    href: "/image-carousel",
    title: "Image Carousel",
  },
  {
    href: "/snake",
    title: "Snake",
  },
  {
    href: "/modal-overlay",
    title: "Modal Overlay",
  },
  {
    href: "/target-sum",
    title: "Target Sum",
  },
  {
    href: "/house-robber",
    title: "House Robber",
  },
  {
    href: "/mortgage-calculator",
    title: "Mortgage Calculator",
  },
  {
    href: "/trapping-rain-water",
    title: "Trapping Rain Water",
  },
  {
    href: "/coin-change",
    title: "Coin Change",
  },
  {
    href: "/maximum-product-subarray",
    title: "Maximum Product Subarray",
  },
  {
    href: "/longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
  },
  {
    href: "/longest-palindromic-substring",
    title: "Longest Palindromic Substring",
  },
  {
    href: "/word-break",
    title: "Word Break",
  },
  {
    href: "/combination-sum-iv",
    title: "Combination Sum IV",
  },
  {
    href: "/decode-ways",
    title: "Decode Ways",
  },
  {
    href: "/unique-paths",
    title: "Unique Paths",
  },
  {
    href: "/number-of-longest-increasing-subsequence",
    title: "Number of Longest Increasing Subsequence",
  },
  {
    href: "/palindromic-substrings",
    title: "Palindromic Substrings",
  },
  {
    href: "/jump-game",
    title: "Jump Game",
  },
  {
    href: "/partition-equal-subset-sum",
    title: "Partition Equal Subset Sum",
  },
  {
    href: "/partition-to-k-equal-sum-subsets",
    title: "Partition to K Equal Sum Subsets",
  },
  {
    href: "/binary-search",
    title: "Binary Search",
  },
  {
    href: "/sqrtx",
    title: "sqrt(x)",
  },
  {
    href: "/peak-index-in-a-mountain-array",
    title: "Peak Index in a Mountain Array",
  },
  {
    href: "/find-peak-element",
    title: "Find Peak Element",
  },
  {
    href: "/find-minimum-in-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
  },
  {
    href: "/search-a-2d-matrix",
    title: "Search a 2D Matrix",
  },
  {
    href: "/maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
  },
  {
    href: "/same-tree",
    title: "Same Tree",
  },
  {
    href: "/diameter-of-binary-tree",
    title: "Diameter of Binary Tree",
  },
  {
    href: "/lowest-common-ancestor-of-a-binary-search-tree",
    title: "Lowest Common Ancestor of a Binary Search Tree",
  },
  {
    href: "/lowest-common-ancestor-of-a-binary-tree",
    title: "Lowest Common Ancestor of a Binary Tree",
  },
  {
    href: "/balanced-binary-tree",
    title: "Balanced Binary Tree",
  },
  {
    href: "/longest-substring-with-at-most-two-distinct-characters",
    title: "Longest Substring with at Most Two Distinct Characters",
  },
  {
    href: "/validate-binary-search-tree",
    title: "Validate Binary Search Tree",
  },
  {
    href: "/insert-into-a-binary-search-tree",
    title: "Insert into a Binary Search Tree",
  },
  {
    href: "/permutations",
    title: "Permutations",
  },
  {
    href: "/path-sum",
    title: "Path Sum",
  },
  {
    href: "/path-sum-ii",
    title: "Path Sum II",
  },
  {
    href: "/path-sum-iii",
    title: "Path Sum III",
  },
  {
    href: "/course-schedule",
    title: "Course Schedule",
  },
  {
    href: "/course-schedule-ii",
    title: "Course Schedule II",
  },
  {
    href: "/clone-graph",
    title: "Clone Graph",
  },
  {
    href: "/pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
  },
  {
    href: "/graph-valid-tree",
    title: "Graph Valid Tree",
  },
  {
    href: "/word-search",
    title: "Word Search",
  },
  {
    href: "/word-search-ii",
    title: "Word Search II",
  },
  {
    href: "/implement-trie-prefix-tree",
    title: "Implement Trie Prefix Tree",
  },
  {
    href: "/design-search-autocomplete-system",
    title: "Design Search Autocomplete System",
  },
  {
    href: "/reverse-polish-notation",
    title: "Reverse Polish Notation",
  },
  {
    href: "/letter-combinations-of-a-phone-number",
    title: "Letter Combinations of a Phone Number",
  },
  {
    href: "/maximum-width-of-binary-tree",
    title: "Maximum Width of Binary Tree",
  },
  {
    href: "/binary-tree-maximum-path-sum",
    title: "Binary Tree Maximum Path Sum",
  },
  {
    href: "/subsets",
    title: "Subsets",
  },
  {
    href: "/find-leaves-of-binary-tree",
    title: "Find Leaves of Binary Tree",
  },
  {
    href: "/find-duplicate-subtrees",
    title: "Find Duplicate Subtrees",
  },
  {
    href: "/combinations",
    title: "Combinations",
  },
  {
    href: "/combination-sum",
    title: "Combination Sum",
  },
  {
    href: "/combination-sum-ii",
    title: "Combination Sum II",
  },
  {
    href: "/combination-sum-iii",
    title: "Combination Sum III",
  },
  {
    href: "/palindrome-partitioning",
    title: "Palindrome Partitioning",
  },
  {
    href: "/strobogrammatic-number-ii",
    title: "Strobogrammatic Number II",
  },
  {
    href: "/generate-parentheses",
    title: "Generate Parentheses",
  },
  {
    href: "/generalized-abbreviation",
    title: "Generalized Abbreviation",
  },
  {
    href: "/sudoku-solver",
    title: "Sudoku Solver",
  },
];

const Coding: NextPage = () => {
  return (
    <div>
      <h1>Coding</h1>
      <p>See all these frontend coding interview questions and solutions!</p>
      <p>Total: {codingLinks.length}</p>
      <List size="lg" withPadding>
        {codingLinks.map((codingLink, key) => (
          <List.Item key={key}>
            <Link href={`${codingLinkBaseHref}${codingLink.href}`}>
              {codingLink.title}
            </Link>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default Coding;
