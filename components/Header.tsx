'use client';

import { useState } from 'react';
import { Montserrat } from '@next/font/google';
import Link from 'next/link';
import Image from 'next/image';
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
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PlusCircle, LogIn } from 'lucide-react';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export function HeaderComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement actual authentication logic
    console.log('Login attempt', { username });
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleCreateProject = () => {
    if (isLoggedIn) {
      router.push('/createProject');
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-[#200071] to-[#3D00D7] h-[120px] ">
        <div className="bg-[url('/img/header-bg.png')] bg-cover bg-center h-full">
          <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-bold text-white text-2xl flex items-center h-full">
            つながりが、新たな一歩を
          </p>
        </div>
      </div>
      <header className="bg-white shadow-md w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center flex-col">
              <Link href="/" className="font-bold text-xl text-gray-900">
                <Image
                  src="/img/OTBlogo.svg"
                  alt="OTB"
                  className=""
                  width={88}
                  height={54}
                />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-8 mr-4">
                <Link
                  href="/projectList"
                  className={`${montserrat.className} text-gray-500 hover:text-gray-900`}
                >
                  Project
                </Link>
                <Link
                  href="/otbUsers"
                  className={`${montserrat.className} text-gray-500 hover:text-gray-900`}
                >
                  OTB User
                </Link>
              </nav>
              <Button
                onClick={handleCreateProject}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                プロジェクト作成
              </Button>
              {isLoggedIn ? (
                <Button
                  onClick={handleLogout}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  ログアウト
                </Button>
              ) : (
                <Button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  ログイン
                </Button>
              )}
            </div>
          </div>
        </div>
        <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
          <DialogContent className="sm:max-w-[425px] bg-white">
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
                    Do not have an account?{' '}
                    <a href="#" className="text-purple-600 hover:underline">
                      Sign up
                    </a>
                  </p>
                  <p className="text-sm text-gray-600">
                    ※この機能はありません。
                  </p>
                </div>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </header>
    </>
  );
}
