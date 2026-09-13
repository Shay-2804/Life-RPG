"use client";

import { useState, useMemo } from "react";
import { Plus, ScrollText } from "lucide-react";
import { QuestFormDialog } from "@/components/quests/quest-form-dialog";
import { ConfirmDeleteDialog } from "@/components/quests/confirm-delete-dialog";
import { QuestFilters, type StatusFilter } from "@/components/quests/quest-filters";
import { QuestItem, type Quest } from "@/components/quests/quest-item";
import { QuestSkeleton } from "@/components/quests/quest-skeleton";
import { CelebrationToast } from "@/components/motion/celebration-toast";
import { DIFFICULTY_REWARDS } from "@/lib/game/constants";
import type { QuestInput } from "@/lib/validation/quest";
import { LevelUpModal } from "@/components/motion/level-up-modal";
import { xpRequiredForLevel } from "@/lib/game/constants";

// PLACEHOLDER in-memory data — swapped for real Supabase + RPC calls
// (complete_quest, quest CRUD) once Phase 2 resumes.
const initialQuests: Quest[] = [
  { id: "1", title: "Read 20 pages", attribute_key: "intellect", difficulty: "medium", status: "active", xp: 40, gold: 20 },
  { id: "2", title: "Gym session", attribute_key: "strength", difficulty: "hard", status: "active", xp: 75, gold: 35 },
  { id: "3", title: "Make the bed", attribute_key: "discipline", difficulty: "easy", status: "completed", xp: 20, gold: 10 },
];

export default function QuestsPage() {
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [isLoading] = useState(false); // will reflect real fetch state later
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [attributeFilter, setAttributeFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [deletingQuest, setDeletingQuest] = useState<Quest | null>(null);
  const [celebration, setCelebration] = useState<{ xp: number; gold: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileLevel, setProfileLevel] = useState(3);
const [profileXp, setProfileXp] = useState(420);
const [levelUp, setLevelUp] = useState<{ from: number; to: number } | null>(null);

  const filteredQuests = useMemo(() => {
    return quests.filter((q) => {
      if (statusFilter !== "all" && q.status !== statusFilter) return false;
      if (attributeFilter !== "all" && q.attribute_key !== attributeFilter) return false;
      return true;
    });
  }, [quests, statusFilter, attributeFilter]);

  function handleCreateOrEdit(data: QuestInput) {
    setIsSubmitting(true);
    const reward = DIFFICULTY_REWARDS[data.difficulty];

    setTimeout(() => {
      if (editingQuest) {
        setQuests((prev) =>
          prev.map((q) =>
            q.id === editingQuest.id
              ? { ...q, ...data, xp: reward.xp, gold: reward.gold }
              : q
          )
        );
      } else {
        setQuests((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            title: data.title,
            description: data.description,
            attribute_key: data.attribute_key,
            difficulty: data.difficulty,
            due_date: data.due_date,
            status: "active",
            xp: reward.xp,
            gold: reward.gold,
          },
        ]);
      }
      setIsSubmitting(false);
      setFormOpen(false);
      setEditingQuest(null);
    }, 400); // simulated latency — real version awaits the RPC round-trip
  }

 function handleComplete(id: string) {
  const quest = quests.find((q) => q.id === id);
  if (!quest || quest.status === "completed") return;

  setQuests((prev) =>
    prev.map((q) => (q.id === id ? { ...q, status: "completed" } : q))
  );
  setCelebration({ xp: quest.xp, gold: quest.gold });

  const newXp = profileXp + quest.xp;
  let newLevel = profileLevel;
  while (newXp >= xpRequiredForLevel(newLevel)) {
    newLevel++;
  }
  setProfileXp(newXp);
  if (newLevel > profileLevel) {
    setLevelUp({ from: profileLevel, to: newLevel });
    setProfileLevel(newLevel);
  }
}

  function handleDeleteConfirmed() {
    if (!deletingQuest) return;
    setQuests((prev) => prev.filter((q) => q.id !== deletingQuest.id));
    setDeletingQuest(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-display text-2xl font-bold text-ink">Quests</h1>
        <button
          onClick={() => {
            setEditingQuest(null);
            setFormOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-coral-500 text-white text-sm font-semibold hover:bg-coral-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Quest
        </button>
      </div>

      <QuestFilters
        status={statusFilter}
        attribute={attributeFilter}
        onStatusChange={setStatusFilter}
        onAttributeChange={setAttributeFilter}
      />

      {isLoading ? (
        <QuestSkeleton />
      ) : filteredQuests.length === 0 ? (
        <div className="glass-panel-sm p-10 text-center">
          <ScrollText className="w-8 h-8 text-ink/20 mx-auto mb-3" />
          <p className="text-ink/60 text-sm font-medium">No quests match these filters.</p>
          <p className="text-ink/40 text-xs mt-1">Try a different filter or create a new quest.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredQuests.map((quest) => (
            <QuestItem
              key={quest.id}
              quest={quest}
              onComplete={handleComplete}
              onEdit={(q) => {
                setEditingQuest(q);
                setFormOpen(true);
              }}
              onDelete={setDeletingQuest}
            />
          ))}
        </div>
      )}

      <QuestFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingQuest(null);
        }}
        onSubmit={handleCreateOrEdit}
        isSubmitting={isSubmitting}
        defaultValues={
  editingQuest
    ? {
        title: editingQuest.title,
        description: editingQuest.description,
        due_date: editingQuest.due_date,
        attribute_key: editingQuest.attribute_key as QuestInput["attribute_key"],
        difficulty: editingQuest.difficulty as QuestInput["difficulty"],
      }
    : undefined
}
      />

      <ConfirmDeleteDialog
        open={!!deletingQuest}
        questTitle={deletingQuest?.title ?? ""}
        onCancel={() => setDeletingQuest(null)}
        onConfirm={handleDeleteConfirmed}
      />

      {celebration && (
        <CelebrationToast
          xp={celebration.xp}
          gold={celebration.gold}
          onDone={() => setCelebration(null)}
        />
      )}

      {levelUp && (
  <LevelUpModal
    previousLevel={levelUp.from}
    newLevel={levelUp.to}
    onContinue={() => setLevelUp(null)}
  />
)}
    </div>
  );
}