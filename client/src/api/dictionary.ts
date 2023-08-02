import { GET, POST, PUT } from './request';
import { listParameterType } from '@/types/request';
import { DictionaryType } from '@/api/response/dictionary.d';
import type { PagingData } from '@/types/index.d';
/**
 * 字典分组
 */
export const getDictionaryList = (data: listParameterType) =>
  POST<PagingData<DictionaryType>>(`/dictionary/group/list`, data);

/**
 * 添加分组
 */
export const saveDictionaryData = (data: { [key: string]: any }) =>
  POST(`/dictionary/group/save`, data);

/**
 *   删除分组
 */
export const deleteDictionaryData = (data: { [key: string]: any }) =>
  POST(`/dictionary/group/delete`, data);

/**
 * 字典项列表
 */
export const getDictionaryItemList = (data: listParameterType) =>
  POST(`/dictionary/item/list`, data);

/**
 * 字典项新增
 */
export const saveDictionaryItem = (data: { [key: string]: any }) =>
  POST(`/dictionary/item/save`, data);

/**
 * 字典项删除
 */
export const deleteDictionaryItemData = (data: { [key: string]: any }) =>
  POST(`/dictionary/item/delete`, data);

/**
 * 字典项禁用启用
 */
export const enableDictionaryItemData = (data: { [key: string]: any }) =>
  POST(`/dictionary/item/enable`, data);
