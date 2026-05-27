"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutDashboard,
  FolderKanban,
  FileText,
  Network,
  Code2,
  TestTube2,
  Rocket,
  Settings,
  Plus,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/store";

const commands = [
  { id: "dashboard", label: "Go to Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "projects", label: "View Projects", icon: FolderKanban, href: "/projects" },
  { id: "new-project", label: "Create New Project", icon: Plus, href: "/projects" },
  { id: "requirements", label: "Requirements", icon: FileText, href: "/requirements" },
  { id: "architecture", label: "Architecture", icon: Network, href: "/architecture" },
  { id: "development", label: "Development", icon: Code2, href: "/development" },
  { id: "testing", label: "Testing", icon: TestTube2, href: "/testing" },
  { id: "deployments", label: "Deployments", icon: Rocket, href: "/deployments" },
  { id: "ai-assistant", label: "Open AI Assistant", icon: Sparkles, href: null },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen, setAiPanelOpen } =
    useAppStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (cmd: (typeof commands)[number]) => {
    if (cmd.id === "ai-assistant") {
      setAiPanelOpen(true);
    } else if (cmd.href) {
      router.push(cmd.href);
    }
    setCommandPaletteOpen(false);
    setSearch("");
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-zinc-800 bg-[#111827] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
              <Search className="h-4 w-4 text-zinc-500" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none"
              />
              <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500">
                ESC
              </kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => handleSelect(cmd)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                >
                  <cmd.icon className="h-4 w-4 text-zinc-500" />
                  {cmd.label}
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-zinc-500">
                  No results found.
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
