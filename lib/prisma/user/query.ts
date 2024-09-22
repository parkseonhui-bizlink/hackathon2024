import { Select } from '@radix-ui/react-select';
import { prisma } from '../prisma';

export async function getUserId(username: string) {
  const user = await prisma.user.findFirst({
    where: {
      name: username,
    },
  });
  return user?.id;
}

export async function getAllUser() {
  const users = await prisma.user.findMany({});
  return users;
};