import { getUserId } from '@/lib/prisma/user/query';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } },
) {
  const userId = await getUserId(params.username);
  if (userId) {
    const cookieStore = cookies();
    cookieStore.set('username', params.username);
    cookieStore.set('userId', userId.toString());
    return NextResponse.json({ status: 'ok' });
  } else {
    return NextResponse.json({ status: 'error' });
  }
}
