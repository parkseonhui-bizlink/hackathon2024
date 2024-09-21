'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export function Page() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // ここで認証ロジックを実装
    console.log('Login attempt', { username });

    const response = await fetch(`/api/login/${username}`);
    const data = await response.json();

    if (data.status === 'ok') {
      router.push(`/projectList`);
    } else {
      alert('ログインに失敗しました');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-xl">
        <Card className="border-none shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight text-center">
              Welcome
            </CardTitle>
            <CardDescription className="text-center">
              Enter your username to login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Sign In
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Do not have an account?
                <a href="#" className="text-purple-600 hover:underline">
                  Sign up
                </a>
              </p>
              <p className="text-sm text-gray-600">※この機能はありません。</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
