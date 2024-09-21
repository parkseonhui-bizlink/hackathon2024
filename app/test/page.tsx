import { createProject } from '@/lib/prisma/project/create';
import { ProjectStatus } from '@/types/const';

export default async function Test() {
  const projectId = await createProject({
    title: 'Test',
    description: 'Test',
    ownerId: 1,
    status: ProjectStatus.募集,
    memberCount: 1,
    categories: ['test', 'test2'],
    skills: ['test', 'test2'],
  });
  return <div>{`projectId: ${projectId}`}</div>;
}
