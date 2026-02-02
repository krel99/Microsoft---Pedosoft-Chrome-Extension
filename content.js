const REPLACEMENTS = [
  {
    pattern: /microsoft/gi,
    replacement: "microslop",
  },
];

const shouldSkipNode = (node) => {
  const parent = node.parentNode;
  if (!parent || parent.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  const tag = parent.tagName;
  return tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT";
};

const replaceTextInNode = (node) => {
  if (node.nodeType !== Node.TEXT_NODE || shouldSkipNode(node)) {
    return;
  }
  let text = node.nodeValue;
  if (!text) {
    return;
  }
  REPLACEMENTS.forEach(({ pattern, replacement }) => {
    text = text.replace(pattern, replacement);
  });
  if (text !== node.nodeValue) {
    node.nodeValue = text;
  }
};

const walkTextNodes = (root) => {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    null,
  );
  let current = walker.nextNode();
  while (current) {
    replaceTextInNode(current);
    current = walker.nextNode();
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => walkTextNodes(document.body));
} else {
  walkTextNodes(document.body);
}
