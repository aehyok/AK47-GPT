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
      'questionId score answerContent'
    )

    let ids = questionList.map(item => item.questionId);
    console.log(ids, '-------codes-------------')
    console.log(questionList, '----questionList----')
    const result: any = await ExamQuestion.find({ _id: {$in: ids }})

    const newResult: any = []
    result.forEach((item: any) => {
      console.log(item._id, item._id.toString(), "----------------", "1")
      const current: any = questionList.find(question => question.questionId.toString() === item._id.toString())
      console.log( current, 'item-current')
      if(current && current.score >= 0) {
        item.score = current.score
        console.log(item, 'item-score')
      }
      newResult.push({
        _id: item._id,
        question: item.question,
        isAnswered: item.score >= 0
      })
    })

    console.log(newResult, 'item-result')
    jsonRes<any>(res, {
      data: {
        data: newResult,
      }
    });

  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}
