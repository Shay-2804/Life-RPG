export function InventorySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="glass-panel-sm p-4 space-y-3 animate-pulse">
          <div className="w-11 h-11 rounded-xl bg-white/60" />
          <div className="h-3 bg-white/60 rounded w-2/3" />
          <div className="h-2.5 bg-white/50 rounded w-full" />
          <div className="h-8 bg-white/60 rounded-lg" />
        </div>
      ))}
    </div>
  );
}