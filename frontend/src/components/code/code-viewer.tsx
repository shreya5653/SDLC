"use client";

import React, { useState } from "react";
import {
  FolderTree,
  File,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Download,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  language?: string;
  content?: string;
}

const fileTree: FileNode[] = [
  {
    name: "frontend",
    type: "folder",
    children: [
      {
        name: "src",
        type: "folder",
        children: [
          {
            name: "components",
            type: "folder",
            children: [
              {
                name: "ChatBot.tsx",
                type: "file",
                language: "typescript",
                content: `import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b p-4">
        <h1 className="text-xl font-bold">Healthcare Chatbot</h1>
      </header>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        {messages.map(msg => (
          <div key={msg.id} className={\`flex \${msg.role === 'user' ? 'justify-end' : ''}\`}>
            <div className={\`max-w-md rounded-lg p-3 \${
              msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }\`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Describe your symptoms..."
            className="flex-1 rounded-lg border p-2"
          />
          <button onClick={handleSend} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
          </button>
        </div>
      </div>
    </div>
  );
}`,
              },
              { name: "SymptomChecker.tsx", type: "file", language: "typescript" },
              { name: "AppointmentForm.tsx", type: "file", language: "typescript" },
            ],
          },
          {
            name: "App.tsx",
            type: "file",
            language: "typescript",
          },
          { name: "index.tsx", type: "file", language: "typescript" },
        ],
      },
      { name: "package.json", type: "file", language: "json" },
      { name: "tsconfig.json", type: "file", language: "json" },
    ],
  },
  {
    name: "backend",
    type: "folder",
    children: [
      {
        name: "src/main/java/com/healthcare",
        type: "folder",
        children: [
          { name: "ChatController.java", type: "file", language: "java" },
          { name: "ChatService.java", type: "file", language: "java" },
          { name: "PatientRepository.java", type: "file", language: "java" },
        ],
      },
      { name: "pom.xml", type: "file", language: "xml" },
    ],
  },
  {
    name: "tests",
    type: "folder",
    children: [
      { name: "chat.test.ts", type: "file", language: "typescript" },
      { name: "api.test.ts", type: "file", language: "typescript" },
    ],
  },
  {
    name: "docker",
    type: "folder",
    children: [
      { name: "Dockerfile.frontend", type: "file", language: "dockerfile" },
      { name: "Dockerfile.backend", type: "file", language: "dockerfile" },
      { name: "docker-compose.yml", type: "file", language: "yaml" },
    ],
  },
  { name: ".github/workflows/ci.yml", type: "file", language: "yaml" },
  { name: "README.md", type: "file", language: "markdown" },
];

function FileTreeItem({
  node,
  depth = 0,
  onSelect,
}: {
  node: FileNode;
  depth?: number;
  onSelect: (node: FileNode) => void;
}) {
  const [isOpen, setIsOpen] = useState(depth < 2);

  return (
    <div>
      <button
        onClick={() => {
          if (node.type === "folder") {
            setIsOpen(!isOpen);
          } else {
            onSelect(node);
          }
        }}
        className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {node.type === "folder" ? (
          <>
            {isOpen ? (
              <ChevronDown className="h-3 w-3 text-zinc-600" />
            ) : (
              <ChevronRight className="h-3 w-3 text-zinc-600" />
            )}
            {isOpen ? (
              <FolderOpen className="h-3.5 w-3.5 text-indigo-400" />
            ) : (
              <Folder className="h-3.5 w-3.5 text-zinc-500" />
            )}
          </>
        ) : (
          <>
            <span className="w-3" />
            <File className="h-3.5 w-3.5 text-zinc-500" />
          </>
        )}
        <span className="truncate">{node.name}</span>
      </button>
      {node.type === "folder" && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeItem
              key={child.name}
              node={child}
              depth={depth + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CodeViewer() {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  const defaultFile = findFileWithContent(fileTree);

  const activeFile = selectedFile || defaultFile;

  return (
    <div className="flex h-[600px] rounded-xl border border-zinc-800 bg-[#111827] overflow-hidden">
      <div className="w-64 border-r border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
          <div className="flex items-center gap-2">
            <FolderTree className="h-3.5 w-3.5 text-zinc-500" />
            <span className="text-xs font-medium text-zinc-400">
              File Explorer
            </span>
          </div>
          <Badge variant="secondary" className="text-[8px]">
            Generated
          </Badge>
        </div>
        <ScrollArea className="h-[calc(100%-36px)]">
          <div className="py-1">
            {fileTree.map((node) => (
              <FileTreeItem
                key={node.name}
                node={node}
                onSelect={setSelectedFile}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {activeFile?.content ? (
          <>
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
              <div className="flex items-center gap-2">
                <File className="h-3.5 w-3.5 text-zinc-500" />
                <span className="text-xs font-medium text-zinc-300">
                  {activeFile.name}
                </span>
                <Badge variant="cyan" className="text-[8px]">
                  {activeFile.language}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Copy className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <pre className="p-4 text-xs leading-relaxed">
                <code className="text-zinc-300 font-mono">
                  {activeFile.content.split("\n").map((line, i) => (
                    <div key={i} className="flex hover:bg-zinc-800/30">
                      <span className="inline-block w-10 shrink-0 select-none text-right text-zinc-600 pr-4">
                        {i + 1}
                      </span>
                      <span className="flex-1">{highlightSyntax(line)}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </ScrollArea>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-zinc-600">
            <div className="text-center">
              <File className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">Select a file to view its contents</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function findFileWithContent(nodes: FileNode[]): FileNode | null {
  for (const node of nodes) {
    if (node.type === "file" && node.content) return node;
    if (node.children) {
      const found = findFileWithContent(node.children);
      if (found) return found;
    }
  }
  return null;
}

function highlightSyntax(line: string): React.ReactNode {
  return line
    .replace(
      /(import|from|export|default|const|let|var|function|return|async|await|try|catch|finally|if|else|new|typeof|interface|type)\b/g,
      "§kw§$1§/kw§"
    )
    .replace(/('[^']*'|"[^"]*")/g, "§str§$1§/str§")
    .replace(/(\/\/.*$)/gm, "§cmt§$1§/cmt§")
    .split(/(§\w+§[^§]*§\/\w+§)/g)
    .map((part, i) => {
      if (part.startsWith("§kw§")) {
        return (
          <span key={i} className="text-purple-400">
            {part.replace(/§\/?kw§/g, "")}
          </span>
        );
      }
      if (part.startsWith("§str§")) {
        return (
          <span key={i} className="text-emerald-400">
            {part.replace(/§\/?str§/g, "")}
          </span>
        );
      }
      if (part.startsWith("§cmt§")) {
        return (
          <span key={i} className="text-zinc-600 italic">
            {part.replace(/§\/?cmt§/g, "")}
          </span>
        );
      }
      return part;
    });
}
