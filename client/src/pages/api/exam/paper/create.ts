// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { connectToDatabase, ExamPaper, ExamQuestion, ExamAnswer } from '@/service/mongo';
import { authUser } from '@/service/utils/auth';
import _ from 'lodash';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { name, level, categoryId, themeChoices } = req.body as {
      name: string;
      level: string;
      categoryId: string;
      themeChoices: [];
    };

    console.log(
      themeChoices,
      'themeChoices----------------------------------------------------------------'
    );

    const themeList: any = []
    themeChoices.forEach(theme => {
      themeList.push({_id: theme})
    })

    console.log(
      themeList,
      'themeList----------------------------------------------------------------'
    );
    // 凭证校验
    const { userId } = await authUser({ req, authToken: true });

    await connectToDatabase();
    let response: any = null;
    // create
    response = await ExamPaper.create({
      name,
      categoryId,
      themeChoices: themeList,
      level,
      score: 0,
      isDeleted: false,
      createdAt: new Date(),
      createdBy: userId
    });

    const questionList: any[] = [];

    const promiseList: any[] = [];
    themeList.forEach((item: any) => {
      const requestPromise = ExamQuestion.find(
        {
          categoryId,
          themeId: item // 替换为id
        },
        '_id'
      );
      promiseList.push(requestPromise);
    });

    const promiseResult = await Promise.all(promiseList);

    promiseResult.forEach((item) => {
      const temp = _.sampleSize(item, 5);
      questionList.push(...temp);
    });

    console.log(
      questionList,
      '-----questionList-----===================================11111111111111111'
    );
    const questionListObject = questionList.map((item) => {
      console.log(item, '================================ item', item._id);
      return {
        questionId: item._id,
        paperId: response._id
      };
    });
    console.log(
      questionListObject,
      '-----questionList-----===================================22222222222222222'
    );
    ExamAnswer.insertMany(questionListObject, function (error, result) {
      console.log(error, result, 'error-result');
      if (error == null) {
        jsonRes(res, {
          data: response._id
        });
      } else {
        jsonRes(res, {
          code: 500,
          error: error
        });
      }
    });
  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}
