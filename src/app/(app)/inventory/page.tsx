"use client";

import { useState, useMemo } from "react";
import { Package } from "lucide-react";
import { InventoryItemCard, type InventoryItem } from "@/components/shop/inventory-item-card";
import { BadgeCard, type BadgeItem } from "@/components/shop/badge-card";
import { CategoryTabs } from "@/components/shop/category-tabs";
import { InventorySkeleton } from "@/components/shop/inventory-skeleton";

// PLACEHOLDER data — swapped for real inventory/user_badges queries
// and the equip-toggle write once Phase 2 resumes.
const initialItems: InventoryItem[] = [
  { id: "1", name: "Sunrise Theme", description: "Warm coral gradient UI theme", category: "theme", equipped: true },
  { id: "2", name: "Gilded Frame", description: "Ornate gold avatar border", category: "avatar_frame", equipped: false },
  { id: "3", name: "The Disciplined", description: "Profile title", category: "title", equipped: false },
  { id: "4", name: "Sparkle Trail", description: "Cosmetic quest-complete effect", category: "cosmetic", equipped: false },
];

const badges: BadgeItem[] = [
  { id: "b1", name: "7 Day Streak", description: "Kept a streak for a week", earned: true },
  { id: "b2", name: "Level 10", description: "Reached level 10", earned: false },
  { id: "b3", name: "First Quest", description: "Completed your first quest", earned: true },
  { id: "b4", name: "Big Spender", description: "Bought 5 items", earned: false },
];

export default function InventoryPage() {
  const [items, setItems] = useState(initialItems);
  const [isLoading] = useState(false);
  const [category, setCategory] = useState("all");
  const [pendingId, setPendingId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    if (category === "all") return items;
    return items.filter((i) => i.category === category);
  }, [items, category]);

  function handleToggleEquip(id: string) {
    const target = items.find((i) => i.id === id);
    if (!target) return;

    setPendingId(id);
    setTimeout(() => {
      setItems((prev) =>
        prev.map((i) => {
          // Only one item per category can be equipped at a time (mirrors
          // how theme/frame/title equip logic will work server-side).
          if (i.category !== target.category) return i;
          if (i.id === id) return { ...i, equipped: !i.equipped };
          return { ...i, equipped: false };
        })
      );
      setPendingId(null);
    }, 300);
  }

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-bold text-ink">Inventory</h1>

      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-display text-lg font-bold text-ink">Owned Items</h2>
          <CategoryTabs active={category} onChange={setCategory} />
        </div>

        {isLoading ? (
          <InventorySkeleton />
        ) : filteredItems.length === 0 ? (
          <div className="glass-panel-sm p-10 text-center">
            <Package className="w-8 h-8 text-ink/20 mx-auto mb-3" />
            <p className="text-ink/60 text-sm font-medium">Nothing here yet.</p>
            <p className="text-ink/40 text-xs mt-1">Complete quests and visit the shop to earn items.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filteredItems.map((item) => (
              <InventoryItemCard
                key={item.id}
                item={item}
                onToggleEquip={handleToggleEquip}
                isPending={pendingId === item.id}
              />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-lg font-bold text-ink">Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {badges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>
    </div>
  );
}