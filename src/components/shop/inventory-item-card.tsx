"use client";

import { Check, Shirt, Frame, Tag, Sparkles } from "lucide-react";

export type InventoryItem = {
  id: string;
  name: string;
  description?: string;
  category: "theme" | "avatar_frame" | "title" | "cosmetic";
  equipped: boolean;
};

const CATEGORY_ICON: Record<InventoryItem["category"], typeof Shirt> = {
  theme: Shirt,
  avatar_frame: Frame,
  title: Tag,
  cosmetic: Sparkles,
};

export function InventoryItemCard({
  item,
  onToggleEquip,
  isPending,
}: {
  item: InventoryItem;
  onToggleEquip: (id: string) => void;
  isPending: boolean;
}) {
  const Icon = CATEGORY_ICON[item.category];

  return (
    <div className="glass-panel-sm p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-lavender flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-ink/60" />
        </div>
        {item.equipped && (
          <span className="flex items-center gap-1 text-xs font-semibold text-teal-600 bg-teal-200/50 px-2 py-1 rounded-full">
            <Check className="w-3 h-3" />
            Equipped
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-semibold text-ink">{item.name}</p>
        {item.description && <p className="text-xs text-ink/50 mt-0.5">{item.description}</p>}
      </div>
      <button
        onClick={() => onToggleEquip(item.id)}
        disabled={isPending}
        className={`mt-auto text-xs font-semibold py-2 rounded-lg transition-colors disabled:opacity-60 ${
          item.equipped
            ? "bg-white/70 text-ink hover:bg-white/90"
            : "bg-coral-500 text-white hover:bg-coral-600"
        }`}
      >
        {isPending ? "Updating..." : item.equipped ? "Unequip" : "Equip"}
      </button>
    </div>
  );
}