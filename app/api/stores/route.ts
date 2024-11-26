import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    /// get current user with clerck auth
    const { userId } = auth();

    /// extract body
    const body = await req.json();

    /// extract name store from body
    const { name } = body;

    /// check si on user
    if (!userId) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }
    /// check name like user
    if (!name) {
      return new NextResponse('Unauthorized', {
        status: 400,
      });
    }

    /// now create a store
    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse('Interal error', {
      status: 500,
    });
  }
}
