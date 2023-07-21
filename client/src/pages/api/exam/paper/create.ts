// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { connectToDatabase, ExamPaper, ExamQuestion, ExamAnswer } from '@/service/mongo';
import { authUser } from '@/service/utils/auth';
import _ from 'lodash';
import mongoose from "mongoose"
// 计算每个类型可以出多少个题目
const calculatePerCount = (typeCount: number) => {
  const totalProblems = 10;
  const problemsPerType = Math.floor(totalProblems / typeCount);
  var remainingProblems = totalProblems % typeCount;
  var problems: number[] = [];
  for (var i = 0; i < typeCount; i++) {
    // For each type, add the appropriate number of problems
    if (i === typeCount - 1) {
        // If it's the last type, add the remaining problems
        problems.push(problemsPerType + remainingProblems);
    } else {
        problems.push(problemsPerType);
    }
  }

  return problems;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const {
      name,
      level,
      categoryId,
      themeChoices
    } = req.body as {
      name: string;
      level: string;
      categoryId: string;
      themeChoices: [];
    };

    // 凭证校验
    const { userId } = await authUser({ req, authToken: true });

    await connectToDatabase();

    const session = await mongoose.startSession();
    session.startTransaction();

    await session.commitTransaction();
    session.endSession(); 

    let response: any = null;
    // create
    response = await ExamPaper.create({
      name,
      categoryId,
      themeChoices,
      level,
      score: 0,
      isDeleted: false,
      createdAt: new Date(),
      createdBy: userId
    });

    const questionList: any[] = [];

    const promiseList: any[] = []
    themeChoices.forEach((item) => {
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
    
    promiseResult.forEach((item, index) => {
      const temp = _.sampleSize(item, calculatePerCount(themeChoices.length)[index]);
      questionList.push(...temp);
    });

    const questionListObject = questionList.map((item) => {
      return {
        questionId:item._id,
        paperId: response._id,
        createdBy: userId
      }
    });
    ExamAnswer.insertMany(questionListObject, function (error, result) {
      if(error == null) {
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
