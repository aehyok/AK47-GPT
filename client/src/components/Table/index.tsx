import React, { ReactNode, Key } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import type {
  TableContainerProps,
  TableProps,
  TableHeadProps,
  TableBodyProps
} from '@chakra-ui/react';

export interface Props<T extends object> {
  tableContainer?: TableContainerProps;
  table?: TableProps;
  tHead?: TableHeadProps;
  tBody?: TableBodyProps;
  columns: ColumnPops<T>[];
  data: T[];
  rowKey?: keyof T;
}

export interface ColumnPops<T> {
  title: string;
  dataIndex: keyof T;
  render?: (record: T) => ReactNode;
}

const ChakraTable: <T extends object>(props: Props<T>) => JSX.Element = (props) => {
  const { tableContainer, table, tHead, tBody, columns, data, rowKey = '_id' } = props;
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
            // @ts-ignore
            <Tr key={item[rowKey]}>
              {columns.map((column) => {
                return (
                  <Td key={column.dataIndex as Key}>
                    {column.render ? column.render(item) : item[column.dataIndex]}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ChakraTable;
