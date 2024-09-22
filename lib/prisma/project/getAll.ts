import { prisma } from '../prisma';

export async function getAllProjects() {
  const projects = await prisma.project.findMany({
    include: {
      owner: {
        take: 1,
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      ProjectUser: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return projects.map((project) => ({
    ...project,
    owner_name: project.owner[0]?.user.name || null,
    members: project.ProjectUser.map((pu) => pu.user.name),
  }));
}

export async function getProjectById(id: number) {
  const project = await prisma.project.findFirst({
    where: {
      id,
    },
  });
  return project;
}
