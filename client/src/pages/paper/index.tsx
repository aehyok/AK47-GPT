import { Card, CardHeader, Heading } from '@chakra-ui/react';
import { useTableConfig } from './config';
import SearchableTable from '@/hooks/useTable';
import { getPaperListApi } from '@/api/paper';

const Paper = () => {
  const { operatingButton, COLUMNS } = useTableConfig();

  return (
    <Card m={4} px={[3, 6]} py={4}>
      <CardHeader px={0}>
        <Heading size="lg">考卷管理</Heading>
      </CardHeader>
      <SearchableTable
        listApi={getPaperListApi}
        columns={COLUMNS}
        operatingButton={operatingButton}
      />
    </Card>
  );
};

export default Paper;
