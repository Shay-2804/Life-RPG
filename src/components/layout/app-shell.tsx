"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ScrollText, Package, User, LogOut, Store } from "lucide-react";
import { BackgroundBlobs } from "./background-blobs";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/quests", label: "Quests", icon: ScrollText },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/profile", label: "Profile", icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="relative min-h-screen flex">
      <BackgroundBlobs />

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 shrink-0 p-6 gap-8">
        <Link href="/dashboard" className="font-display text-xl font-bold text-ink px-2">
          Life RPG
        </Link>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/70 text-coral-600 shadow-glass-sm"
                    : "text-ink/60 hover:bg-white/40 hover:text-ink"
                }`}
              >
                <item.icon className="w-4.5 h-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink/50 hover:bg-white/40 hover:text-coral-600 transition-colors"
        >
          <LogOut className="w-4.5 h-4.5" />
          Log out
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-4 md:px-8 py-6 md:py-8 pb-24 md:pb-8 max-w-5xl mx-auto w-full">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-panel-sm mx-3 mb-3 rounded-2xl flex items-center justify-around py-2 z-10">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                isActive ? "text-coral-600" : "text-ink/50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}