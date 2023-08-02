import React, { ReactNode, useState, useMemo, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Box,
  Text,
  Flex,
  useDisclosure,
  useToast,
  useTheme
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import AlertDialogForm from './useAlertDialog';
// import { useOperationBtnHook } from '@/constants/company';
import { usePagination } from './usePagination';
import type { OperatingButtonType, columnsType } from '../types/index';
import { listParameterType } from '@/types/request';

import { UseMutateFunction } from '@tanstack/react-query/build/lib/types';

const SearchableTable = ({
  columns,
  operatingButton,
  listApi,
  clickColumns,
  apiParameter
}: {
  columns: Array<columnsType>;
  listApi: (data: listParameterType) => Promise<unknown>;
  operatingButton?: Array<OperatingButtonType>;
  clickColumns?: (data: { [key: string]: string }) => void;
  apiParameter?: Record<any, any>;
}) => {
  type formDataType = {
    formList: any;
    title: (val: { [key: string]: string }) => ReactNode | string;
    description: (val: { [key: string]: string }) => ReactNode | string;
    onClickType: string;
    onConfirm: (val: { [key: string]: string }) => Promise<boolean | string>;
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [formConfig, setFormConfig] = useState({} as formDataType);
  const [formValues, setFormValues] = useState({});
  const [firstDataID, setFirstDataID] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const theme = useTheme();

  const {
    pageNum,
    pageSize,
    total,
    data,
    isLoading,
    Pagination,
    getData: mutate
  }: {
    pageNum: number;
    pageSize: number;
    total: number;
    data: any[];
    isLoading: boolean;
    Pagination: () => JSX.Element;
    getData: UseMutateFunction<null, unknown, number | undefined, unknown>;
  } = usePagination({
    api: listApi,
    pageSize: 10,
    params: {
      keyword: searchTerm,
      ...apiParameter
    }
  });

  const cancelRef = React.useRef();
  // const { identificationFun } = useOperationBtnHook({ onOpen });

  const btnClick = ({
    onClickType,
    fields,
    dialogTitle,
    dialogDescription,
    onConfirm
  }: {
    onClickType: string;
    fields?: any;
    dialogTitle: (val: { [key: string]: string }) => ReactNode | string;
    dialogDescription: (val: { [key: string]: string }) => ReactNode | string;
    onConfirm: (val: { [key: string]: string }) => Promise<boolean | string>;
  }) => {
    // identificationFun(onClickType);
    onOpen();
    const formData: formDataType = {
      formList: fields,
      title: dialogTitle,
      description: dialogDescription,
      onClickType: onClickType,
      onConfirm: onConfirm
    };
    console.log(formData, 'formData');

    setFormConfig(formData);
  };

  const onConfirmFun = async (
    val: { [key: string]: string },
    onConfirm: (val: { [key: string]: string }) => Promise<boolean | string>
  ) => {
    const isSuccess = await onConfirm(val);
    if (isSuccess === true) {
      await mutate(1);
    }
    if (isSuccess !== false) {
      toast({
        title:
          isSuccess === true
            ? typeof formConfig.title === 'string'
              ? formConfig.title
              : formConfig.title(val) + '成功'
            : isSuccess,
        status: isSuccess === true ? 'success' : 'warning'
      });
    }
    return isSuccess;
  };

  const OperatingButtonView = (option: OperatingButtonType, index: number, record: any) => {
    const isVisible =
      option.type === 'end' &&
      (!option.isVisible || (option.isVisible && option.isVisible(record)));
    if (!isVisible) return '';
    return (
      <Button
        paddingInlineStart={'0px'}
        paddingInlineEnd={'0px'}
        pr={'20px'}
        variant="ghost"
        onClick={() => {
          setFormValues(record), btnClick(option);
        }}
        disabled={!searchTerm}
        colorScheme="blue"
        key={index}
      >
        {option.render ? option.render(record) : option.name}
      </Button>
    );
  };

  const hasEndOperating = useMemo(
    () => operatingButton?.some((item, index) => item.type === 'end'),
    [operatingButton]
  );

  useEffect(() => {
    console.log(data, 'data');
    if (data.length > 0) {
      setFirstDataID(data?.[0]?._id);
      console.log(data, 'asdasdas');
      console.log('执行了多少次1111111');
      if (data) clickColumns && clickColumns(data?.[0]);
    }
  }, [data]);
  // useMemo(() => {
  //   if (data.length > 0) {
  //     setFirstDataID(data?.[0]?._id);
  //     clickColumns && clickColumns(data?.[0]);
  //     // return data?.[0]?._id;
  //   }
  // }, [data]);

  useEffect(() => {
    mutate(1);
    // console.log('执行了多少次222222');
  }, [apiParameter, mutate]);
  return (
    <Box>
      <AlertDialogForm
        onClickType={formConfig.onClickType}
        formValues={formValues}
        fields={formConfig?.formList}
        isOpen={isOpen}
        onClose={onClose}
        description={formConfig.description}
        title={formConfig.title}
        onConfirm={(val) => onConfirmFun(val, formConfig.onConfirm)}
      />

      <Flex w={'100%'} display="flex" justifyContent={'space-between'}>
        <Box>
          {operatingButton
            ? operatingButton.map((item, index) =>
                item.type === 'head' ? (
                  <Button
                    ml={2}
                    onClick={() => {
                      setFormValues({}), btnClick(item);
                    }}
                    disabled={!searchTerm}
                    colorScheme="blue"
                    variant="outline"
                    key={index}
                  >
                    {item.name}
                  </Button>
                ) : (
                  ''
                )
              )
            : ''}
        </Box>
        <Box>
          <InputGroup mb={4}>
            {/* eslint-disable-next-line react/no-children-prop */}
            <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
            <Input
              type="text"
              placeholder="Search"
              width="auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* onChange={(e) => setSearchTerm(e.target.value)} */}
            <Button ml={2} onClick={() => mutate(1)} disabled={!searchTerm}>
              Search
            </Button>
            <Button
              ml={2}
              onClick={() => {
                setSearchTerm('');
                mutate(1);
              }}
              disabled={!searchTerm}
            >
              Clear
            </Button>
          </InputGroup>
        </Box>
      </Flex>
      {data?.length === 0 || false}
      {data?.length > 0 ? (
        <Table variant={clickColumns ? '' : 'striped'} overflowX="auto" layout="100">
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th key={column.label}>{column.label}</Th>
              ))}
              {hasEndOperating ? <Th minW={'200px'}>操作</Th> : ''}
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item, index) => (
              <Tr
                key={index}
                _hover={{
                  backgroundImage: ['', theme.lgColor.hoverBlueGradient]
                }}
                {...(item._id === firstDataID
                  ? {
                      backgroundImage: `${theme.lgColor.activeBlueGradient}  !important`
                    }
                  : {
                      bg: item.top ? 'myGray.200' : ''
                    })}
                onClick={async () => {
                  setFirstDataID(item?._id);
                  clickColumns && clickColumns(item);
                }}
              >
                {Object.values(columns).map((value, index) => (
                  <Td
                    minW={'200px'}
                    key={index}
                    cursor={'pointer'}
                    transition={'background-color .2s ease-in'}
                  >
                    {value.render ? value.render(item) : item[value.name]}
                  </Td>
                ))}
                <Td>
                  {operatingButton
                    ? operatingButton.map((btnItem, btnIndex) =>
                        OperatingButtonView(btnItem, btnIndex, item)
                      )
                    : ''}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text>No results found</Text>
      )}

      <Box mt={4}>
        <Pagination />
      </Box>
    </Box>
  );
};

export default SearchableTable;
function mutate() {
  throw new Error('Function not implemented.');
}
