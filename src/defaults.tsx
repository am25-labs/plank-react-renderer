import type { NodeComponents } from "./types.js";

export const defaultComponents: Required<NodeComponents> = {
  heading: ({ level, children, isLast, isOnly }) => {
    const style = { marginBottom: isLast || isOnly ? 0 : undefined } as any;
    if (level === 1) return <h1 style={style}>{children}</h1>;
    if (level === 2) return <h2 style={style}>{children}</h2>;
    return <h3 style={style}>{children}</h3>;
  },
  paragraph: ({ children, isLast, isOnly }) => (
    <p style={{ marginBottom: isLast || isOnly ? 0 : undefined }}>{children}</p>
  ),
  bulletList: ({ children, isLast, isOnly }) => (
    <ul style={{ marginBottom: isLast || isOnly ? 0 : undefined }}>
      {children}
    </ul>
  ),
  orderedList: ({ start, children, isLast, isOnly }) => (
    <ol
      start={start}
      style={{ marginBottom: isLast || isOnly ? 0 : undefined }}
    >
      {children}
    </ol>
  ),
  listItem: ({ children, isLast, isOnly }) => (
    <li style={{ marginBottom: isLast || isOnly ? 0 : undefined }}>
      {children}
    </li>
  ),
  blockquote: ({ children, isLast, isOnly }) => (
    <div className="blockquote-wrapper">
      <blockquote style={{ marginBottom: isLast || isOnly ? 0 : undefined }}>
        {children}
      </blockquote>
    </div>
  ),
  codeBlock: ({ children, isLast, isOnly }) => (
    <pre style={{ marginBottom: isLast || isOnly ? 0 : undefined }}>
      <code>{children}</code>
    </pre>
  ),
  link: ({ href, target, rel, title, children }) => (
    <a
      href={href}
      target={target ?? undefined}
      rel={rel ?? undefined}
      title={title ?? undefined}
    >
      {children}
    </a>
  ),
  image: ({ src, alt, title, width, height, isLast, isOnly }) => {
    const style = { marginBottom: isLast || isOnly ? 0 : undefined };
    if (!title) {
      return (
        <img
          src={src}
          alt={alt ?? ""}
          title={title ?? undefined}
          width={width ?? undefined}
          height={height ?? undefined}
          style={style}
        />
      );
    }

    return (
      <figure style={style}>
        <img
          src={src}
          alt={alt ?? ""}
          title={title ?? undefined}
          width={width ?? undefined}
          height={height ?? undefined}
        />
        <figcaption>{title}</figcaption>
      </figure>
    );
  },
};
