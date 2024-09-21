import Footer from '@/components/Footer';
import './globals.css';
import { HeaderComponent } from '@/components/Header';
import { Montserrat } from '@next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata = {
  title: 'オープンチームビルダー - サイドプロジェクトプラットフォーム',
  description:
    'オープンプラットフォームを使用して、サイドプロジェクトに参加したい企画者、デザイナー、開発者を簡単に見つけ、職務、地域、技術スキルを基にした検索機能を活用し、適切なチームを構成できます。',
  keywords:
    'チームビルディング, サイドプロジェクト, オープンプラットフォーム, プロジェクト参加, 地域別検索, 職務検索, 技術スキル, コラボレーション, Next.js, Supabase, Prisma, Shadcn/ui, サービス開発, チーム構成, プロジェクト作成, プロジェクト募集',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <body className={montserrat.className}>
        <HeaderComponent />
        {children}
        <Footer />
      </body>
    </html>
  );
}
