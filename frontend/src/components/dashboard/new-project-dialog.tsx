"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";

interface NewProjectDialogProps {
  onClose: () => void;
}

const EXAMPLES = [
  "Build a healthcare chatbot with React frontend and Spring Boot backend",
  "Create an e-commerce platform with Next.js and FastAPI",
  "Build a project management tool like Linear with real-time collaboration",
  "Create a social media analytics dashboard with React and Node.js",
];

export function NewProjectDialog({ onClose }: NewProjectDialogProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { startGeneration } = useAppStore();

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    startGeneration(prompt);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-800 bg-[#111827] p-0 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/20">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                Create New Project
              </h2>
              <p className="text-xs text-zinc-500">
                Describe your idea and AI will build it
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your application idea in detail..."
              className="min-h-[120px] w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              rows={4}
            />
          </div>

          <div className="mt-4">
            <p className="mb-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Try an example
            </p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((example) => (
                <button
                  key={example}
                  onClick={() => setPrompt(example)}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-indigo-500/30 hover:bg-indigo-600/10 hover:text-indigo-300"
                >
                  {example.slice(0, 50)}...
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Badge variant="outline" className="text-[10px]">
              React / Next.js
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              FastAPI / Spring Boot
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              PostgreSQL
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              Docker
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-4">
          <p className="text-xs text-zinc-600">
            AI will generate all SDLC phases automatically
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="gradient"
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Project
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
