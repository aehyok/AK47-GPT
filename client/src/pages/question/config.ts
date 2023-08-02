import type { PaperListResponse, PaperParams } from '@/api/response/question';
import { deleteQuestionData, saveQuestionData, enableQuestionData } from '@/api/question';
import { formatDate } from '@/utils/dateFormat';
import { columnsType } from '@/types/index.d';
import { AxiosError } from 'axios';

export function useCompanyConfig() {
  const COLUMNS: Array<columnsType> = [
    {
      name: 'question',
      label: '问题',
      valueType: 'textarea',
      required: true
    },
    {
      name: 'answer',
      label: '答案',
      valueType: 'textarea',
      required: true
    },
    {
      name: 'createdAt',
      label: '创建时间',
      hideInForm: true,
      render: (record: PaperListResponse) => {
        return formatDate(record.createdAt);
      }
    },
    {
      name: 'updatedAt',
      label: '更新时间',
      valueType: 'text',
      hideInForm: true,
      render: (record: PaperListResponse) => {
        return formatDate(record.updatedAt);
      }
    },
    {
      name: 'updatedAt',
      label: '状态',
      valueType: 'text',
      hideInForm: true,
      render: (record: PaperListResponse) => {
        return !record.isEnable ? `禁用` : `启用`;
      }
    }
  ];

  const operatingButton = [
    {
      type: 'head',
      name: '新增',
      onClickType: 'add',
      fields: COLUMNS,
      dialogTitle: '添加题目',
      onConfirm: async (val: { [key: string]: any }) => {
        try {
          await saveQuestionData({ ...val });
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
      dialogTitle: '编辑题目',
      onConfirm: async (val: { [key: string]: any }) => {
        try {
          await saveQuestionData({ ...val });
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
        return item.isEnable ? `提示：禁用后该题目项将不能使用` : `提示：启用该题目`;
      },
      onConfirm: async (val: { [key: string]: any }) => {
        try {
          await enableQuestionData({ _id: val._id, isEnable: !val.isEnable });
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
      dialogDescription: '是否删除该题目',
      onConfirm: async (val: { [key: string]: any }) => {
        try {
          await deleteQuestionData({ _id: val._id });
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
