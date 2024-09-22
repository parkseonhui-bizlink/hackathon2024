'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { OTBUserCard } from './otbUser/OTBUserCard';
import { Category, Areas, Skills } from '@/types/const';

// 仮のユーザーデータ
const users = [
  {
    id: 1,
    name: 'USERNAME',
    status: 'プロジェクト参加中',
    skills: ['人材プロ', 'フロントエンド', 'AI'],
  },
  {
    id: 2,
    name: 'USERNAME',
    status: 'プロジェクト参加中',
    skills: ['バックエンド', 'AI'],
  },
  {
    id: 3,
    name: 'USERNAME',
    status: 'プロジェクト参加中',
    skills: ['CEO', 'デザイン', 'マーケティング'],
  },
  {
    id: 4,
    name: 'USERNAME',
    status: 'プロジェクト参加中',
    skills: ['人材プロ', 'フロントエンド', 'AI'],
  },
  {
    id: 5,
    name: 'USERNAME',
    status: 'プロジェクト参加中',
    skills: ['バックエンド', 'AI'],
  },
  {
    id: 6,
    name: 'USERNAME',
    status: 'プロジェクト参加中',
    skills: ['CEO', 'デザイン', 'マーケティング'],
  },
  {
    id: 7,
    name: 'USERNAME',
    status: 'プロジェクト参加中',
    skills: ['バックエンド', 'AI'],
  },
  {
    id: 8,
    name: 'USERNAME',
    status: 'プロジェクト参加中',
    skills: ['CEO', 'デザイン', 'マーケティング'],
  },
  {
    id: 9,
    name: 'USERNAME',
    status: 'プロジェクト参加中',
    skills: ['人材プロ', 'フロントエンド', 'AI'],
  },
  {
    id: 10,
    name: 'USERNAME',
    status: 'プロジェクト参加中',
    skills: ['バックエンド', 'AI'],
  },
  {
    id: 11,
    name: 'USERNAME',
    status: 'プロジェクト参加中',
    skills: ['CEO', 'デザイン', 'マーケティングマーケティングマーケティング'],
  },
  {
    id: 12,
    name: 'USERNAME',
    status: 'プロジェクト参加中',
    skills: ['人材プロ', 'フロントエンド', 'AI'],
  },
];

export function Page({ users }: { users: any }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [areaFilter, setAreaFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const availableRoles = useMemo(() => {
    const roles = new Set(users.flatMap((user) => user.skills));
    return ['all', ...Array.from(roles)];
  }, [users]);

  const availableAreas = useMemo(() => {
    const areas = new Set(users.flatMap((user) => user.areas));
    return ['all', ...Array.from(areas)];
  }, [users]);

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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            チームメンバー募集とキャリア相談も
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-200 h-48 rounded-lg"></div>
            <div className="bg-gray-200 h-48 rounded-lg"></div>
          </div>
        </header>

        <Card className="mb-6 shadow-md">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">OTBユーザー検索</h2>
            <div className="flex flex-row gap-4">
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
                placeholder="キーワードで検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredUsers.map((user) => (
            <OTBUserCard user={user} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-2 rounded">
            MORE ▼
          </Button>
        </div>
      </div>
    </div>
  );
}
