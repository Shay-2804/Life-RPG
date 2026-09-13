import { ProfileHeader } from "@/components/dashboard/profile-header";
import { AttributeBars } from "@/components/dashboard/attribute-bars";
import { EquippedSummary } from "@/components/dashboard/equipped-summary";
import { ActivityList, type ActivityEntry } from "@/components/dashboard/activity-list";
import { BadgeCard, type BadgeItem } from "@/components/shop/badge-card";

// PLACEHOLDER data — replaced by real profile/attributes/quest_completions
// and user_badges queries once Phase 2's RPCs and reads are wired in.
const placeholderProfile = {
  username: "adventurer_01",
  level: 3,
  totalXp: 420,
  currentStreak: 4,
  longestStreak: 9,
  equippedTitle: "The Disciplined",
  equippedTheme: "Sunrise Theme",
  equippedAvatarFrame: undefined,
};

const placeholderAttributes = [
  { key: "strength" as const, label: "Strength", level: 2, xp: 180 },
  { key: "intellect" as const, label: "Intellect", level: 4, xp: 610 },
  { key: "discipline" as const, label: "Discipline", level: 3, xp: 340 },
  { key: "creativity" as const, label: "Creativity", level: 1, xp: 40 },
  { key: "wellness" as const, label: "Wellness", level: 2, xp: 150 },
];

const placeholderBadges: BadgeItem[] = [
  { id: "b1", name: "7 Day Streak", description: "Kept a streak for a week", earned: true },
  { id: "b3", name: "First Quest", description: "Completed your first quest", earned: true },
  { id: "b2", name: "Level 10", description: "Reached level 10", earned: false },
];

const placeholderActivity: ActivityEntry[] = [
  { id: "1", questTitle: "Read 20 pages", attribute: "intellect", xp: 40, gold: 20, timestamp: "Today, 9:14 AM" },
  { id: "2", questTitle: "Gym session", attribute: "strength", xp: 75, gold: 35, timestamp: "Yesterday, 6:02 PM" },
  { id: "3", questTitle: "Make the bed", attribute: "discipline", xp: 20, gold: 10, timestamp: "Yesterday, 7:30 AM" },
];

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <ProfileHeader
        username={placeholderProfile.username}
        level={placeholderProfile.level}
        totalXp={placeholderProfile.totalXp}
        equippedTitle={placeholderProfile.equippedTitle}
        currentStreak={placeholderProfile.currentStreak}
        longestStreak={placeholderProfile.longestStreak}
      />

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-display text-lg font-bold text-ink">Attributes</h2>
          <AttributeBars attributes={placeholderAttributes} />
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-ink">Equipped</h2>
          <EquippedSummary
            theme={placeholderProfile.equippedTheme}
            avatarFrame={placeholderProfile.equippedAvatarFrame}
            title={placeholderProfile.equippedTitle}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-lg font-bold text-ink">Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {placeholderBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-lg font-bold text-ink">Recent Activity</h2>
        <ActivityList entries={placeholderActivity} />
      </div>
    </div>
  );
}