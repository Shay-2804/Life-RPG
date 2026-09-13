"use client";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "theme", label: "Themes" },
  { key: "avatar_frame", label: "Avatar Frames" },
  { key: "title", label: "Titles" },
  { key: "cosmetic", label: "Cosmetics" },
] as const;

export function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 glass-panel-sm p-1 overflow-x-auto">
      {CATEGORIES.map((c) => (
        <button
          key={c.key}
          onClick={() => onChange(c.key)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            active === c.key ? "bg-coral-500 text-white" : "text-ink/60 hover:text-ink"
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}