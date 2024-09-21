import { Page } from '@/components/CreateProjectPage';
import { ProjectCreateData } from '@/lib/prisma/project';
import { createProject } from '@/lib/prisma/project/create';
import { ProjectStatus } from '@/types/const';
import { cookies } from 'next/headers';

export default async function CreateProject({
  searchParams,
}: {
  searchParams?: {
    title?: string;
    teamSize?: string;
    selectedRoles?: string;
    selectedSkills?: string;
    description?: string;
  };
}) {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value || '';
  let projectCreated: boolean | undefined = undefined;
  if (
    searchParams &&
    Object.keys(searchParams).some((key) => searchParams[key])
  ) {
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
    try {
      const projectCreateData: ProjectCreateData = {
        title: searchParams.title,
        categories: JSON.parse(searchParams.selectedRoles),
        skills: JSON.parse(searchParams.selectedSkills),
        description: searchParams.description,
        ownerId: parseInt(userId),
        status: ProjectStatus.募集,
      };
      const project = await createProject(projectCreateData);
      console.log('project created: ' + project);
      if (project) {
        projectCreated = true;
      } else {
        projectCreated = false;
      }
    } catch (error) {
      console.log('project creation failed with error: ' + error);
      projectCreated = false;
    }
  }
  return (
    <div>
      <Page projectCreated={projectCreated} />
    </div>
  );
}
