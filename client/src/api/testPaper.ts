import { GET, POST, PUT } from './request';
import type { ChatModelItemType } from '@/constants/model';
import type { InitDateResponse } from '@/pages/api/system/getInitData';

/**
 * @Author GUAN
 * @Desc 获取已考试卷历史列表
 */
export const getHistoryList = () => GET<InitDateResponse>('/system/getInitData');
