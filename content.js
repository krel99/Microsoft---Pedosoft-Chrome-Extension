const REPLACEMENTS = [
  {
    pattern: /Bill Gates/gi,
    replacement: "Pet Ofill",
  },
  {
    pattern: /Azure Cloud/gi,
    replacement: "Pedo Island",
  },
  {
    pattern: /Azure/gi,
    replacement: "Pedo",
  },
  {
    pattern: /Windows/gi,
    replacement: "Pedovs",
  },
  {
    pattern: /Microsoft 365/gi,
    replacement: "Pedosoft 18.3009°N 64.8250°W",
  },
  {
    pattern: /microsoft/gi,
    replacement: "pedosoft",
  },
];

function shouldSkipNode(node) {
  let el = node.parentElement;
  while (el) {
    const tag = el.tagName;
    // skip rendera elements!
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return true;

    // skip usr inputz
    if (tag === "TEXTAREA" || tag === "INPUT" || tag === "SELECT" || tag === "OPTION" || el.isContentEditable) return true;

    el = el.parentElement;
  }
  return false;
}

function applyCapitalization(original, replacement) {
  // ALL CAP
  if (original === original.toUpperCase()) {
    return replacement.toUpperCase();
  }
  // First letter
  if (original.charAt(0) === original.charAt(0).toUpperCase()) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  }
  // All lowercase or mixed
  return replacement.toLowerCase();
}

function replaceTextInNode(node) {
  if (node.nodeType !== Node.TEXT_NODE || shouldSkipNode(node)) {
    return;
  }
  let text = node.nodeValue;
  if (!text) {
    return;
  }

  REPLACEMENTS.forEach(({ pattern, replacement }) => {
    text = text.replace(pattern, (match) => applyCapitalization(match, replacement));
  });

  if (text !== node.nodeValue) {
    node.nodeValue = text;
  }
}

function walkTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  let current = walker.nextNode();
  while (current) {
    replaceTextInNode(current);
    current = walker.nextNode();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => walkTextNodes(document.body));
} else {
  walkTextNodes(document.body);
}
