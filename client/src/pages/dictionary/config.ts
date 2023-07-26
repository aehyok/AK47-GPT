import { deleteDictionaryData, saveDictionaryData } from '@/api/dictionary';
import { columnsType } from '@/types/index.d';
import { AxiosError } from 'axios';

export function useCompanyConfig() {
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
      name: 'order',
      label: '排序',
      valueType: 'text',
      required: true
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
          await saveDictionaryData({ ...val });
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
          await saveDictionaryData({ ...val });
          return true;
        } catch (error) {
          return (error as AxiosError).message;
        }
      }
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
      dialogDescription: '是否删除该字典',
      onConfirm: async (val: { [key: string]: any }) => {
        try {
          await deleteDictionaryData({ _id: val._id });
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
