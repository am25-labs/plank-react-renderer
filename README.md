# @am25/plank-react-renderer

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
      <a href={href} target={target} rel={rel} className="text-blue-500 underline">
        {children}
      </a>
    ),
  }}
/>
```

## Supported nodes

| Node | Default output |
|---|---|
| `heading` (h1–h3) | `<h1>` – `<h3>` |
| `paragraph` | `<p>` |
| `bulletList` | `<ul>` |
| `orderedList` | `<ol>` |
| `listItem` | `<li>` |
| `blockquote` | `<blockquote>` |
| `codeBlock` | `<pre><code>` |

## Supported marks

`bold`, `italic`, `underline`, `strike`, `code`, `link`

## License

MIT
