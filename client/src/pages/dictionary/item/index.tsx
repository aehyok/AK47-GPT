import React, { useEffect, useState, useCallback } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import SearchableTable from '@/hooks/useTable';
import { Heading } from '@chakra-ui/react';
import { useDictionaryItemConfig } from './config';
import { getDictionaryItemList } from '@/api/dictionary';
import GroupList from './components/groupList';
import SideBar from '@/components/SideBar';

const Companys = () => {
  const [companyId, setCompanyId] = useState(1);
  const [parameter, setApiParameter] = useState({});
  const { operatingButton, COLUMNS } = useDictionaryItemConfig(parameter);
  const clickColumns = (item: { [key: string]: any }) => {
    // console.log('二百年后', item);
    setApiParameter({
      groupCode: item?.code
    });
    // setCompanyId(id);
    // const newData = userData.filter((res) => res.id === id);
    // console.log(newData, 'newData');
    // setTableData(newData);
  };
  // const clickColumns = useCallback(
  //   (item) => {
  //     setApiParameter({
  //       groupCode: item?.code
  //     });
  //   },
  //   [parameter]
  // );
  useEffect(() => {}, []);
  return (
    <Flex h={'100%'} position={'relative'}>
      <Box w={['500px', '400px']}>
        {/* <SideBar> */}
        <GroupList companyId={companyId} clickColumns={clickColumns} />
        {/* </SideBar> */}
      </Box>
      <Flex h={'100%'} flex={1} position={'relative'} direction={'column'}>
        <Box position={'relative'} m={5} display="flex" justifyContent={'flex-start'}>
          {/* <CompanySearch /> */}
          {/* {modelId && <ModelDetail modelId={modelId} isPc={isPc} />} */}
          <Heading>字典管理</Heading>
        </Box>

        <Box flex={1} h={'100%'} position={'relative'} m={5}>
          {/* <CompanyTable /> */}
          <SearchableTable
            listApi={getDictionaryItemList}
            columns={COLUMNS}
            operatingButton={operatingButton}
            apiParameter={parameter}
          />
          {/* {modelId && <ModelDetail modelId={modelId} isPc={isPc} />} */}
        </Box>
      </Flex>
    </Flex>
  );
};
export default Companys;
