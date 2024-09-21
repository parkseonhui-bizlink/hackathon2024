import { prisma } from '../prisma';

export const getProjectRole = async (projectId: number) => {
  const projectRoles = await prisma.projectRole.findMany({
    where: {
      projectId,
    },
  });
  return projectRoles;
};

export const getAllProjectRoles = async () => {
  const projectRoles = await prisma.projectRole.findMany();
  return projectRoles;
};

export const increaseProjectRole = async (
  projectId: number,
  roleName: string,
  currentCount: number,
) => {
  const projectRole = await prisma.projectRole.update({
    where: {
      projectId_roleName: {
        projectId: projectId,
        roleName: roleName,
      },
    },
    data: {
      current: currentCount + 1,
    },
  });
};

export const decreaseProjectRole = async (
  projectId: number,
  roleName: string,
  currentCount: number,
) => {
  const projectRole = await prisma.projectRole.update({
    where: {
      projectId_roleName: {
        projectId: projectId,
        roleName: roleName,
      },
    },
    data: {
      current: currentCount - 1,
    },
  });
};
