# Plank CMS - React Renderer

React renderer for [Plank CMS](https://github.com/am25-labs/plank-cms) rich text content. Converts the Tiptap JSON output from the `RichText` field into React elements, with full support for custom components per node type.

## Installation

```bash
npm install @am25/plank-react-renderer
# or
pnpm add @am25/plank-react-renderer
```

Requires React ≥ 18 as a peer dependency.

## Usage

Pass the `content` field from any Plank CMS entry directly — it accepts both the raw JSON string (as returned by the API) and a pre-parsed object.

```tsx
import { PlankRenderer } from "@am25/plank-react-renderer";

export default function ArticlePage({ entry }) {
  return <PlankRenderer content={entry.content} />;
}
```

## Custom components

Override any node or mark renderer via the `components` prop. Only the nodes you provide will be replaced — the rest use the built-in defaults.

```tsx
<PlankRenderer
  content={entry.content}
  components={{
    heading: ({ level, children }) => (
      <h1 className={`heading-${level}`}>{children}</h1>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 italic">{children}</blockquote>
    ),
    link: ({ href, target, rel, children }) => (
      <a
        href={href}
        target={target}
        rel={rel}
        className="text-blue-500 underline"
      >
        {children}
      </a>
    ),
  }}
/>
```

## Default styles

The package ships a pre-compiled stylesheet with sensible defaults. Import it once in your project:

```css
@import "@am25/plank-react-renderer/styles.css";
```

All styles are scoped to the `.plank-renderer` class applied to the wrapper `<div>`, so they won't affect the rest of your layout. Override any node via the `components` prop to apply your own classes or styles instead.

## Supported nodes

| Node              | Default output                                                          |
| ----------------- | ----------------------------------------------------------------------- |
| `heading` (h1–h3) | `<h1>`–`<h3>` with scaled font sizes, bold weight, and vertical margins |
| `paragraph`       | `<p>` with bottom margin                                                |
| `bulletList`      | `<ul>` with `disc` markers and bottom margin                            |
| `orderedList`     | `<ol>` with `decimal` markers and bottom margin                         |
| `listItem`        | `<li>` with small bottom margin                                         |
| `blockquote`      | `<blockquote>` with left border, padding, and italic                    |
| `codeBlock`       | `<pre><code>` with monospace font, background, and scroll               |

## Supported marks

`bold`, `italic`, `underline`, `strike`, `code`, `link`

## License

[MIT](LICENSE) - AM25, S.A.S. DE C.V.
