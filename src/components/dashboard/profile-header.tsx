import { Flame, Trophy } from "lucide-react";

export function ProfileHeader({
  username,
  level,
  totalXp,
  equippedTitle,
  currentStreak,
  longestStreak,
}: {
  username: string;
  level: number;
  totalXp: number;
  equippedTitle?: string;
  currentStreak: number;
  longestStreak: number;
}) {
  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="glass-panel p-6 flex items-center gap-5 flex-wrap">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-coral-400 to-amber-400 flex items-center justify-center shrink-0 shadow-glass-sm">
        <span className="font-display text-3xl font-bold text-white">{initial}</span>
      </div>

      <div className="flex-1 min-w-[180px]">
        <h1 className="font-display text-xl font-bold text-ink">{username}</h1>
        {equippedTitle && (
          <p className="text-xs font-medium text-coral-600 mt-0.5">{equippedTitle}</p>
        )}
        <div className="flex items-center gap-4 mt-2 text-sm text-ink/60">
          <span className="font-semibold text-ink">Level {level}</span>
          <span>{totalXp.toLocaleString()} total XP</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="glass-panel-sm px-4 py-2.5 text-center">
          <div className="flex items-center gap-1.5 justify-center text-coral-500">
            <Flame className="w-4 h-4" />
            <span className="font-bold text-ink">{currentStreak}</span>
          </div>
          <p className="text-[11px] text-ink/50 mt-0.5">Current streak</p>
        </div>
        <div className="glass-panel-sm px-4 py-2.5 text-center">
          <div className="flex items-center gap-1.5 justify-center text-amber-500">
            <Trophy className="w-4 h-4" />
            <span className="font-bold text-ink">{longestStreak}</span>
          </div>
          <p className="text-[11px] text-ink/50 mt-0.5">Longest streak</p>
        </div>
      </div>
    </div>
  );
}