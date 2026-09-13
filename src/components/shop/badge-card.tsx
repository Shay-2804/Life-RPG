import { Award, Lock } from "lucide-react";

export type BadgeItem = {
  id: string;
  name: string;
  description?: string;
  earned: boolean;
};

export function BadgeCard({ badge }: { badge: BadgeItem }) {
  return (
    <div
      className={`glass-panel-sm p-4 flex flex-col items-center text-center gap-2 ${
        !badge.earned ? "opacity-40" : ""
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${
          badge.earned ? "bg-amber-200/60" : "bg-white/50"
        }`}
      >
        {badge.earned ? (
          <Award className="w-6 h-6 text-amber-500" />
        ) : (
          <Lock className="w-5 h-5 text-ink/30" />
        )}
      </div>
      <p className="text-xs font-semibold text-ink">{badge.name}</p>
      {badge.description && <p className="text-[11px] text-ink/50">{badge.description}</p>}
    </div>
  );
}