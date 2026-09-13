import { Dumbbell, BookOpen, CheckCircle2, Palette, Heart } from "lucide-react";

const ICONS = {
  strength: Dumbbell,
  intellect: BookOpen,
  discipline: CheckCircle2,
  creativity: Palette,
  wellness: Heart,
} as const;

type AttrKey = keyof typeof ICONS;

export function AttributeSummary({
  attributes,
}: {
  attributes: { key: AttrKey; label: string; level: number }[];
}) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
      {attributes.map((attr) => {
        const Icon = ICONS[attr.key];
        return (
          <div key={attr.key} className="glass-panel-sm p-4 text-center">
            <Icon className="w-5 h-5 mx-auto mb-2 text-coral-500" />
            <p className="text-xs font-medium text-ink/70">{attr.label}</p>
            <p className="font-display font-bold text-ink text-sm mt-0.5">Lv {attr.level}</p>
          </div>
        );
      })}
    </div>
  );
}