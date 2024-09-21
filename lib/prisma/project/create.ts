import { ProjectStatus } from '@/types/const';
import { prisma } from '../prisma';
import { ProjectCreateData } from '../project';

export async function createProject(data: ProjectCreateData) {
  // transaction should be implemented here
  const createdProject = await prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      ownerId: data.ownerId,
      status: ProjectStatus[data.status],
      skills: data.skills,
    },
  });
  await prisma.projectOwner.create({
    data: {
      userId: data.ownerId,
      projectId: createdProject.id,
    },
  });
  await Promise.all(
    data.categories.map((category) => {
      return prisma.projectRole.create({
        data: {
          projectId: createdProject.id,
          current: 0,
          roleName: category.role,
          total: parseInt(category.count),
        },
      });
    }),
  );

  return createdProject.id;
}
