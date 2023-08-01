import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import SearchableTable from '../../hooks/useTable';
import { Heading } from '@chakra-ui/react';
import { useCompanyConfig } from './config';
import { getDictionaryList } from '@/api/dictionary';

const Company = () => {
  const { operatingButton, COLUMNS } = useCompanyConfig();

  useEffect(() => {}, []);
  return (
    <Flex h={'100%'} position={'relative'} direction={'column'}>
      {/* 模型列表 */}
      <Box position={'relative'} m={5} display="flex" justifyContent={'flex-start'}>
        {/* <CompanySearch /> */}
        {/* {modelId && <ModelDetail modelId={modelId} isPc={isPc} />} */}
        <Heading>字典管理</Heading>
      </Box>

      <Box flex={1} h={'100%'} position={'relative'} m={5}>
        {/* <CompanyTable /> */}
        <SearchableTable
          listApi={getDictionaryList}
          columns={COLUMNS}
          operatingButton={operatingButton}
        />
        {/* {modelId && <ModelDetail modelId={modelId} isPc={isPc} />} */}
      </Box>
    </Flex>
  );
};
export default Company;
