import { GET, POST, PUT } from './request';
import type { PaperListResponse, PaperParams } from '@/api/response/paper';
import type { ResponseType } from '@/types/index.d';
import { listParameterType } from '@/types/request';

/**
 * @Author GUAN
 * @Desc 获取试卷列表
 */
export const getPaperListApi = (data: listParameterType) =>
  POST<ResponseType<PaperListResponse>>('/exam/paper/list', data);

/**
 * @Author GUAN
 * @Desc 新建试卷
 */
export const createPaperApi = (data: PaperParams) =>
  POST<ResponseType<PaperListResponse>>('/exam/paper/create', data);

/**
 * @Author GUAN
 * @Desc 删除试卷
 */
export const deletePaperApi = (data: { _id: string | undefined }) =>
  POST<ResponseType<PaperListResponse>>('/exam/paper/delete', data);
