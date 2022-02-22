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
];

const Coding: NextPage = () => {
  return (
    <div>
      <h1>Coding</h1>
      <p>See all these frontend coding interview questions and solutions!</p>
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
