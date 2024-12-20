'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Billboard } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { BillboardColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardsClient: React.FC<BillboardClientProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() =>
            router.push(`/${params.storeId}/billboards/new`)
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="mt-4" />
      <DataTable
        columns={columns}
        data={data}
        searchKey="label"
      />
      <Heading
        title="API"
        description="Api calls for Billboards"
      />
      <Separator />
      <ApiList
        entityName="billboards"
        entityIdName="billboardsId"
      />
    </>
  );
};

export default BillboardsClient;
