import { GET, POST, PUT } from './request';
import type { PaperListResponse } from '@/api/response/paper';

/**
 * @Author GUAN
 * @Desc 获取试卷列表
 */
export const getListApi = () => GET<PaperListResponse[]>('/exam/paper/list');
