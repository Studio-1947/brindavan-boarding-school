import { staffSlug, type StaffMember } from '@/data/staff';
import { ProfileCard } from './ProfileCard';

type FacultyGridProps = {
  members: StaffMember[];
  /** Make each card a link to that person's page under /faculty. Only teachers have pages. */
  linked?: boolean;
};

export function FacultyGrid({ members, linked = false }: FacultyGridProps) {
  return (
    <ul className="faculty-grid">
      {members.map((member) => (
        <ProfileCard
          key={member.name}
          member={member}
          href={linked ? `/faculty/${staffSlug(member)}` : undefined}
        />
      ))}
    </ul>
  );
}
