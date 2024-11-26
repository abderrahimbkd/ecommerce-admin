import Navbar from '@/components/navbar';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  /// check si on est connecte
  const { userId } = auth();

  // sino redirect
  if (!userId) {
    redirect('/sign-in');
    }
    
    // si on a user don on a son id donc on va fetcher les stores

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });
    // si on a pas aucun store
    if (!store) {
        redirect('/')
    }

    return (
        <>
            <Navbar/>
            {children}
        </>
    )


}
