import { GET, POST, PUT } from './request';
import { listParameterType } from '@/types/request';

/**
 * 列表
 */
export const getQuestionList = (data: listParameterType) => POST(`/exam/question/list`, data);

/**
 * 添加
 */
export const saveQuestionData = (data: { [key: string]: any }) => POST(`/exam/question/save`, data);

/**
 *   删除
 */
export const deleteQuestionData = (data: { [key: string]: any }) =>
  POST(`/exam/question/delete`, data);

/**
 *   删除
 */
export const enableQuestionData = (data: { [key: string]: any }) =>
  POST(`/exam/question/enable`, data);
