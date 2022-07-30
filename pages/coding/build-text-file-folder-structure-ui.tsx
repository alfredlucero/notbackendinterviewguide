import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const recursiveCode = `const buildTreeOutline = (topLevelNodes) => {
  /*
    Built tree will look like this and return the parent div
    <div>
      <span>* folder1/</span>
      <div style="margin-left: 30px;">
        <span>* file1.js</span>
      </div>
      <div style="margin-left: 30px;">
        <span>* file2.js</span>
      </div>
      <div style="margin-left: 30px;">
        <span>* subfolder1/</span>
        <div style="margin-left: 30px;">
          <span>* subfile.png</span>
        </div>
      </div>
    </div>
  */
  const buildTree = (topLevelNode, currentLevel) => {
    const parentContainer = document.createElement("div");

    if (currentLevel > 0) {
      parentContainer.style.marginLeft = "30px";
    }

    const parentName = document.createElement("span");
    parentName.innerText = \`* \${topLevelNode.name}\`;

    parentContainer.appendChild(parentName);

    // Recursively build the children
    const newChildren = topLevelNode.children.map((child) =>
      buildTree(child, currentLevel + 1)
    );

    // For each child, we'll append to the parent container
    if (newChildren.length > 0) {
      newChildren.forEach((newChild) => parentContainer.appendChild(newChild));
    }

    return parentContainer;
  };
  
  // Build each of the top level node trees to append to the body
  topLevelNodes.forEach((topLevelNode) =>
    document.querySelector("body").appendChild(buildTree(topLevelNode, 0))
  );
};

// Simply take in a name and children for a TreeNode
// You could expand this with more properties like folder: boolean
class TreeNode {
  constructor(name, children = []) {
    this.name = name;
    this.children = children;
  }
}

/*
  Tree will look like this
  {
    name: "folder1/",
    children: [
      {
        name: "file1.js",
        children: [],
      },
      {
        name: "file2.js",
        children: [],
      },
      {
        name: "subfolder1/",
        children: [
          {
            name: "file1.png",
            children: []
          }
        ]
      }
    ]
  }
*/
const topLevelNode1 = new TreeNode("folder1/");
topLevelNode1.children.push(new TreeNode("file1.js"));
topLevelNode1.children.push(new TreeNode("file2.js"));
topLevelNode1.children.push(new TreeNode("subfolder1/", [new TreeNode("subfile.png")]));

const topLevelNode2 = new TreeNode("folder2/");
topLevelNode2.children.push(new TreeNode("file3.js"));
topLevelNode2.children.push(new TreeNode("file4.js"));

const topLevelNodes = [topLevelNode1, topLevelNode2];

buildTreeOutline(topLevelNodes);
`;

const BuildTextFileFolderStructureUI: NextPage = () => {
  return (
    <div>
      <p>
        Given a tree representing a file/folder structure like in a code editor
        such as VSCode, render the HTML with simple text based indentations like
        the following
      </p>
      <ul>
        <li>
          folder1/
          <ul>
            <li>file1.js</li>
            <li>file2.js</li>
            <li>
              subfolder1
              <ul>
                <li>subfile1.png</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          folder2/
          <ul>
            <li>file3.js</li>
            <li>file4.js</li>
          </ul>
        </li>
      </ul>
      <p>
        You may define the tree nodes however you like as long as we have at
        least the name of the file/folder and some semblance of children to
        render at another level deeper with proper indentation. Since a root
        directory can have multiple top level folders/nodes you can also decide
        how you want to receive the data initially as well.
      </p>
      <p>See codepen: https://codepen.io/alfinity/pen/JjLMKWo</p>
      <Prism.Tabs>
        <Prism.Tab label="recursive.js" language="javascript">
          {recursiveCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default BuildTextFileFolderStructureUI;
