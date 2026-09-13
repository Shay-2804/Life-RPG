"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

type Quest = {
  id: string;
  title: string;
  attribute: string;
  difficulty: "easy" | "medium" | "hard" | "epic";
  xp: number;
  gold: number;
  completed: boolean;
};

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: "bg-teal-200/60 text-teal-600",
  medium: "bg-amber-200/60 text-amber-500",
  hard: "bg-coral-200/60 text-coral-600",
  epic: "bg-lavender text-ink",
};

export function TodayQuests({ quests: initialQuests }: { quests: Quest[] }) {
  const [quests, setQuests] = useState(initialQuests);

  // NOTE: placeholder toggle only — real completion goes through the
  // server-authoritative complete_quest RPC once Phase 2 resumes.
  function toggleLocal(id: string) {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: !q.completed } : q))
    );
  }

  if (quests.length === 0) {
    return (
      <div className="glass-panel-sm p-8 text-center">
        <p className="text-ink/60 text-sm">No quests yet today.</p>
        <p className="text-ink/40 text-xs mt-1">Add your first quest to start earning XP.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {quests.map((quest) => (
        <div
          key={quest.id}
          className={`glass-panel-sm p-4 flex items-center gap-3 transition-opacity ${
            quest.completed ? "opacity-50" : ""
          }`}
        >
          <button
            onClick={() => toggleLocal(quest.id)}
            aria-label={quest.completed ? "Mark incomplete" : "Complete quest"}
            className="shrink-0"
          >
            {quest.completed ? (
              <CheckCircle2 className="w-5 h-5 text-teal-500" />
            ) : (
              <Circle className="w-5 h-5 text-ink/30 hover:text-coral-400 transition-colors" />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium text-ink truncate ${quest.completed ? "line-through" : ""}`}>
              {quest.title}
            </p>
            <p className="text-xs text-ink/40 capitalize">{quest.attribute}</p>
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${DIFFICULTY_COLOR[quest.difficulty]}`}
          >
            +{quest.xp} XP
          </span>
        </div>
      ))}
    </div>
  );
}