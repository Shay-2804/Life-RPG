"use client";

import { useEffect } from "react";
import { Sparkles } from "lucide-react";

export function CelebrationToast({
  xp,
  gold,
  onDone,
}: {
  xp: number;
  gold: number;
  onDone: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-panel px-6 py-3 flex items-center gap-3 animate-pop-in"
    >
      <Sparkles className="w-5 h-5 text-amber-500" />
      <span className="font-semibold text-ink text-sm">
        Quest complete! +{xp} XP · +{gold} Gold
      </span>
    </div>
  );
}