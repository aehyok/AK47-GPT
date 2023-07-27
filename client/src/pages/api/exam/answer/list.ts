import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { connectToDatabase, ExamAnswer, ExamPaper } from '@/service/mongo';
import { authUser } from '@/service/utils/auth';
import _ from 'lodash';

/* 答题考卷列表 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      paperId
    } = req.body as {
      paperId: string;
    };

    await authUser({ req, authToken: true });

    await connectToDatabase();

    if(!paperId) {
      throw new Error('参数错误');
    }

    
    const data = await ExamPaper.find(
      {
        paperId
      }, '_id name level categoryId themeChoices score remark')

    const answers = await ExamAnswer.find({
      paperId
    })

    jsonRes<any>(res, {
       data: {
        paperInfo: data,
        answerList: answers
       }

    });

  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}
