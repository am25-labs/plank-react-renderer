import type { NodeComponents } from "./types.js";

export const defaultComponents: Required<NodeComponents> = {
  heading: ({ level, children }) => {
    if (level === 1) return <h1>{children}</h1>;
    if (level === 2) return <h2>{children}</h2>;
    return <h3>{children}</h3>;
  },
  paragraph: ({ children }) => <p>{children}</p>,
  bulletList: ({ children }) => <ul>{children}</ul>,
  orderedList: ({ start, children }) => <ol start={start}>{children}</ol>,
  listItem: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  codeBlock: ({ children }) => (
    <pre>
      <code>{children}</code>
    </pre>
  ),
  link: ({ href, target, rel, title, children }) => (
    <a href={href} target={target ?? undefined} rel={rel ?? undefined} title={title ?? undefined}>
      {children}
    </a>
  ),
  image: ({ src, alt, title, width, height }) => (
    <img
      src={src}
      alt={alt ?? undefined}
      title={title ?? undefined}
      width={width ?? undefined}
      height={height ?? undefined}
    />
  ),
};
