export const ATTRIBUTES = [
  { key: "strength", label: "Strength", icon: "Dumbbell", color: "coral" },
  { key: "intellect", label: "Intellect", icon: "BookOpen", color: "teal" },
  { key: "discipline", label: "Discipline", icon: "CheckCircle2", color: "amber" },
  { key: "creativity", label: "Creativity", icon: "Palette", color: "coral" },
  { key: "wellness", label: "Wellness", icon: "Heart", color: "teal" },
] as const;

export const DIFFICULTY_REWARDS = {
  easy: { xp: 20, gold: 10 },
  medium: { xp: 40, gold: 20 },
  hard: { xp: 75, gold: 35 },
  epic: { xp: 120, gold: 60 },
} as const;

export function xpRequiredForLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.65));
}

export function xpProgress(totalXp: number, level: number) {
  const currentLevelFloor = level > 1 ? xpRequiredForLevel(level - 1) : 0;
  const nextLevelXp = xpRequiredForLevel(level);
  const into = totalXp - currentLevelFloor;
  const needed = nextLevelXp - currentLevelFloor;
  return { into, needed, percent: Math.min(100, Math.round((into / needed) * 100)) };
}