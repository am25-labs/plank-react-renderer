import type { NodeComponents } from "./types.js";

const headingStyles: Record<number, React.CSSProperties> = {
  1: { fontSize: "2em", fontWeight: 700, margin: "1.5rem 0 0.75rem" },
  2: { fontSize: "1.5em", fontWeight: 700, margin: "1.5rem 0 0.75rem" },
  3: { fontSize: "1.25em", fontWeight: 600, margin: "1.5rem 0 0.75rem" },
};

export const defaultComponents: Required<NodeComponents> = {
  heading: ({ level, children }) => {
    const style = headingStyles[level] ?? headingStyles[3];
    if (level === 1) return <h1 style={style}>{children}</h1>;
    if (level === 2) return <h2 style={style}>{children}</h2>;
    return <h3 style={style}>{children}</h3>;
  },
  paragraph: ({ children }) => (
    <p style={{ marginBottom: "1rem" }}>{children}</p>
  ),
  bulletList: ({ children }) => (
    <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
      {children}
    </ul>
  ),
  orderedList: ({ start, children }) => (
    <ol
      start={start}
      style={{ listStyleType: "decimal", paddingLeft: "1.5rem", marginBottom: "1rem" }}
    >
      {children}
    </ol>
  ),
  listItem: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote
      style={{
        borderLeft: "2px solid currentColor",
        paddingLeft: "1rem",
        margin: "1rem 0",
        fontStyle: "italic",
      }}
    >
      {children}
    </blockquote>
  ),
  codeBlock: ({ children }) => (
    <pre
      style={{
        background: "rgba(0,0,0,0.06)",
        borderRadius: "0.375rem",
        padding: "1rem 1.25rem",
        margin: "1.25rem 0",
        overflowX: "auto",
        fontSize: "0.875em",
        lineHeight: 1.6,
      }}
    >
      <code style={{ fontFamily: "ui-monospace, monospace" }}>{children}</code>
    </pre>
  ),
  link: ({ href, target, rel, title, children }) => (
    <a
      href={href}
      target={target ?? undefined}
      rel={rel ?? undefined}
      title={title ?? undefined}
      style={{ textDecoration: "underline" }}
    >
      {children}
    </a>
  ),
};
