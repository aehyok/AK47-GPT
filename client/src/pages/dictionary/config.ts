import React, { useEffect, useState } from 'react';
import { deleteDictionaryData, saveDictionaryData } from '@/api/dictionary';
import type { RequestType } from '@/types/request';
import { useToast } from '@/hooks/useToast';
export function useCompanyConfig() {
  const COLUMNS = [
    {
      name: 'name',
      label: '名称'
    },
    {
      name: 'code',
      label: '编码'
    },
    {
      name: 'order',
      label: '排序'
    },
    {
      name: 'remark',
      label: '备注'
    }
  ];
  const [tableData, setTableData] = useState([]);
  const { toast } = useToast();
  const Hint = new Map([
    ['add', '添加成功'],
    ['edit', '编辑成功'],
    ['remove', '移除成功']
  ]);

  const AddEditform = [
    {
      type: 'text',
      name: 'name',
      label: '名称',
      required: true
    },
    {
      type: 'text',
      name: 'code',
      label: '编码',
      required: true
    },
    {
      type: 'text',
      name: 'order',
      label: '排序',
      required: true
    },
    {
      type: 'text',
      name: 'remark',
      label: '备注'
    }
  ];
  const operatingButton = [
    {
      type: 'head',
      name: '新增',
      onClickType: 'add',
      fields: AddEditform,
      dialogTitle: '添加字典'
    },
    {
      type: 'end',
      name: '编辑',
      onClickType: 'edit',
      fields: AddEditform,
      dialogTitle: '编辑字典'
    },
    // {
    //   type: 'end',
    //   name: '禁用',
    //   onClickType: 'enable',
    //   dialogTitle: (item) => {
    //     switch (item.status) {
    //       case 1:
    //         return `是否禁用${item.shortName}`;
    //       case 0:
    //         return `是否启用${item.shortName}`;
    //       default:
    //         return '';
    //     }
    //   },
    //   render: (item) => {
    //     switch (item.status) {
    //       case 1:
    //         return `禁用`;
    //       case 0:
    //         return `启用`;
    //       default:
    //         return '';
    //     }
    //   },
    // dialogDescription: (item) => {
    //   switch (item.status) {
    //     case 1:
    //       return `提示：禁用后该企业账号不能使用`;
    //     case 0:
    //       return `提示：启用该企业账号`;
    //     default:
    //       return '';
    //   }
    // }
    // },
    {
      type: 'end',
      name: '删除',
      onClickType: 'remove',
      dialogTitle: '删除',
      dialogDescription: '是否删除该字典'
    }
  ];

  // const getCompanyListFun = async () => {
  //   const {
  //     code,
  //     data: { docs }
  //   } = (await getDictionaryList({ page: 1, limit: 1 })) as RequestType;
  //   if (code === 200) {
  //     setTableData(docs);
  //   }
  // };

  const onConfirm = async (
    val: { [key: string]: any },
    type: 'add' | 'edit' | 'enable' | 'remove'
  ) => {
    // console.log(type, '你是什么');
    if (['add', 'edit'].includes(type)) {
      const { code } = (await saveDictionaryData({ ...val })) as RequestType;
      if (code === 200) {
        toast({
          title: Hint.get(type),
          status: 'success'
        });
        return true;
      }
    } else if (['remove'].includes(type)) {
      const { code } = (await deleteDictionaryData({ _id: val._id })) as RequestType;
      if (code === 200) {
        toast({
          title: Hint.get(type),
          status: 'success'
        });
        return true;
      }
    }
  };

  return {
    tableData,
    operatingButton,
    onConfirm,
    COLUMNS
  };
}
