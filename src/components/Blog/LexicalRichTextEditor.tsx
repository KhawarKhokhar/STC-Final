"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode, QuoteNode, $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $insertNodes,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

type Props = {
  initialContent: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

const theme = {
  paragraph: "mb-3",
  heading: {
    h1: "text-2xl font-bold mb-3",
    h2: "text-xl font-bold mb-2",
    h3: "text-lg font-semibold mb-2",
  },
  quote: "border-l-4 border-slate-200 pl-3 text-slate-700 italic",
  list: {
    listitem: "mb-1",
    ol: "list-decimal pl-5 mb-2",
    ul: "list-disc pl-5 mb-2",
  },
  code: "rounded bg-slate-100 px-2 py-1 font-mono text-sm",
  link: "text-blue-600 underline",
};

function Toolbar() {
  const [editor] = useLexicalComposerContext();

  const setHeading = (tag: "h2" | "h3") => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      $setBlocksType(selection, () => $createHeadingNode(tag));
    });
  };

  const setQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      $setBlocksType(selection, () => $createQuoteNode());
    });
  };

  const clearEditor = () => {
    editor.update(() => {
      $getRoot().clear();
    });
  };

  const insertImage = () => {
    const url = typeof window !== "undefined" ? window.prompt("Image URL") : "";
    if (!url) return;

    const trimmed = url.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
      alert("Please enter a valid http/https image URL.");
      return;
    }

    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(
        `<img src="${trimmed}" alt="" />`,
        "text/html"
      );
      const nodes = $generateNodesFromDOM(editor, dom);
      $insertNodes(nodes);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
      <ToolbarButton onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>B</ToolbarButton>
      <ToolbarButton onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>I</ToolbarButton>
      <ToolbarButton onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}>U</ToolbarButton>
      <ToolbarButton onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}>Strike</ToolbarButton>
      <ToolbarButton onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}>Code</ToolbarButton>

      <ToolbarButton onClick={setQuote}>Quote</ToolbarButton>
      <ToolbarButton onClick={() => setHeading("h2")}>H2</ToolbarButton>
      <ToolbarButton onClick={() => setHeading("h3")}>H3</ToolbarButton>

      <ToolbarButton onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}>OL</ToolbarButton>
      <ToolbarButton onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}>UL</ToolbarButton>
      <ToolbarButton onClick={() => editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)}>Unlist</ToolbarButton>

      <ToolbarButton onClick={() => editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)}>HR</ToolbarButton>
      <ToolbarButton onClick={insertImage}>Image</ToolbarButton>

      <ToolbarButton onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}>Left</ToolbarButton>
      <ToolbarButton onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}>Center</ToolbarButton>
      <ToolbarButton onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}>Right</ToolbarButton>

      <ToolbarButton onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>Undo</ToolbarButton>
      <ToolbarButton onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>Redo</ToolbarButton>

      <ToolbarButton onClick={clearEditor}>Clear</ToolbarButton>
    </div>
  );
}

function ToolbarButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md bg-white px-2 py-1 text-xs shadow-sm hover:bg-slate-100"
    >
      {children}
    </button>
  );
}

function InitialContentLoader({ html }: { html: string }) {
  const [editor] = useLexicalComposerContext();
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!html || hasLoaded.current) return;
    hasLoaded.current = true;

    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      const root = $getRoot();
      root.clear();
      root.append(...nodes);
    });
  }, [editor, html]);

  return null;
}

export default function LexicalRichTextEditor({ initialContent, onChange, placeholder }: Props) {
  const initialConfig = useMemo(
    () => ({
      namespace: "BlogEditor",
      theme,
      onError: (e: Error) => console.error(e),
      nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, CodeNode, AutoLinkNode, LinkNode, HorizontalRuleNode],
      editable: true,
    }),
    []
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <LexicalComposer initialConfig={initialConfig}>
        <Toolbar />
        <RichTextPlugin
          contentEditable={<ContentEditable className="min-h-[220px] px-3 py-3 outline-none" />}
          placeholder={
            <div className="pointer-events-none px-3 py-2 text-sm text-slate-400">
              {placeholder || "Write something great..."}
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <HorizontalRulePlugin />
        <MarkdownShortcutPlugin />
        <InitialContentLoader html={initialContent} />
        <OnChangePlugin
          onChange={(editorState, editor) => {
            editorState.read(() => {
              onChange($generateHtmlFromNodes(editor));
            });
          }}
        />
      </LexicalComposer>
    </div>
  );
}
