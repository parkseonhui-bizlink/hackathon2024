import { Page } from '@/components/ProjectListPage';
import { getAllProjects } from '@/lib/prisma/project/getAll';
import { getAllProjectRoles } from '@/lib/prisma/projectRole/query';

export default async function ProjectList() {
  const projects = await getAllProjects();
  const projectRoles = await getAllProjectRoles();
  console.log(projects);
  return (
    <div>
      <Page projects={projects} allProjectRoles={projectRoles} />
    </div>
  );
}

// import { Page } from '@/components/ProjectListPage';
// import { getAllProjects } from '@/lib/prisma/project/getAll';

// const projects = [
//   { id: 1, title: 'Webアプリ開発', area: '東京', role: 'フロントエンド', skills: ['React', 'TypeScript'], username: '山田太郎', date: '2024-07-01', categories: ['プログラミング', 'フロントエンド'], createdAt: '2024-07-01' },
//   { id: 2, title: 'モバイルアプリデザイン', area: '大阪', role: 'デザイナー', skills: ['UI/UX', 'Figma'], username: '山田花子', date: '2024-08-01', categories: ['デザイン', 'UI/UX'], createdAt: '2024-08-01' },
//   { id: 3, title: 'ECプラットフォーム', area: '福岡', role: 'バックエンド', skills: ['Node.js', 'MongoDB'], username: '山辺郎', date: '2024-09-01', categories: ['プログラミング', 'バックエンド'], createdAt: '2024-09-01' },
//   { id: 4, title: 'AIチャットボット', area: '札幌', role: '機械学習', skills: ['Python', 'TensorFlow'], username: '小崎', date: '2024-09-01', categories: ['プログラミング', '機械学習'], createdAt: '2024-09-01' },
//   { id: 5, title: 'ブロックチェーンウォレット', area: '名古屋', role: 'ブロックチェーン開発者', skills: ['Solidity', 'Web3.js'], username: '山うち', date: '2024-11-01', categories: ['プログラミング', 'ブロックチェーン'], createdAt: '2024-11-01' },
// ]

// export default async function ProjectList() {
//   // const projects = await getAllProjects();
//   console.log(projects);
//   return (
//     <div>
//       <Page projects={projects} />
//     </div>
//   );
// }
