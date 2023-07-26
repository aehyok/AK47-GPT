import { POST } from '../request';
import { DictionaryType } from '@/api/response/dictionary.d';
import type { PagingData } from '@/types/index.d';

/**
 * @Author GUAN
 * @Desc 获取字典分组列表
 */
export const getDictionaryItemListApi = (groupCode?: string) =>
  POST<PagingData<DictionaryType>>('/dictionary/item/list', { groupCode, pageSize: 30 });
