import React, { ReactNode, useState } from 'react';
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
  useToast
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
  listApi
}: {
  columns: Array<columnsType>;
  operatingButton: Array<OperatingButtonType>;
  listApi: (data: listParameterType) => Promise<unknown>;
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
      keyword: searchTerm
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
    toast({
      title: isSuccess === true ? formConfig.title + '成功' : isSuccess,
      status: isSuccess === true ? 'success' : 'warning'
    });
    return isSuccess;
  };

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
          {operatingButton.map((item, index) =>
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
          )}
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
        <Table variant="striped" overflowX="auto" layout="">
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th key={column.label}>{column.label}</Th>
              ))}
              <Th>OPERATION</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item, index) => (
              <Tr key={index}>
                {Object.values(columns).map((value, index) => (
                  <Td key={index}> {value.render ? value.render(item) : item[value.name]}</Td>
                ))}
                <Td>
                  {operatingButton.map((btnItem, btnindex) =>
                    btnItem.type !== 'head' ? (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setFormValues(item), btnClick(btnItem);
                        }}
                        disabled={!searchTerm}
                        colorScheme="blue"
                        key={btnindex}
                      >
                        {btnItem.render ? btnItem.render(item) : btnItem.name}
                      </Button>
                    ) : (
                      ''
                    )
                  )}
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
