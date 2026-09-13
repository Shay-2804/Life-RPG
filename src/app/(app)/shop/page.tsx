"use client";

import { useState, useMemo } from "react";
import { Coins, Store } from "lucide-react";
import { ShopItemCard, type ShopItem } from "@/components/shop/shop-item-card";
import { CategoryTabs } from "@/components/shop/category-tabs";
import { InventorySkeleton } from "@/components/shop/inventory-skeleton";
import { PurchaseToast } from "@/components/motion/purchase-toast";

// PLACEHOLDER catalog + gold balance — replaced by real reward_items
// query + purchase_item RPC (atomic gold-subtract + inventory-insert)
// once Phase 2 resumes.
const initialCatalog: ShopItem[] = [
  { id: "1", name: "Sunrise Theme", description: "Warm coral gradient UI theme", category: "theme", price_gold: 150, owned: true },
  { id: "2", name: "Midnight Theme", description: "Deep indigo alternate theme", category: "theme", price_gold: 150, owned: false },
  { id: "3", name: "Gilded Frame", description: "Ornate gold avatar border", category: "avatar_frame", price_gold: 200, owned: false },
  { id: "4", name: "Ivy Frame", description: "Botanical avatar border", category: "avatar_frame", price_gold: 120, owned: false },
  { id: "5", name: "The Disciplined", description: "Profile title", category: "title", price_gold: 80, owned: true },
  { id: "6", name: "The Relentless", description: "Profile title", category: "title", price_gold: 100, owned: false },
  { id: "7", name: "Sparkle Trail", description: "Cosmetic quest-complete effect", category: "cosmetic", price_gold: 250, owned: false },
];

export default function ShopPage() {
  const [catalog, setCatalog] = useState(initialCatalog);
  const [gold, setGold] = useState(85);
  const [isLoading] = useState(false);
  const [category, setCategory] = useState("all");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [purchased, setPurchased] = useState<string | null>(null);

  const filteredCatalog = useMemo(() => {
    if (category === "all") return catalog;
    return catalog.filter((i) => i.category === category);
  }, [catalog, category]);

  function handleBuy(id: string) {
    const item = catalog.find((i) => i.id === id);
    if (!item || item.owned || gold < item.price_gold) return; // client-side guard only;
    // server RPC re-validates gold + ownership atomically and is the real source of truth.

    setPendingId(id);
    setTimeout(() => {
      setCatalog((prev) => prev.map((i) => (i.id === id ? { ...i, owned: true } : i)));
      setGold((g) => g - item.price_gold);
      setPendingId(null);
      setPurchased(item.name);
    }, 500);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-display text-2xl font-bold text-ink">Shop</h1>
        <div className="glass-panel-sm px-4 py-2 flex items-center gap-2">
          <Coins className="w-4 h-4 text-amber-500" />
          <span className="font-semibold text-ink text-sm">{gold} Gold</span>
        </div>
      </div>

      <CategoryTabs active={category} onChange={setCategory} />

      {isLoading ? (
        <InventorySkeleton />
      ) : filteredCatalog.length === 0 ? (
        <div className="glass-panel-sm p-10 text-center">
          <Store className="w-8 h-8 text-ink/20 mx-auto mb-3" />
          <p className="text-ink/60 text-sm font-medium">Nothing in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {filteredCatalog.map((item) => (
            <ShopItemCard
              key={item.id}
              item={item}
              userGold={gold}
              onBuy={handleBuy}
              isPending={pendingId === item.id}
            />
          ))}
        </div>
      )}

      {purchased && (
        <PurchaseToast itemName={purchased} onDone={() => setPurchased(null)} />
      )}
    </div>
  );
}