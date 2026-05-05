import React from "react";
import { defaultComponents } from "./defaults.js";
import type {
  TiptapDoc,
  TiptapNode,
  TextNode,
  MarkType,
  NodeComponents,
  HeadingLevel,
  ImageNode,
} from "./types.js";

export type { TiptapDoc, TiptapNode, NodeComponents, HeadingLevel, ImageNode };

type Props = {
  content: string | TiptapDoc;
  components?: NodeComponents;
};

function applyMarks(
  text: string,
  marks: MarkType[] = [],
  components: Required<NodeComponents>,
  key: number,
): React.ReactNode {
  return marks.reduce<React.ReactNode>((node, mark) => {
    if (mark.type === "bold") return <strong key={key}>{node}</strong>;
    if (mark.type === "italic") return <em key={key}>{node}</em>;
    if (mark.type === "underline") return <u key={key}>{node}</u>;
    if (mark.type === "strike") return <s key={key}>{node}</s>;
    if (mark.type === "code") return <code key={key}>{node}</code>;
    if (mark.type === "link") {
      return components.link({
        href: mark.attrs.href,
        target: mark.attrs.target,
        rel: mark.attrs.rel,
        title: mark.attrs.title,
        children: node,
      });
    }
    return node;
  }, text);
}

function renderNode(
  node: TiptapNode,
  components: Required<NodeComponents>,
  key: number,
  opts?: { isTopLevel?: boolean; index?: number; total?: number },
): React.ReactNode {
  const isLast =
    opts?.isTopLevel &&
    typeof opts.index === "number" &&
    typeof opts.total === "number" &&
    opts.index === opts.total - 1;
  const isOnly =
    opts?.isTopLevel && typeof opts.total === "number" && opts.total === 1;

  function overrideSpacing(el: React.ReactNode) {
    if (!isLast && !isOnly) return el;
    if (React.isValidElement(el)) {
      const existing = (el.props && el.props.style) || {};
      return React.cloneElement(el, {
        style: { ...existing, marginBottom: 0, paddingBottom: 0 },
      });
    }
    return el;
  }

  if (node.type === "text") {
    const textNode = node as TextNode;
    if (!textNode.marks?.length) return textNode.text;
    return (
      <React.Fragment key={key}>
        {applyMarks(textNode.text, textNode.marks, components, key)}
      </React.Fragment>
    );
  }

  if (node.type === "heading") {
    const children = node.content.map((child, i) =>
      renderNode(child, components, i),
    );
    return (
      <React.Fragment key={key}>
        {overrideSpacing(
          components.heading({
            level: node.attrs.level,
            children,
            isLast,
            isOnly,
          }),
        )}
      </React.Fragment>
    );
  }

  if (node.type === "paragraph") {
    const children = (node.content ?? []).map((child, i) =>
      renderNode(child, components, i),
    );
    return (
      <React.Fragment key={key}>
        {overrideSpacing(components.paragraph({ children, isLast, isOnly }))}
      </React.Fragment>
    );
  }

  if (node.type === "bulletList") {
    const children = node.content.map((child, i) =>
      renderNode(child, components, i),
    );
    return (
      <React.Fragment key={key}>
        {overrideSpacing(components.bulletList({ children, isLast, isOnly }))}
      </React.Fragment>
    );
  }

  if (node.type === "orderedList") {
    const start = node.attrs?.start ?? 1;
    const children = node.content.map((child, i) =>
      renderNode(child, components, i),
    );
    return (
      <React.Fragment key={key}>
        {overrideSpacing(
          components.orderedList({ start, children, isLast, isOnly }),
        )}
      </React.Fragment>
    );
  }

  if (node.type === "listItem") {
    const children = node.content.map((child, i) =>
      renderNode(child, components, i),
    );
    return (
      <React.Fragment key={key}>
        {overrideSpacing(components.listItem({ children, isLast, isOnly }))}
      </React.Fragment>
    );
  }

  if (node.type === "blockquote") {
    const children = node.content.map((child, i) =>
      renderNode(child, components, i),
    );
    return (
      <React.Fragment key={key}>
        {overrideSpacing(components.blockquote({ children, isLast, isOnly }))}
      </React.Fragment>
    );
  }

  if (node.type === "codeBlock") {
    const text = node.content.map((c) => c.text).join("");
    const language = node.attrs?.language ?? null;
    return (
      <React.Fragment key={key}>
        {overrideSpacing(
          components.codeBlock({ language, children: text, isLast, isOnly }),
        )}
      </React.Fragment>
    );
  }

  if (node.type === "image") {
    const n = node as ImageNode;
    return (
      <React.Fragment key={key}>
        {overrideSpacing(
          components.image({
            src: n.attrs.src,
            alt: n.attrs.alt,
            title: n.attrs.title,
            width: n.attrs.width,
            height: n.attrs.height,
            isLast,
            isOnly,
          }),
        )}
      </React.Fragment>
    );
  }

  return null;
}

export function PlankRenderer({ content, components }: Props) {
  const doc: TiptapDoc =
    typeof content === "string" ? JSON.parse(content) : content;

  const resolved: Required<NodeComponents> = {
    ...defaultComponents,
    ...components,
  };

  return (
    <div className="plank-renderer">
      {doc.content.map((node, i) =>
        renderNode(node, resolved, i, {
          isTopLevel: true,
          index: i,
          total: doc.content.length,
        }),
      )}
    </div>
  );
}
