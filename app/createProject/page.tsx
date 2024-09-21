import { Page } from '@/components/CreateProjectPage';
import { ProjectCreateData } from '@/lib/prisma/project';
import { ProjectStatus } from '@/types/const';
import { cookies } from 'next/headers';

export default function CreateProject({
  searchParams,
}: {
  searchParams?: {
    title: string;
    teamSize: string;
    selectedRoles: string[];
    selectedSkills: string[];
    description: string;
  };
}) {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value || '';
  if (searchParams) {
    // createProject
    // export type ProjectCreateData = {
    //   title: string;
    //   description: string;
    //   ownerId: number;
    //   status: ProjectStatus;
    //   categories: string[];
    //   skills: string[];
    //   memberCount: number;
    // };
    const projectCreateData: ProjectCreateData = {
      title: searchParams.title,
      memberCount: parseInt(searchParams.teamSize),
      categories: searchParams.selectedRoles,
      skills: searchParams.selectedSkills,
      description: searchParams.description,
      ownerId: parseInt(userId),
      status: ProjectStatus.募集,
    };
  }
  return (
    <div>
      <Page />
    </div>
  );
}
