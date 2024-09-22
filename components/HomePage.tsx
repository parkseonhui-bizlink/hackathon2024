'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { ProjectCard } from './project/ProjectCard';
import { OTBUserCard } from './otbUser/OTBUserCard';
import Link from 'next/link';

const slides = [
  {
    bgColor: 'bg-black',
    text: '"オチビ"になって、<br/>今すぐ始めよう！',
    subText:
      '迷わず、OTBで未来を創る一歩を踏み出そう！<br/>あなたのアイデアが、つながりを生み、新たな一歩が世界を変える。',
    imgSrc: '/img/mv/mv-img1.svg',
  },
  {
    bgColor: 'bg-purple-600',
    text: '新たな変化が始まる。<br/>"本気の副業"コミュニティ, OTB',

    subText:
      '本業だけじゃ満足できないなら、"オチビ"で始める新たな挑戦！<br/>新しい自分に出会うチャンスがここに。OTBで仲間と共に、次のステップへ。',
    imgSrc: '/img/mv/mv-img2.svg',
  },
];

export function Page({
  projects,
  allProjectRoles,
  users,
}: {
  projects: any;
  allProjectRoles: any;
  users: any;
}) {
  console.log(users, 'users!!!');
  const projectIdRolesMap = {};
  allProjectRoles.forEach((projectRole) => {
    if (!projectIdRolesMap[projectRole.projectId]) {
      projectIdRolesMap[projectRole.projectId] = [];
    }
    projectIdRolesMap[projectRole.projectId].push(projectRole);
  });
  // カテゴリーをプロジェクトに追加
  const projectsWithCategories = projects.map((project) => ({
    ...project,
    categories:
      projectIdRolesMap[project.id]?.map((role) => role.roleName) || [], // 修正箇所
  }));

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);

  useEffect(() => {
    const availableRoles = allProjectRoles
      .filter(
        (role) =>
          areaFilter === 'all' ||
          projects.some(
            (project) =>
              project.id === role.projectId &&
              project.areas.includes(areaFilter),
          ),
      )
      .map((role) => role.roleName);

    setAvailableRoles([...availableRoles]);
  }, [areaFilter, projects, allProjectRoles]);

  const filteredProjects = projectsWithCategories
    .filter((project: any) => {
      // タイトルまたはスキルでの検索
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      // エリアフィルター
      const matchesArea =
        areaFilter === 'all' || project.areas.includes(areaFilter);

      // ロール（カテゴリー）フィルター
      const projectRoles = allProjectRoles.filter(
        (role) => role.projectId === project.id,
      );
      const matchesRole =
        roleFilter === 'all' ||
        projectRoles.some((role) => role.roleName === roleFilter);

      return matchesSearch && matchesArea && matchesRole;
    })
    .slice(0, 3);

  // ユーザーカード
  const filteredUsers = users.filter(
    (user) =>
      (user.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === 'all' || user.skills.includes(roleFilter)) &&
      (areaFilter === 'all' || user.areas.includes(areaFilter)),
  );
  return (
    <>
      <section className="w-full h-[500px]">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          modules={[Pagination, Navigation, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="mySwiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className={`${slide.bgColor} w-full h-[500px] flex items-center`}
              >
                <div className="flex w-full max-w-5xl mx-auto justify-between items-center">
                  <div className="text-white">
                    <p
                      className="text-4xl font-bold mb-4"
                      dangerouslySetInnerHTML={{ __html: slide.text }}
                    ></p>
                    <p
                      className="text-lg"
                      dangerouslySetInnerHTML={{ __html: slide.subText }}
                    ></p>
                  </div>
                  <div className="ml-10">
                    <img
                      src={slide.imgSrc}
                      alt={`Slide ${index + 1}`}
                      className="h-auto"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="max-w-7xl mx-auto py-16">
        <p className="text-xl font-bold mb-4">新しいプロジェクト</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      <section>
        <div className="bg-gradient-to-r from-[#200071] to-[#3D00D7] h-[120px] ">
          <div className="bg-[url('/img/top-bg.png')] bg-cover bg-center h-full">
            <div className="font-bold text-white text-2xl flex items-center h-full justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
              <p className="">今すぐオチビに登録する！</p>
              <Link
                href="#"
                className="font-bold text-white text-xl px-10 py-2 bg-black "
              >
                登録する
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto py-16">
        <p className="text-xl font-bold mb-4">ようこそOTBへ！</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredUsers.map((user) => (
            <OTBUserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </>
  );
}
