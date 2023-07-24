import { GET, POST, PUT } from './request';

type listParameterType = {
  limit: number;
  page: number;
};

/**
 * 字典分组
 */
export const getDictionaryList = (data: listParameterType) => POST(`/dictionary/group/list`, data);

/**
 * 添加
 */
export const saveDictionaryData = (data: { [key: string]: any }) =>
  POST(`/dictionary/group/save`, data);

/**
 *   删除
 */
export const deleteDictionaryData = (data: { [key: string]: any }) =>
  POST(`/dictionary/group/delete`, data);
