import { Page } from '@/components/ProjectListPage';
import { getAllProjects } from '@/lib/prisma/project/getAll';
import { getAllProjectRoles } from '@/lib/prisma/projectRole/query';

export default async function ProjectList() {
  const projects = await getAllProjects();
  const projectRoles = await getAllProjectRoles();
  return (
    <div>
      <Page projects={projects} allProjectRoles={projectRoles} />
    </div>
  );
}
