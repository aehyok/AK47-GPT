import React, { ReactNode, Key } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Flex, Box } from '@chakra-ui/react';
import type {
  TableContainerProps,
  TableProps,
  TableHeadProps,
  TableBodyProps
} from '@chakra-ui/react';

type DataType<T> = {
  [key: string]: ReactNode;
} & T;

export interface Props<T> {
  tableContainer?: TableContainerProps;
  table?: TableProps;
  tHead?: TableHeadProps;
  tBody?: TableBodyProps;
  columns: ColumnPops<T>[];
  data: DataType<T>[];
  rowKey?: keyof T;
}

export interface ColumnPops<T> {
  title: string;
  dataIndex: keyof T;
}

const ChakraTable: <T>(props: Props<T>) => JSX.Element = (props) => {
  const { tableContainer, table, tHead, tBody, columns, data, rowKey = 'id' } = props;
  return (
    <TableContainer {...tableContainer}>
      <Table {...table}>
        <Thead {...tHead}>
          <Tr>
            {columns.map((item) => (
              <Th key={item.dataIndex as Key}>{item.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody {...tBody}>
          {data.map((item) => (
            <Tr key={item[rowKey] as Key}>
              {columns.map((column) => (
                <Td key={column.dataIndex as Key}>{item[column.dataIndex]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ChakraTable;
