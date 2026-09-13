"use client";

import { Coins, Shirt, Frame, Tag, Sparkles, Check } from "lucide-react";

export type ShopItem = {
  id: string;
  name: string;
  description?: string;
  category: "theme" | "avatar_frame" | "title" | "cosmetic";
  price_gold: number;
  owned: boolean;
};

const CATEGORY_ICON: Record<ShopItem["category"], typeof Shirt> = {
  theme: Shirt,
  avatar_frame: Frame,
  title: Tag,
  cosmetic: Sparkles,
};

export function ShopItemCard({
  item,
  userGold,
  onBuy,
  isPending,
}: {
  item: ShopItem;
  userGold: number;
  onBuy: (id: string) => void;
  isPending: boolean;
}) {
  const Icon = CATEGORY_ICON[item.category];
  const canAfford = userGold >= item.price_gold;

  return (
    <div className="glass-panel-sm p-4 flex flex-col gap-3">
      <div className="w-11 h-11 rounded-xl bg-lavender flex items-center justify-center">
        <Icon className="w-5 h-5 text-ink/60" />
      </div>
      <div>
        <p className="text-sm font-semibold text-ink">{item.name}</p>
        {item.description && <p className="text-xs text-ink/50 mt-0.5">{item.description}</p>}
      </div>

      {item.owned ? (
        <div className="mt-auto flex items-center justify-center gap-1.5 text-xs font-semibold text-teal-600 bg-teal-200/50 py-2 rounded-lg">
          <Check className="w-3.5 h-3.5" />
          Owned
        </div>
      ) : (
        <button
          onClick={() => onBuy(item.id)}
          disabled={!canAfford || isPending}
          title={!canAfford ? "Not enough Gold" : undefined}
          className="mt-auto flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-lg bg-coral-500 text-white hover:bg-coral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-ink/20"
        >
          <Coins className="w-3.5 h-3.5" />
          {isPending ? "Purchasing..." : `${item.price_gold} Gold`}
        </button>
      )}
      {!canAfford && !item.owned && (
        <p className="text-[11px] text-coral-500 text-center -mt-1">Not enough Gold</p>
      )}
    </div>
  );
}