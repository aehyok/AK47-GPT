// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { connectToDatabase, ExamQuestion } from '@/service/mongo';
import { authUser } from '@/service/utils/auth';
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { _id, question, answer, remark, isEnable, categoryId, themeId } = req.body as {
      _id: string;
      question: string;
      answer: string;
      remark: string;
      isEnable: boolean;
      categoryId: string;
      themeId: string;
    };

    // 凭证校验
    const {userId} = await authUser({req, authToken: true});

    await connectToDatabase();
    let response: any = null;
    if (_id) {
      // update
      response = await ExamQuestion.updateOne(
        {
          _id
        },
        {
          question,
          answer,
          remark,
          themeId,
          categoryId,
          isEnable,
          updatedBy: userId,
          updatedAt: new Date()
        }
      );
      jsonRes(res, {
        data: response._id
      });
    } else {
      // create
      response = await ExamQuestion.create({
        question,
        answer,
        remark,
        categoryId,
        themeId,
        isDeleted: false,
        createdAt: new Date(),
        createdBy: userId
      });
      jsonRes(res, {
        data: response._id
      });
    }
  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}
