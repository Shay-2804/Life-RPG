"use client";

import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";

export type Quest = {
  id: string;
  title: string;
  description?: string;
  attribute_key: string;
  difficulty: "easy" | "medium" | "hard" | "epic";
  due_date?: string;
  status: "active" | "completed";
  xp: number;
  gold: number;
};

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: "bg-teal-200/60 text-teal-600",
  medium: "bg-amber-200/60 text-amber-500",
  hard: "bg-coral-200/60 text-coral-600",
  epic: "bg-lavender text-ink",
};

export function QuestItem({
  quest,
  onComplete,
  onEdit,
  onDelete,
}: {
  quest: Quest;
  onComplete: (id: string) => void;
  onEdit: (quest: Quest) => void;
  onDelete: (quest: Quest) => void;
}) {
  const isCompleted = quest.status === "completed";

  return (
    <div className={`glass-panel-sm p-4 flex items-start gap-3 ${isCompleted ? "opacity-50" : ""}`}>
      <button
        onClick={() => !isCompleted && onComplete(quest.id)}
        disabled={isCompleted}
        aria-label={isCompleted ? "Already completed" : "Complete quest"}
        className="shrink-0 mt-0.5"
      >
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-teal-500" />
        ) : (
          <Circle className="w-5 h-5 text-ink/30 hover:text-coral-400 transition-colors" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium text-ink ${isCompleted ? "line-through" : ""}`}>
          {quest.title}
        </p>
        {quest.description && (
          <p className="text-xs text-ink/50 mt-0.5 truncate">{quest.description}</p>
        )}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-xs text-ink/40 capitalize">{quest.attribute_key}</span>
          {quest.due_date && (
            <span className="text-xs text-ink/40">Due {quest.due_date}</span>
          )}
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFFICULTY_COLOR[quest.difficulty]}`}>
            +{quest.xp} XP
          </span>
        </div>
      </div>

      {!isCompleted && (
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(quest)}
            aria-label="Edit quest"
            className="p-1.5 text-ink/40 hover:text-ink transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(quest)}
            aria-label="Delete quest"
            className="p-1.5 text-ink/40 hover:text-coral-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}