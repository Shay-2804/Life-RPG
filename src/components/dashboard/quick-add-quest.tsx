"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

export function QuickAddQuest() {
  const [title, setTitle] = useState("");

  return (
    <form
      className="glass-panel-sm p-3 flex items-center gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quick-add a quest..."
        className="flex-1 bg-transparent px-2 py-1.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
      />
      <Link
        href="/quests"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-coral-500 text-white text-sm font-medium hover:bg-coral-600 transition-colors shrink-0"
      >
        <Plus className="w-4 h-4" />
        Add
      </Link>
    </form>
  );
}