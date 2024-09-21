import { decreaseProjectRole } from '@/lib/prisma/projectRole/query';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    decreaseProjectRole(body.projectId, body.roleName, body.currentCount);
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    return NextResponse.json({ status: 'error' });
  }
}
