import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
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
      return new NextResponse('Name is required', {
        status: 400,
      });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', {
        status: 400,
      });
    }

    // update store name
    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse('Interal error', {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', {
        status: 403,
      });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', {
        status: 400,
      });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_DELETE]', error);
    return new NextResponse('Internal error', {
      status: 500,
    });
  }
}
