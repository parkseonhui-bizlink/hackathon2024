'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectCard } from './project/ProjectCard'
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

  // カテゴリーをプロジェクトに追加
  const projectsWithCategories = projects.map((project) => ({
    ...project,
    categories: projectIdRolesMap[project.id]?.map(role => role.roleName) || [], // 修正箇所
  }));

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const router = useRouter();

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

  const filteredProjects = projectsWithCategories.filter((project: any) => {
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
                  {Object.values(Areas).map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
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
                  {Object.values(Category).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="プロジェクトやスキルを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
