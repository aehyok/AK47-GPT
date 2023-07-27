import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { connectToDatabase, ExamAnswer, ExamQuestion } from '@/service/mongo';
import { authUser } from '@/service/utils/auth';
import { PagingData } from '@/types';

/* 答题考卷列表 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      paperId
    } = req.body as {
      paperId: string
    };

    await authUser({req, authToken: true});

    await connectToDatabase();

    let where: any = {};
    if (!paperId) {
      throw new Error("参数错误")
    }

    where = { paperId }
    const questionList = await ExamAnswer.find(
      where,
      'questionId'
    )

    let ids = questionList.map(item => item.questionId);
    console.log(ids, '-------codes-------------')
    console.log(questionList, '----questionList----')
    const result = await ExamQuestion.find({ _id: {$in: ids }})
    jsonRes<any>(res, {
      data: {
        data: result,
      }
    });

  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}
