"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  MessageSquare,
  Command,
  Plus,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/store";
import { NewProjectDialog } from "@/components/dashboard/new-project-dialog";

export function Header() {
  const { setAiPanelOpen, aiPanelOpen, setCommandPaletteOpen } = useAppStore();
  const [showNewProject, setShowNewProject] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-800 bg-[#09090B]/80 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              placeholder="Search projects, artifacts..."
              className="w-80 bg-zinc-900/50 pl-9 border-zinc-800 focus:border-indigo-500"
              onFocus={() => setCommandPaletteOpen(true)}
              readOnly
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500 sm:inline-block">
              <Command className="mr-0.5 inline h-3 w-3" />K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="gradient"
            size="sm"
            onClick={() => setShowNewProject(true)}
            className="gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            New Project
          </Button>

          <Button
            variant={aiPanelOpen ? "default" : "outline"}
            size="sm"
            onClick={() => setAiPanelOpen(!aiPanelOpen)}
            className="gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Assistant
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4 text-zinc-400" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-indigo-500" />
          </Button>

          <Button variant="ghost" size="icon">
            <MessageSquare className="h-4 w-4 text-zinc-400" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-7 w-7">
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm">Shreya</span>
                  <span className="text-xs text-zinc-400">
                    shreya@example.com
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>API Keys</DropdownMenuItem>
              <DropdownMenuItem>Team Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <AnimatePresence>
        {showNewProject && (
          <NewProjectDialog onClose={() => setShowNewProject(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
