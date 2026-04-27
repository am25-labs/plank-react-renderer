export type HeadingLevel = 1 | 2 | 3;

export type MarkType =
  | { type: "bold" }
  | { type: "italic" }
  | { type: "underline" }
  | { type: "strike" }
  | { type: "code" }
  | {
      type: "link";
      attrs: {
        href: string;
        target?: string | null;
        rel?: string | null;
        class?: string | null;
        title?: string | null;
      };
    };

export type TextNode = {
  type: "text";
  text: string;
  marks?: MarkType[];
};

export type HeadingNode = {
  type: "heading";
  attrs: { level: HeadingLevel };
  content: TiptapNode[];
};

export type ParagraphNode = {
  type: "paragraph";
  content?: TiptapNode[];
};

export type BulletListNode = {
  type: "bulletList";
  content: ListItemNode[];
};

export type OrderedListNode = {
  type: "orderedList";
  attrs?: { start?: number; type?: string | null };
  content: ListItemNode[];
};

export type ListItemNode = {
  type: "listItem";
  content: TiptapNode[];
};

export type BlockquoteNode = {
  type: "blockquote";
  content: TiptapNode[];
};

export type CodeBlockNode = {
  type: "codeBlock";
  attrs?: { language?: string | null };
  content: TextNode[];
};

export type ImageNode = {
  type: "image";
  attrs: {
    src: string;
    alt?: string | null;
    width?: number | null;
    height?: number | null;
  };
};

export type TiptapNode =
  | TextNode
  | HeadingNode
  | ParagraphNode
  | BulletListNode
  | OrderedListNode
  | ListItemNode
  | BlockquoteNode
  | CodeBlockNode
  | ImageNode;

export type TiptapDoc = {
  type: "doc";
  content: TiptapNode[];
};

export type NodeComponents = {
  heading?: (props: {
    level: HeadingLevel;
    children: React.ReactNode;
  }) => React.ReactElement;
  paragraph?: (props: {
    children: React.ReactNode;
  }) => React.ReactElement;
  bulletList?: (props: {
    children: React.ReactNode;
  }) => React.ReactElement;
  orderedList?: (props: {
    start: number;
    children: React.ReactNode;
  }) => React.ReactElement;
  listItem?: (props: {
    children: React.ReactNode;
  }) => React.ReactElement;
  blockquote?: (props: {
    children: React.ReactNode;
  }) => React.ReactElement;
  codeBlock?: (props: {
    language: string | null;
    children: React.ReactNode;
  }) => React.ReactElement;
  link?: (props: {
    href: string;
    target?: string | null;
    rel?: string | null;
    title?: string | null;
    children: React.ReactNode;
  }) => React.ReactElement;
  image?: (props: {
    src: string;
    alt?: string | null;
    width?: number | null;
    height?: number | null;
  }) => React.ReactElement;
};
