import Link from "next/link";
import { Dumbbell, BookOpen, CheckCircle2, Palette, Heart, Sparkles, Trophy, Flame } from "lucide-react";
import { BackgroundBlobs } from "@/components/layout/background-blobs";

export default function LandingPage() {
  return (
    <div className="relative">
      <BackgroundBlobs />

      {/* Nav */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <span className="font-display text-xl font-bold text-ink">Life RPG</span>
        <div className="flex items-center gap-3">
          <Link href="/login" className="px-4 py-2 text-sm font-medium text-ink/70 hover:text-ink transition-colors">
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 text-sm font-semibold text-white bg-coral-500 rounded-full shadow-glass-sm hover:bg-coral-600 transition-colors"
          >
            Start your quest
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-24 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-ink leading-tight">
          Your life, playable.
        </h1>
        <p className="mt-6 text-lg text-ink/70 max-w-xl mx-auto">
          Turn workouts, reading, and daily routines into quests. Earn XP, grow your
          attributes, keep your streak alive, and actually look forward to your to-do list.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className="px-7 py-3 text-base font-semibold text-white bg-coral-500 rounded-full shadow-glass hover:bg-coral-600 transition-colors"
          >
            Create your character
          </Link>
        </div>
      </section>

      {/* Progression preview */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="glass-panel p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-ink/60">Level 7 Adventurer</p>
              <p className="font-display text-2xl font-bold text-ink">1,240 XP</p>
            </div>
            <div className="flex items-center gap-2 text-amber-500">
              <Flame className="w-5 h-5" />
              <span className="font-semibold">12 day streak</span>
            </div>
          </div>
          <div className="h-3 rounded-full bg-white/70 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-coral-400 to-amber-400 rounded-full" style={{ width: "64%" }} />
          </div>
          <p className="mt-2 text-sm text-ink/50">640 XP to level 8</p>
        </div>
      </section>

      {/* Attributes preview */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="font-display text-2xl font-bold text-ink text-center mb-10">
          Every task grows a part of you
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: Dumbbell, label: "Strength", sub: "Gym & movement", color: "text-coral-500" },
            { icon: BookOpen, label: "Intellect", sub: "Study & code", color: "text-teal-600" },
            { icon: CheckCircle2, label: "Discipline", sub: "Routines", color: "text-amber-500" },
            { icon: Palette, label: "Creativity", sub: "Making things", color: "text-coral-500" },
            { icon: Heart, label: "Wellness", sub: "Rest & mind", color: "text-teal-600" },
          ].map((a) => (
            <div key={a.label} className="glass-panel-sm p-5 text-center">
              <a.icon className={`w-7 h-7 mx-auto mb-3 ${a.color}`} />
              <p className="font-semibold text-ink text-sm">{a.label}</p>
              <p className="text-xs text-ink/50 mt-1">{a.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rewards preview */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="glass-panel p-8 flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-200/60 flex items-center justify-center shrink-0">
            <Trophy className="w-7 h-7 text-amber-500" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-ink">Spend gold on real rewards</h3>
            <p className="text-ink/60 text-sm mt-1">
              Unlock cosmetic themes, avatar frames, and titles as you complete quests.
              Nothing pay-to-win — everything earned.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 pb-24 text-center">
        <Sparkles className="w-8 h-8 text-coral-500 mx-auto mb-4" />
        <h2 className="font-display text-3xl font-bold text-ink">Ready to begin?</h2>
        <p className="mt-3 text-ink/60">Free forever. Your data, your progress, synced everywhere.</p>
        <Link
          href="/signup"
          className="mt-8 inline-block px-7 py-3 text-base font-semibold text-white bg-coral-500 rounded-full shadow-glass hover:bg-coral-600 transition-colors"
        >
          Get started
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/60 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-ink/50">
          <span>© 2026 Life RPG</span>
          <span>Built for the hackathon</span>
        </div>
      </footer>
    </div>
  );
}