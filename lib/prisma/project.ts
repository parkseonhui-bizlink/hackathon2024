import { ProjectStatus } from '@/types/const';

export type ProjectCreateData = {
  title: string;
  description: string;
  ownerId: number;
  status: ProjectStatus;
  categories: string[];
  skills: string[];
  memberCount: number;
};
