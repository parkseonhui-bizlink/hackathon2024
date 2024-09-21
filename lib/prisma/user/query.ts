import { prisma } from '../prisma';

export async function getUserId(username: string) {
  const user = await prisma.user.findFirst({
    where: {
      name: username,
    },
  });
  return user?.id;
}
