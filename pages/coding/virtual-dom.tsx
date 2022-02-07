import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const virtualDomICode = `/*
To virtualize means to convert this
<div>
  <h1>hello</h1>there
</div>
to this 
{
  type: 'div',
  props: {
    children: [
      {
        type: 'h1',
        props: {
          children: 'hello'
        }
      },
      'there'
    ]
  }
}
*/
// Recursive approach
// Assume only element nodes and text nodes plus attributes
function virtualize(element) {
// Base Cases:
// If it's a text node -> nodeType === Node.TEXT_NODE or === 3
if (element.nodeType === Node.TEXT_NODE) {
  // Return textContent
  return element.textContent;
// If it's an element node -> nodeType == Node.ELEMENT_NODE or === 1
} else if (element.nodeType === Node.ELEMENT_NODE) {
  const children = [];
  // Recursively push onto children each child node virtualized
  for (let i = 0; i < element.childNodes.length; i++) {
    children.push(virtualize(element.childNodes[i]));
  }
  // Virtualize the attributes of the element i.e. loop through each attribute; rename attributes like class -> className
  const attributes = {};
  for (let { name, value } of element.attributes) {
    attributes[name === "class" ? "className": name] = value;
  }
  // Form the virtualized element
  const virtualizedElement = {
    // element.tagName.toLowerCase() (cause it would return back like DIV)
    type: element.tagName.toLowerCase(),
    props: {
      // Assign virtualized attributes to props
      ...attributes,
      // Assign children to props; if length is 1, children will equal that one child virtualized; otherwise, it will be in an array
      children: children.length === 1 ? children[0]: children
    }
  }
  return virtualizedElement;
}
}

/*
To render a virtualized object means to convert this
{
  type: 'div',
  props: {
    children: [
      {
        type: 'h1',
        props: {
          children: 'hello'
        }
      },
      'there'
    ]
  }
}
to this
<div>
  <h1>hello</h1>there
</div>
*/
// Recursive approach
function render(obj) {
  // Base Cases
  // If the object is a string
  if (typeof obj === 'string') {
    // Convert to textNode
    return document.createTextNode(obj);
  // If the object is an element object
  } else {
    const { type, props: { children, ...attributes } } = obj;
    // Convert to elementNode
    const element = document.createElement(type);
    // Recursively render the children and append all the children to the parent elementNode
    // Children could be a single child or within an array if multiple children, so we normalize it all into an array to loop through
    const currentChildren = Array.isArray(children) ? children : [children];
    currentChildren.forEach((currentChild) => element.append(render(currentChild)));
    
    // Add all the attributes to the parent elementNode
    for (const [name, value] of Object.entries(attributes)) {
      element.setAttribute(name === "className" ? "class" : name, value);
    }
    return element;
  } 
}

const div = document.createElement("div");
const h1 = document.createElement("h1");
h1.append("hello");
div.append(h1);
div.append("there");
console.log("Div to virtualize", div.outerHTML);
console.log("Virtualized div", virtualize(div));
console.log("Rendered", render(virtualize(div)));`;

const virtualDomIICode = `/**
* @param { string } type - valid HTML tag name
* @param { object } [props] - properties.
* @param { ...MyNode} [children] - elements as rest arguments
* @return { MyElement }
*/
function createElement(type, props, ...children) {
 return {
   type,
   props: {
     ...props,
     children,
   }
 };
}


/**
* @param { MyElement }
* @returns { HTMLElement } 
*/
function render(myElement) {
  // Base Cases
  // If the object is a string
  if (typeof myElement === 'string') {
    // Convert to textNode
    return document.createTextNode(myElement);
  // If the object is an element object
  } else {
    const { type, props: { children, ...attributes } } = myElement;
    // Convert to elementNode
    const element = document.createElement(type);
    // Recursively render the children and append all the children to the parent elementNode
    // Children could be a single child or within an array if multiple children, so we normalize it all into an array to loop through
    const currentChildren = Array.isArray(children) ? children : [children];
    currentChildren.forEach((currentChild) => element.append(render(currentChild)));
    
    // Add all the attributes to the parent elementNode
    for (const [name, value] of Object.entries(attributes)) {
      element.setAttribute(name === "className" ? "class" : name, value);
    }
    return element;
  }
}`;

const virtualDomIIICode = `/**
* MyElement is the type your implementation supports
*
* type MyNode = MyElement | string
* type FunctionComponent = (props: object) => MyElement
*/

/**
* @param { string | FunctionComponent } type - valid HTML tag name or Function Component
* @param { object } [props] - properties.
* @param { ...MyNode} [children] - elements as rest arguments
* @return { MyElement }
*/
function createElement(type, props, ...children) {
  // Functional component like const Container = ({ children, ...res }) => h('div', res, ...children)
  // We will call the function and pass through the props and children that will eventually return back the virtualized element
  if (typeof type === "function") {
    return type({ ...props, children })
  }

  // Normal create element without functional components will create the virtualized element with the props/children
  return {
    type, 
    props: {
      ...props,
      children,
    }
  }
}`;

const VirtualDom: NextPage = () => {
  return (
    <div>
      <h2>Virtual DOM I</h2>
      <p>Source: https://bigfrontend.dev/problem/Virtual-DOM-I</p>
      <Prism language="javascript">{virtualDomICode}</Prism>

      <h2>Virtual DOM II</h2>
      <p>
        Source: https://bigfrontend.dev/problem/virtual-dom-II-createElement
      </p>
      <Prism language="javascript">{virtualDomIICode}</Prism>

      <h2>Virtual DOM III</h2>
      <p>
        Source:
        https://bigfrontend.dev/problem/virtual-DOM-III-Functional-Component
      </p>
      <Prism language="javascript">{virtualDomIIICode}</Prism>
    </div>
  );
};

export default VirtualDom;
