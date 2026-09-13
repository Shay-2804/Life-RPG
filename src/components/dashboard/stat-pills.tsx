import { Coins, Flame } from "lucide-react";

export function StatPills({ gold, streak }: { gold: number; streak: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="glass-panel-sm px-4 py-2 flex items-center gap-2">
        <Coins className="w-4 h-4 text-amber-500" />
        <span className="font-semibold text-ink text-sm">{gold}</span>
      </div>
      <div className="glass-panel-sm px-4 py-2 flex items-center gap-2">
        <Flame className="w-4 h-4 text-coral-500" />
        <span className="font-semibold text-ink text-sm">{streak} day streak</span>
      </div>
    </div>
  );
}