import { XpBar } from "@/components/dashboard/xp-bar";
import { StatPills } from "@/components/dashboard/stat-pills";
import { AttributeSummary } from "@/components/dashboard/attribute-summary";
import { QuickAddQuest } from "@/components/dashboard/quick-add-quest";
import { TodayQuests } from "@/components/dashboard/today-quests";
import Link from "next/link";
import { Store } from "lucide-react";

// PLACEHOLDER DATA — replaced with real Supabase queries once Phase 2's
// RPC functions and server-authoritative reads are wired in.
const placeholderProfile = {
  username: "adventurer_01",
  level: 3,
  totalXp: 420,
  gold: 85,
  streak: 4,
};

const placeholderAttributes = [
  { key: "strength" as const, label: "Strength", level: 2 },
  { key: "intellect" as const, label: "Intellect", level: 4 },
  { key: "discipline" as const, label: "Discipline", level: 3 },
  { key: "creativity" as const, label: "Creativity", level: 1 },
  { key: "wellness" as const, label: "Wellness", level: 2 },
];

const placeholderQuests = [
  { id: "1", title: "Read 20 pages", attribute: "intellect", difficulty: "medium" as const, xp: 40, gold: 20, completed: false },
  { id: "2", title: "Gym session", attribute: "strength", difficulty: "hard" as const, xp: 75, gold: 35, completed: false },
  { id: "3", title: "Make the bed", attribute: "discipline", difficulty: "easy" as const, xp: 20, gold: 10, completed: true },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-ink/50">Welcome back,</p>
          <h1 className="font-display text-2xl font-bold text-ink">
            {placeholderProfile.username}
          </h1>
        </div>
        <StatPills gold={placeholderProfile.gold} streak={placeholderProfile.streak} />
      </div>

      <div className="glass-panel p-6">
        <XpBar level={placeholderProfile.level} totalXp={placeholderProfile.totalXp} />
      </div>

      <Link
  href="/shop"
  className="glass-panel-sm p-4 flex items-center gap-3 hover:bg-white/80 transition-colors"
>
  <div className="w-9 h-9 rounded-lg bg-amber-200/60 flex items-center justify-center shrink-0">
    <Store className="w-4.5 h-4.5 text-amber-600" />
  </div>
  <div>
    <p className="text-sm font-semibold text-ink">Visit the Shop</p>
    <p className="text-xs text-ink/50">Spend your Gold on rewards</p>
  </div>
</Link>

      <div>
        <h2 className="font-display text-lg font-bold text-ink mb-3">Attributes</h2>
        <AttributeSummary attributes={placeholderAttributes} />
      </div>

      <div>
        <h2 className="font-display text-lg font-bold text-ink mb-3">Today&apos;s Quests</h2>
        <div className="mb-3">
          <QuickAddQuest />
        </div>
        <TodayQuests quests={placeholderQuests} />
      </div>
    </div>
  );
}