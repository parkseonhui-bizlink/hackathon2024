import { Page } from '@/components/ProjectIdPage';
import { getAllProjects, getProjectById } from '@/lib/prisma/project/getAll';
import { getProjectRole } from '@/lib/prisma/projectRole/query';

export default async function Project({ params }: { params: { id: string } }) {
  const projectRoles = await getProjectRole(parseInt(params.id));
  const project = await getProjectById(parseInt(params.id));

  return (
    <div>
      <Page projectRoles={projectRoles} projectFromDB={project} />
    </div>
  );
}
