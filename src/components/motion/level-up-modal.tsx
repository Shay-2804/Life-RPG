"use client";

import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

export function LevelUpModal({
  previousLevel,
  newLevel,
  onContinue,
}: {
  previousLevel: number;
  newLevel: number;
  onContinue: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === "Escape") onContinue();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onContinue]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="level-up-title"
    >
      <div
        aria-live="assertive"
        className="glass-panel w-full max-w-sm p-8 text-center animate-pop-in motion-reduce:animate-none"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coral-400 to-amber-400 flex items-center justify-center mx-auto mb-5 shadow-glass">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        <p className="text-xs font-bold tracking-wide text-coral-600 uppercase">Level Up</p>
        <h2 id="level-up-title" className="font-display text-4xl font-bold text-ink mt-2">
          {previousLevel} → {newLevel}
        </h2>
        <p className="text-sm text-ink/60 mt-3">
          You&apos;ve grown stronger. Keep the momentum going.
        </p>

        <button
          ref={buttonRef}
          onClick={onContinue}
          className="mt-7 w-full py-2.5 rounded-xl bg-coral-500 text-white font-semibold hover:bg-coral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-coral-600 focus:ring-offset-2"
        >
          Continue
        </button>
      </div>
    </div>
  );
}