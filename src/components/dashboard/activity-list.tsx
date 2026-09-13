import { CheckCircle2 } from "lucide-react";

export type ActivityEntry = {
  id: string;
  questTitle: string;
  attribute: string;
  xp: number;
  gold: number;
  timestamp: string; // pre-formatted display string
};

export function ActivityList({ entries }: { entries: ActivityEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="glass-panel-sm p-8 text-center">
        <p className="text-ink/60 text-sm">No activity yet.</p>
        <p className="text-ink/40 text-xs mt-1">Complete a quest to see it here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <div key={entry.id} className="glass-panel-sm p-4 flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink truncate">{entry.questTitle}</p>
            <p className="text-xs text-ink/40 capitalize">
              {entry.attribute} · {entry.timestamp}
            </p>
          </div>
          <span className="text-xs font-semibold text-ink/60 shrink-0">
            +{entry.xp} XP · +{entry.gold}g
          </span>
        </div>
      ))}
    </div>
  );
}