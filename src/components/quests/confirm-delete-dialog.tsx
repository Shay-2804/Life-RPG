"use client";

import { AlertTriangle } from "lucide-react";

export function ConfirmDeleteDialog({
  open,
  questTitle,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  questTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/20 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-title"
      onClick={onCancel}
    >
      <div
        className="glass-panel w-full max-w-sm p-6 animate-pop-in text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-coral-50 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-coral-500" />
        </div>
        <h2 id="delete-title" className="font-display text-lg font-bold text-ink">
          Delete this quest?
        </h2>
        <p className="text-sm text-ink/60 mt-2">
          &quot;{questTitle}&quot; will be permanently removed. This can&apos;t be undone.
        </p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl bg-white/70 text-ink font-medium hover:bg-white/90 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-coral-500 text-white font-semibold hover:bg-coral-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}