"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
  Copy,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function AIPanel() {
  const { aiPanelOpen, setAiPanelOpen } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your SDLC AI Assistant. I can help you with:\n\n• **Generating** requirements, architecture, and code\n• **Reviewing** existing artifacts\n• **Suggesting** improvements\n• **Answering** questions about your project\n\nWhat would you like to work on?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {aiPanelOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 400, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed right-0 top-0 z-40 flex h-full flex-col border-l border-zinc-800 bg-[#09090B] shadow-2xl"
        >
          <div className="flex h-14 items-center justify-between border-b border-zinc-800 px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-white">
                AI Assistant
              </span>
              <Badge variant="purple" className="text-[10px]">
                GPT-4o
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setAiPanelOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div ref={scrollRef} className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      message.role === "assistant"
                        ? "bg-gradient-to-br from-indigo-600 to-purple-600"
                        : "bg-zinc-700"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="h-3.5 w-3.5 text-white" />
                    ) : (
                      <User className="h-3.5 w-3.5 text-white" />
                    )}
                  </div>
                  <div
                    className={`group relative max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                      message.role === "assistant"
                        ? "bg-zinc-900 text-zinc-300 border border-zinc-800"
                        : "bg-indigo-600/20 text-indigo-200 border border-indigo-500/20"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="mt-1 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="rounded p-0.5 text-zinc-500 hover:text-zinc-300">
                        <Copy className="h-3 w-3" />
                      </button>
                      {message.role === "assistant" && (
                        <button className="rounded p-0.5 text-zinc-500 hover:text-zinc-300">
                          <RotateCcw className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2">
                    <div className="flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin text-indigo-400" />
                      <span className="text-xs text-zinc-500">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator className="bg-zinc-800" />

          <div className="p-4">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask anything about your project..."
                className="max-h-32 min-h-[36px] flex-1 resize-none bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none"
                rows={1}
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSend}
                disabled={!input.trim()}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-center text-[10px] text-zinc-600">
              AI responses are generated. Always verify critical outputs.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function generateResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("requirement") || lower.includes("prd")) {
    return "I can help generate requirements documents. Here's what I can create:\n\n1. **PRD** - Product Requirements Document\n2. **SRS** - Software Requirements Specification\n3. **User Stories** with acceptance criteria\n\nWould you like me to generate any of these for your current project?";
  }
  if (lower.includes("architect") || lower.includes("design")) {
    return "I'll design the system architecture. This includes:\n\n• **System Architecture Diagram** - High-level component overview\n• **ER Diagram** - Database schema design\n• **API Contracts** - RESTful endpoint specifications\n• **Sequence Diagrams** - Key workflow interactions\n\nShall I proceed with generating the architecture?";
  }
  if (lower.includes("code") || lower.includes("generate") || lower.includes("build")) {
    return "I'll generate the full codebase structure:\n\n```\nfrontend/\n  ├── src/\n  │   ├── components/\n  │   ├── pages/\n  │   └── services/\nbackend/\n  ├── api/\n  ├── models/\n  └── services/\ntests/\ndocker/\n.github/workflows/\n```\n\nWhich part would you like me to focus on first?";
  }
  if (lower.includes("test")) {
    return "I'll create comprehensive test suites:\n\n• **Unit Tests** - Component and function level\n• **Integration Tests** - API and service level\n• **E2E Tests** - Full user flow testing\n\nI'll also set up the autonomous test-repair loop to automatically fix failing tests.";
  }
  if (lower.includes("deploy")) {
    return "I'll prepare deployment configurations:\n\n• **Dockerfile** & **docker-compose.yml**\n• **GitHub Actions** CI/CD pipeline\n• **Deployment configs** for Vercel/Railway/AWS\n\nOnce ready, you can deploy with a single click!";
  }
  return "I understand your request. Let me analyze your project and provide relevant suggestions. You can ask me to:\n\n• Generate or modify documents\n• Create architecture designs\n• Write code for specific components\n• Set up testing or deployment\n• Review and improve existing artifacts\n\nWhat specific aspect would you like to explore?";
}
