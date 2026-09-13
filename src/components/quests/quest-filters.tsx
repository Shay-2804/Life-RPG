"use client";

import { ATTRIBUTES } from "@/lib/game/constants";

export type StatusFilter = "all" | "active" | "completed";

export function QuestFilters({
  status,
  attribute,
  onStatusChange,
  onAttributeChange,
}: {
  status: StatusFilter;
  attribute: string;
  onStatusChange: (s: StatusFilter) => void;
  onAttributeChange: (a: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1 glass-panel-sm p-1">
        {(["all", "active", "completed"] as const).map((s) => (
          <button
            key={s}
            onClick={() => onStatusChange(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              status === s ? "bg-coral-500 text-white" : "text-ink/60 hover:text-ink"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <select
        value={attribute}
        onChange={(e) => onAttributeChange(e.target.value)}
        className="glass-panel-sm px-3 py-2 text-xs font-medium text-ink/70 focus:outline-none"
      >
        <option value="all">All attributes</option>
        {ATTRIBUTES.map((a) => (
          <option key={a.key} value={a.key}>
            {a.label}
          </option>
        ))}
      </select>
    </div>
  );
}