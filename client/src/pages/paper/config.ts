import type { PaperListResponse, PaperParams } from '@/api/response/paper';
import { useDictionaryStore } from '@/store/dictionary';
import { columnsType } from '@/types/index.d';
import { createPaperApi, deletePaperApi } from '@/api/paper';
import { AxiosError } from 'axios';

export function useTableConfig() {
  const { getDictionaryItemName, getDictionaryAndOption } = useDictionaryStore();

  const COLUMNS: Array<columnsType> = [
    {
      name: 'name',
      label: '名称',
      valueType: 'text',
      required: true
    },
    {
      name: 'themeChoices',
      label: '主题',
      valueType: 'select',
      required: true,
      render: (record: PaperListResponse) => {
        return getDictionaryItemName(
          'themeType',
          record.themeChoices.map((item) => item._id)
        );
      },
      options: getDictionaryAndOption('themeType').options,
      formItemProps: {
        isMulti: true
      }
    },
    {
      name: 'categoryId',
      label: '分类',
      valueType: 'select',
      required: true,
      render: (record: PaperListResponse) => {
        return getDictionaryItemName('questionType', record.categoryId);
      },
      options: getDictionaryAndOption('questionType').options
    },
    {
      name: 'score',
      label: '分数',
      valueType: 'text',
      hideInForm: true
    },
    {
      name: 'level',
      label: '难度',
      valueType: 'select',
      render: (record: PaperListResponse) => {
        return getDictionaryItemName('level', record.level);
      },
      options: getDictionaryAndOption('level').options
    }
  ];

  const operatingButton = [
    {
      type: 'head',
      name: '新增',
      onClickType: 'add',
      fields: COLUMNS,
      dialogTitle: '添加考卷',
      onConfirm: async (val: PaperParams) => {
        try {
          await createPaperApi({ ...val });
          return true;
        } catch (error) {
          return (error as AxiosError).message;
        }
      }
    },
    {
      type: 'end',
      name: '进行考卷',
      onClickType: 'proceed',
      dialogTitle: '进行考卷',
      dialogDescription: '是否进行该考卷',
      onConfirm: (val: PaperParams) => {
        console.log(val);
      }
    },
    {
      type: 'end',
      name: '删除',
      onClickType: 'remove',
      dialogTitle: '删除考卷',
      dialogDescription: '是否删除该考卷',
      onConfirm: async (val: PaperParams) => {
        try {
          await deletePaperApi({ _id: val._id });
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
