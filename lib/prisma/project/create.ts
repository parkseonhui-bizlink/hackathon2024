import { ProjectStatus } from '@/types/const';
import { prisma } from '../prisma';
import { ProjectCreateData } from '../project';

export async function createProject(data: ProjectCreateData) {
  const createdProject = await prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      memberCount: data.memberCount,
      ownerId: data.ownerId,
      status: ProjectStatus[data.status],
      categories: data.categories,
      skills: data.skills,
    },
  });
  await prisma.projectOwner.create({
    data: {
      userId: data.ownerId,
      projectId: createdProject.id,
    },
  });
  return createdProject.id;
}
