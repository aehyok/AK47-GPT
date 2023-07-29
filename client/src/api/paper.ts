import { GET, POST, PUT } from './request';
import type {
  PaperListResponse,
  PaperParams,
  PaperQuestionListResponse,
  PaperAnswerUpdateParams,
  PaperAnswersResponse
} from '@/api/response/paper';
import type { ResponsePagingType, ResponseType } from '@/types/index.d';
import { listParameterType } from '@/types/request';

/**
 * @Author GUAN
 * @Desc 获取试卷列表
 */
export const getPaperListApi = (data: listParameterType) =>
  POST<ResponsePagingType<PaperListResponse>>('/exam/paper/list', data);

/**
 * @Author GUAN
 * @Desc 新建试卷
 */
export const createPaperApi = (data: PaperParams) =>
  POST<ResponsePagingType<PaperListResponse>>('/exam/paper/create', data);

/**
 * @Author GUAN
 * @Desc 删除试卷
 */
export const deletePaperApi = (data: { _id: string | undefined }) =>
  POST<ResponsePagingType<PaperListResponse>>('/exam/paper/delete', data);

/**
 * @Author GUAN
 * @Desc 获取试卷考题
 */
export const getQuestionsApi = (data: { paperId: string | undefined }) =>
  POST<ResponseType<PaperQuestionListResponse[]>>('/exam/paper/getQuestions', data);

/**
 * @Author GUAN
 * @Desc 提交考题答案
 */
export const postAnswerUpdateApi = (data: PaperAnswerUpdateParams) =>
  POST<ResponseType<PaperQuestionListResponse[]>>('/exam/answer/update', data);

/**
 * @Author GUAN
 * @Desc 获取试卷考题答案
 */
export const getAnswersApi = (data: { paperId: string | undefined }) =>
  POST<ResponseType<PaperAnswersResponse>>('/exam/paper/getAnswers', data);
