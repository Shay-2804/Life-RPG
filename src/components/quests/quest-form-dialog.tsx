"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2 } from "lucide-react";
import { questSchema, type QuestInput } from "@/lib/validation/quest";
import { ATTRIBUTES, DIFFICULTY_REWARDS } from "@/lib/game/constants";

export function QuestFormDialog({
  open,
  onClose,
  onSubmit,
  isSubmitting,
  defaultValues,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: QuestInput) => void;
  isSubmitting: boolean;
  defaultValues?: Partial<QuestInput>;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<QuestInput>({
    resolver: zodResolver(questSchema),
    defaultValues: defaultValues ?? { attribute_key: "discipline", difficulty: "easy" },
  });

  const difficulty = watch("difficulty");

  if (!open) return null;

  function handleClose() {
    reset();
    onClose();
  }

  function submit(data: QuestInput) {
    onSubmit(data);
    reset();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/20 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quest-form-title"
      onClick={handleClose}
    >
      <div
        className="glass-panel w-full max-w-md p-6 animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="quest-form-title" className="font-display text-xl font-bold text-ink">
            {defaultValues ? "Edit Quest" : "New Quest"}
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="text-ink/40 hover:text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-ink mb-1.5">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              aria-invalid={!!errors.title}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-coral-400 text-ink placeholder:text-ink/30"
              placeholder="e.g. Read 20 pages"
            />
            {errors.title && <p className="text-coral-600 text-xs mt-1.5">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-ink mb-1.5">
              Description <span className="text-ink/40 font-normal">(optional)</span>
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-coral-400 text-ink placeholder:text-ink/30 resize-none"
              placeholder="Any notes..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="attribute_key" className="block text-sm font-medium text-ink mb-1.5">
                Attribute
              </label>
              <select
                id="attribute_key"
                {...register("attribute_key")}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-coral-400 text-ink"
              >
                {ATTRIBUTES.map((a) => (
                  <option key={a.key} value={a.key}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-ink mb-1.5">
                Difficulty
              </label>
              <select
                id="difficulty"
                {...register("difficulty")}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-coral-400 text-ink capitalize"
              >
                {Object.keys(DIFFICULTY_REWARDS).map((d) => (
                  <option key={d} value={d} className="capitalize">
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-xs text-ink/50">
            Reward:{" "}
            <span className="font-semibold text-coral-600">
              +{DIFFICULTY_REWARDS[difficulty]?.xp ?? 20} XP
            </span>{" "}
            /{" "}
            <span className="font-semibold text-amber-500">
              +{DIFFICULTY_REWARDS[difficulty]?.gold ?? 10} Gold
            </span>
          </p>

          <div>
            <label htmlFor="due_date" className="block text-sm font-medium text-ink mb-1.5">
              Due date <span className="text-ink/40 font-normal">(optional)</span>
            </label>
            <input
              id="due_date"
              type="date"
              {...register("due_date")}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-coral-400 text-ink"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-coral-500 text-white font-semibold hover:bg-coral-600 transition-colors disabled:opacity-60"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {defaultValues ? "Save changes" : "Create quest"}
          </button>
        </form>
      </div>
    </div>
  );
}