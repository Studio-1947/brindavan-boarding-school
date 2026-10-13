import type { StaffMember } from '@/data/staff';
import { ProfileCard } from './ProfileCard';

export function FacultyGrid({ members }: { members: StaffMember[] }) {
  return (
    <ul className="faculty-grid">
      {members.map((member) => (
        <ProfileCard key={member.name} member={member} />
      ))}
    </ul>
  );
}
