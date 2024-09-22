import { Page } from '@/components/HomePage';
import { getAllProjects } from '@/lib/prisma/project/getAll';
import { getAllProjectRoles } from '@/lib/prisma/projectRole/query';
import { getAllUser } from '@/lib/prisma/user/query';

const Home = async () => {
  const projects = await getAllProjects();
  const projectRoles = await getAllProjectRoles();
  const users = await getAllUser();
  console.log(users, 'user');

  return (
    <main>
      <Page projects={projects} allProjectRoles={projectRoles} users={users} />
    </main>
  );
};

export default Home;
