'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Project, ProjectRole } from '@prisma/client';

// 仮のプロジェクトデータ
// const project = {
//   id: 1,
//   title: 'モバイルアプリ開発プロジェクト',
//   description:
//     'iOS、Android、Webフロントエンドの開発者を募集しています。革新的なモバイルアプリを一緒に作りましょう。',
//   roles: [
//     { name: 'Android', current: 0, total: 1 },
//     { name: 'iOS', current: 0, total: 1 },
//     { name: 'Webフロントエンド', current: 0, total: 2 },
//   ],
//   skills: ['React Native', 'Swift', 'Kotlin', 'React'],
//   teamSize: 5,
// };

export function Page({
  projectRoles,
  projectFromDB,
  userInProjectRole,
}: {
  projectRoles: ProjectRole[];
  projectFromDB: Project;
  userInProjectRole: {
    userId: number;
    role: string;
    projectId: number;
  }[];
}) {
  console.log(JSON.stringify(userInProjectRole, null, 4));

  const roles = projectRoles.map((role) => ({
    name: role.roleName,
    current: role.current,
    total: role.total,
  }));
  const project = {
    id: projectFromDB.id,
    title: projectFromDB.title,
    description: projectFromDB.description,
    skills: projectFromDB.skills,
    teamSize: roles.reduce((acc, role) => acc + role.total, 0),
    roles: roles,
  };

  const [openRole, setOpenRole] = useState<string | null>(null);
  const [appliedRole, setAppliedRole] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const [roleCounts, setRoleCounts] = useState(
    project.roles.map((role) => {
      return { roleName: role.name, count: role.current };
    }),
  );

  const handleApply = (role: string) => {
    setOpenRole(role);
    setDialogOpen(true);
  };

  const confirmApply = () => {
    const role = roles.find((role) => role.name == openRole);
    const currentCount = roleCounts.find(
      (role) => role.roleName == openRole,
    ).count;
    if (currentCount >= 0 && currentCount + 1 <= role.total) {
      fetch(`/api/projectRole/increase`, {
        method: 'POST',
        body: JSON.stringify({
          projectId: project.id,
          roleName: openRole,
          currentCount: roles.find((role) => role.name == openRole).current,
        }),
      })
        .then((response) => {
          response.json().then((data) => {
            if (data.status === 'ok') {
              if (openRole) {
                setAppliedRole(openRole);
              }
              setOpenRole(null);
              setDialogOpen(false);
              const newRoleCounts = [...roleCounts];
              newRoleCounts.find(
                (roleCount) => roleCount.roleName == role.name,
              ).count += 1;
              setRoleCounts(newRoleCounts);
            } else {
              console.error(data.status);
              alert('サーバーエラー!');
            }
          });
        })
        .catch((error) => {
          console.error(JSON.stringify(error, null, 4));
          alert('サーバーエラー!');
        });
    }
  };

  const handleCancel = (roleName) => {
    const role = roles.find((role) => role.name == roleName);
    const currentCount = roleCounts.find(
      (role) => role.roleName == roleName,
    ).count;
    console.log('currentCount: ' + currentCount);
    if (currentCount >= 0 && currentCount - 1 >= 0) {
      console.log('here: ' + currentCount);
      fetch(`/api/projectRole/decrease`, {
        method: 'POST',
        body: JSON.stringify({
          projectId: project.id,
          roleName: roleName,
          currentCount: currentCount,
        }),
      })
        .then((response) => {
          response.json().then((data) => {
            if (data.status === 'ok') {
              setAppliedRole(null);
              const newRoleCounts = [...roleCounts];
              newRoleCounts.find(
                (roleCount) => roleCount.roleName == role.name,
              ).count -= 1;
              setRoleCounts(newRoleCounts);
            } else {
              console.error(data.status);
              alert('サーバーエラー!');
            }
          });
        })
        .catch((error) => {
          console.error(JSON.stringify(error, null, 4));
          alert('サーバーエラー!');
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {project.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">必要なスキル:</h3>
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
            <p className="text-gray-600">チーム人数: {project.teamSize}人</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">
              募集状況
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.roles.map((role) => (
                <div
                  key={role.name}
                  className="flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold">{role.name}</span>
                    <span className="ml-2 text-gray-600">
                      {
                        roleCounts.find(
                          (roleCount) => roleCount.roleName == role.name,
                        ).count
                      }
                      /{role.total}
                    </span>
                  </div>
                  {appliedRole === role.name ? (
                    <Button
                      onClick={() => handleCancel(role.name)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      キャンセル
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleApply(role.name)}
                      disabled={appliedRole !== null}
                      className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white
                        ${appliedRole !== null ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      応募する
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>{openRole}への応募確認</DialogTitle>
            </DialogHeader>
            <p className="py-4">本当に{openRole}の役割に応募しますか？</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                キャンセル
              </Button>
              <Button
                onClick={confirmApply}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                確認
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
