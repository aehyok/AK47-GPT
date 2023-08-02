import React, { useCallback, useMemo, useState } from 'react';
import { Box, Flex, useTheme, Input, IconButton, Tooltip, Image } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import MyIcon from '@/components/Icon';
import { postCreateModel } from '@/api/model';
import { useLoading } from '@/hooks/useLoading';
import { useToast } from '@/hooks/useToast';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/store/user';
import { useDictionaryStore } from '@/store/dictionary';
import { getDictionaryList } from '@/api/dictionary';
import { resolve } from 'path';
import type { PagingData } from '../types/index';
import SearchableTable from '@/hooks/useTable';
import { columnsType } from '@/types/index.d';

const GroupList = <T = any,>({
  companyId,
  clickColumns
}: {
  companyId: number;
  clickColumns: (data: { [key: string]: string }) => void;
}) => {
  const theme = useTheme();
  const { Loading, setIsLoading } = useLoading();
  const { myModels, myCollectionModels, loadMyModels, refreshModel } = useUserStore();
  // const { dictionary, dictionaryList } = useDictionaryStore();
  // const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<T[]>([]);
  const COLUMNS: Array<columnsType> = [
    {
      name: 'name',
      label: '名称',
      valueType: 'text',
      required: true
    },
    {
      name: 'code',
      label: '编码',
      valueType: 'text',
      required: true
    }
  ];
  /* 加载模型 */
  const { isLoading } = useQuery(['loadModels'], () => loadMyModels(false));

  return (
    <Flex
      position={'relative'}
      flexDirection={'column'}
      w={'100%'}
      h={'100%'}
      bg={'white'}
      borderRight={['', theme.borders.base]}
    >
      <Box flex={'1 0 0'} h={0} overflow={'overlay'} mt={8}>
        <SearchableTable
          listApi={getDictionaryList}
          columns={COLUMNS}
          clickColumns={clickColumns}
          // operatingButton={operatingButton}
        />
      </Box>
      <Loading loading={isLoading} fixed={false} />
    </Flex>
  );
};

export default GroupList;
