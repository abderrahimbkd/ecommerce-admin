import { format } from 'date-fns';
import prismadb from '@/lib/prismadb';
import BillboardsClient from './components/BillboardsClient';
import { BillboardColumn } from './components/columns';

const BillboardsPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const { format } = require('date-fns');
  const formattedBillboards: BillboardColumn[] =
    billboards.map((item) => ({
      id: item.id,
      label: item.label,
      createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
