import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
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
      userId,
    },
  });
  // si on a un store donc on va redirect to dashboard pages.tsx
  if (store) {
    redirect(`/${store.id}`);
  }

  return (
    <>
      {children}
    </>
  );
}
