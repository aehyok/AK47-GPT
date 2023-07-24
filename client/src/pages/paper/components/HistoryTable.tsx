import { useState, useEffect } from 'react';
import Table, { ColumnPops } from '@/components/Table';
import { getListApi } from '@/api/paper';
import type { PaperListResponse } from '@/api/response/paper';
import { useDictionaryStore } from '@/store/dictionary';

const HistoryTable = () => {
  const { getDictionaryItemName } = useDictionaryStore();

  const columns: ColumnPops<PaperListResponse>[] = [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '主题',
      dataIndex: 'themeChoices',
      render: (record: PaperListResponse) => {
        return getDictionaryItemName(
          'themeType',
          record.themeChoices.map((item) => item._id)
        );
      }
    },
    {
      title: '分类',
      dataIndex: 'categoryId',
      render: (record: PaperListResponse) => {
        return getDictionaryItemName('questionType', record.categoryId);
      }
    },
    {
      title: '分数',
      dataIndex: 'score'
    }
  ];

  const [list, setList] = useState<PaperListResponse[]>([]);

  const getList = async () => {
    const res = await getListApi();
    setList(res);
  };

  useEffect(() => {
    getList();
  }, []);

  return <Table columns={columns} data={list} tBody={{ fontSize: 'sm' }}></Table>;
};

export default HistoryTable;
