import { Dumbbell, BookOpen, CheckCircle2, Palette, Heart } from "lucide-react";
import { xpProgress } from "@/lib/game/constants";

const ICONS = {
  strength: Dumbbell,
  intellect: BookOpen,
  discipline: CheckCircle2,
  creativity: Palette,
  wellness: Heart,
} as const;

type AttrKey = keyof typeof ICONS;

export function AttributeBars({
  attributes,
}: {
  attributes: { key: AttrKey; label: string; level: number; xp: number }[];
}) {
  return (
    <div className="space-y-3">
      {attributes.map((attr) => {
        const Icon = ICONS[attr.key];
        const { percent } = xpProgress(attr.xp, attr.level);
        return (
          <div key={attr.key} className="glass-panel-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-coral-500" />
                <span className="text-sm font-medium text-ink">{attr.label}</span>
              </div>
              <span className="text-xs font-semibold text-ink/60">Lv {attr.level}</span>
            </div>
            <div className="h-2 rounded-full bg-white/70 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}