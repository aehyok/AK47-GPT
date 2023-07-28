import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { connectToDatabase, ExamAnswer, ExamPaper, ExamQuestion } from '@/service/mongo';
import { authUser } from '@/service/utils/auth';
import _ from 'lodash';

/* 答题考卷列表 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { paperId } = req.body as {
      paperId: string;
    };

    await authUser({ req, authToken: true });

    await connectToDatabase();

    if (!paperId) {
      throw new Error('参数错误');
    }

    const data = await ExamPaper.find(
      {
        _id: paperId
      },
      '_id name level categoryId themeChoices score remark'
    );

    const answers = await ExamAnswer.find({
      paperId
    });

    let ids = answers.map((item) => item.questionId);
    const questionList = await ExamQuestion.find({ _id: { $in: ids } });

    const newAnswers: any = [];
    answers.forEach((item: any) => {
      const current: any = questionList.find(
        (question) => question._id.toString() === item.questionId.toString()
      );
      item.question = current.question;
      newAnswers.push({
        _id: item._id,
        question: item.question,
        answerContent: item.answerContent,
        createdAt: item.createdAt,
        gptContent: item.gptContent,
        isDeleted: item.isDeleted,
        paperId: item.paperId,
        questionId: item.questionId,
        score: item.score
      });
    });

    jsonRes<any>(res, {
      data: {
        data: {
          paperInfo: data,
          answerList: newAnswers
        }
      }
    });
  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}
