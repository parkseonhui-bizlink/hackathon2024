'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, Search, User, Calendar } from 'lucide-react';
import { Category, Areas, Skills } from '@/types/const';
export function Page({
  projects,
  allProjectRoles,
}: {
  projects: any;
  allProjectRoles: any;
}) {
  const projectIdRolesMap = {};
  allProjectRoles.forEach((projectRole) => {
    if (!projectIdRolesMap[projectRole.projectId]) {
      projectIdRolesMap[projectRole.projectId] = [];
    }
    projectIdRolesMap[projectRole.projectId].push(projectRole);
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const availableRoles = allProjectRoles
      .filter(role =>
        areaFilter === 'all' ||
        projects.some(project =>
          project.id === role.projectId &&
          project.areas.includes(areaFilter)
        )
      )
      .map(role => role.roleName);

    setAvailableRoles([...new Set(availableRoles)]);
  }, [areaFilter, projects, allProjectRoles]);

  const filteredProjects = projects.filter(project => {
    // タイトルまたはスキルでの検索
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    // エリアフィルター
    const matchesArea = areaFilter === 'all' || project.areas.includes(areaFilter);

    // ロール（カテゴリー）フィルター
    const projectRoles = allProjectRoles.filter(role => role.projectId === project.id);
    const matchesRole = roleFilter === 'all' || projectRoles.some(role => role.roleName === roleFilter);

    return matchesSearch && matchesArea && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">プロジェクト一覧</h1>
          <Button
            onClick={() => router.push('/createProject')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            プロジェクト作成
          </Button>
        </div>

        <Card className="mb-6 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-row gap-4">
              {/* エリア検索 */}
              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="エリアで絞り込み" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべてのエリア</SelectItem>
                  {Object.values(Areas).map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* 職種検索 */}
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="職種で絞り込み" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべての職種</SelectItem>
                  {Object.values(Category).map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="プロジェクトやスキルを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
            </div >
          </CardContent >
        </Card >

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="text-sm text-gray-600 mb-2">
                  エリア:
                  <div className="flex flex-wrap gap-2">
                    {project.areas.map((area) => (
                      <span
                        key={area}
                        className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  職種:
                  <div className="flex flex-wrap gap-2">
                    {projectIdRolesMap[project.id]?.map((category, index) => (
                      <span
                        key={`${category.roleName}_${index}`}
                        className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                      >
                        {category.roleName}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  スキル:
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <div className="flex flex-wrap gap-2">
                    募集人数:{' '}
                    {projectIdRolesMap[project.id]?.reduce(
                      (prev, cur, index) => {
                        return index == 0 ? cur.total : prev + cur.total;
                      },
                      0,
                    )}
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  {/* ユーザー名と日付 */}
                  <div className="flex flex-col gap-1 w-[50%]">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1 text-purple-600" />
                      {project.owner_name}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1 text-purple-600" />
                      {project.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                  <Button
                    className="w-[50%] py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={() => router.push(`/project/${project.id}`)}
                  >
                    詳細を見る
                  </Button>
                </div>
              </CardContent>
            </Card >
          ))
          }
        </div >
      </div >
    </div >
  );
}
