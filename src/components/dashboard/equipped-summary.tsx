import { Shirt, Frame, Tag } from "lucide-react";

export function EquippedSummary({
  theme,
  avatarFrame,
  title,
}: {
  theme?: string;
  avatarFrame?: string;
  title?: string;
}) {
  const rows = [
    { icon: Shirt, label: "Theme", value: theme },
    { icon: Frame, label: "Avatar Frame", value: avatarFrame },
    { icon: Tag, label: "Title", value: title },
  ];

  return (
    <div className="glass-panel-sm p-4 space-y-3">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-lavender flex items-center justify-center shrink-0">
            <row.icon className="w-4 h-4 text-ink/50" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-ink/40">{row.label}</p>
            <p className="text-sm font-medium text-ink truncate">
              {row.value ?? "None equipped"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}