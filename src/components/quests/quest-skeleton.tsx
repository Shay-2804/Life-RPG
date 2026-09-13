export function QuestSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-panel-sm p-4 flex items-center gap-3 animate-pulse">
          <div className="w-5 h-5 rounded-full bg-white/60 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 bg-white/60 rounded w-1/3" />
            <div className="h-2.5 bg-white/50 rounded w-1/4" />
          </div>
          <div className="h-5 w-16 bg-white/60 rounded-full shrink-0" />
        </div>
      ))}
    </div>
  );
}