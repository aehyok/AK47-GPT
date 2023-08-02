import {
  deleteDictionaryItemData,
  saveDictionaryItem,
  enableDictionaryItemData
} from '@/api/dictionary';
import { columnsType } from '@/types/index.d';
import { AxiosError } from 'axios';

export function useDictionaryItemConfig(parameter: Record<string, any>) {
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
    },
    {
      name: 'isEnable',
      label: '状态',
      valueType: 'select',
      options: [
        {
          value: false,
          label: '禁用'
        },
        {
          value: true,
          label: '启用'
        }
      ]
    },
    {
      name: 'order',
      label: '排序',
      valueType: 'text'
    },
    {
      name: 'remark',
      label: '备注',
      valueType: 'text'
    }
  ];

  const operatingButton = [
    {
      type: 'head',
      name: '新增',
      onClickType: 'add',
      fields: COLUMNS,
      dialogTitle: '添加字典',
      onConfirm: async (val: { [key: string]: any }) => {
        try {
          await saveDictionaryItem({ ...parameter, ...val });
          return true;
        } catch (error) {
          return (error as AxiosError).message;
        }
      }
    },
    {
      type: 'end',
      name: '编辑',
      onClickType: 'edit',
      fields: COLUMNS,
      dialogTitle: '编辑字典',
      onConfirm: async (val: { [key: string]: any }) => {
        try {
          await saveDictionaryItem({ ...parameter, ...val });
          return true;
        } catch (error) {
          return (error as AxiosError).message;
        }
      }
    },
    {
      type: 'end',
      name: '禁用',
      onClickType: 'enable',
      dialogTitle: (item: { [key: string]: any }) => {
        return item.isEnable ? `禁用` : `启用`;
      },
      render: (item: { [key: string]: any }) => {
        return item.isEnable ? '禁用' : '启用';
      },
      dialogDescription: (item: { [key: string]: any }) => {
        return item.isEnable ? `提示：禁用后该字典项将不能使用` : `提示：启用该字典项`;
      },
      onConfirm: async (val: { [key: string]: any }) => {
        try {
          await enableDictionaryItemData({ _id: val._id, isEnable: !val.isEnable });
          return true;
        } catch (error) {
          return (error as AxiosError).message;
        }
      }
    },
    {
      type: 'end',
      name: '删除',
      onClickType: 'remove',
      dialogTitle: '删除',
      dialogDescription: '是否删除该字典',
      onConfirm: async (val: { [key: string]: any }) => {
        try {
          await deleteDictionaryItemData({ _id: val._id });
          return true;
        } catch (error) {
          return (error as AxiosError).message;
        }
      }
    }
  ];

  return {
    operatingButton,
    COLUMNS
  };
}
