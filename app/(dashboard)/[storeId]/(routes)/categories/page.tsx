import { format } from 'date-fns';
import prismadb from '@/lib/prismadb';

import { CategoryColumn } from './components/categoryColumns';
import CategoriesClient from './components/categoriesClient';

const CategoriesPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const { format } = require('date-fns');
  const formattedCategoriess: CategoryColumn[] =
    categories.map((item) => ({
      id: item.id,
      name: item.name,
      billboardLabel: item.billboard.label,
      createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategoriess} />
      </div>
    </div>
  );
};

export default CategoriesPage;
