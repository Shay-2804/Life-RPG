import { xpProgress } from "@/lib/game/constants";

export function XpBar({ level, totalXp }: { level: number; totalXp: number }) {
  const { into, needed, percent } = xpProgress(totalXp, level);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-display text-lg font-bold text-ink">Level {level}</span>
        <span className="text-sm text-ink/50">
          {into} / {needed} XP
        </span>
      </div>
      <div
        className="h-3 rounded-full bg-white/70 overflow-hidden"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Level ${level} progress`}
      >
        <div
          className="h-full bg-gradient-to-r from-coral-400 to-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}