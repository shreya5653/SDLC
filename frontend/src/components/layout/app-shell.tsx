"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { AIPanel } from "./ai-panel";
import { CommandPalette } from "./command-palette";
import { useAppStore } from "@/store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, aiPanelOpen } = useAppStore();

  return (
    <div className="flex h-screen bg-[#09090B] text-zinc-100">
      <Sidebar />
      <motion.div
        initial={false}
        animate={{
          marginLeft: sidebarOpen ? 256 : 72,
          marginRight: aiPanelOpen ? 400 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex flex-1 flex-col min-w-0"
      >
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </motion.div>
      <AIPanel />
      <CommandPalette />
    </div>
  );
}
